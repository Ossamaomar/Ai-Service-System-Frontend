import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ticket, TicketStatus } from "../types/tickets.types";
import { updateTicketService } from "../services/tickets.api";
import type { MouseEvent } from "react";
import EditTicket from "./EditTicket";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/contexts/AuthContext";

const techniciansStatuses: TicketStatus[] = [
  "DIAGNOSIS",
  "UNDER_REPAIR",
  "WAITING_APPROVAL",
  "WAITING_PARTS",
  "READY",
  "CANCELLED",
];

const receptionistStatuses: TicketStatus[] = [
  "RECEIVED",
  "APPROVED",
  "DELIVERED",
  "CANCELLED",
];

const allStatuses: TicketStatus[] = [
  "RECEIVED",
  "READY",
  "APPROVED",
  "DELIVERED",
  "CANCELLED",
  "DIAGNOSIS",
  "UNDER_REPAIR",
  "WAITING_APPROVAL",
  "WAITING_PARTS",
];

export default function TicketActionsMenu({ ticket }: { ticket: Ticket }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (status: TicketStatus) =>
      updateTicketService(ticket.id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const assignTicketMutation = useMutation({
    mutationFn: () =>
      updateTicketService(ticket.id, { assignedTechId: user?.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket assigned successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  function changeStatus(e: MouseEvent<HTMLDivElement>, status: TicketStatus) {
    e.stopPropagation();
    mutation.mutate(status);
  }

  function assignTicket(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    assignTicketMutation.mutate();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-10 h-7">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {user?.role === "RECEPTIONIST" && (
          <DropdownMenuItem>
            <EditTicket ticket={ticket} />
          </DropdownMenuItem>
        )}

        {user?.role === "TECHNICIAN" &&
          (ticket.assignedTechId === null ? (
            <DropdownMenuItem>
              <Button
                variant={"outline"}
                className="w-full cursor-pointer"
                onClick={assignTicket}
              >
                Take Ticket
              </Button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Button variant={"outline"} className="w-full cursor-pointer">
                Add Parts & Repairs
              </Button>
            </DropdownMenuItem>
          ))}

        {user?.role === "RECEPTIONIST" && (
          <DropdownMenuGroup>
            <>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuLabel>Change status</DropdownMenuLabel>
              {receptionistStatuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={(e) => changeStatus(e, status)}
                >
                  <TicketStatusBadge status={status} full={true} />
                </DropdownMenuItem>
              ))}
            </>
          </DropdownMenuGroup>
        )}

        {user?.role === "TECHNICIAN" && (
          <DropdownMenuGroup>
            <>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuLabel>Change status</DropdownMenuLabel>
              {techniciansStatuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={(e) => changeStatus(e, status)}
                >
                  <TicketStatusBadge status={status} full={true} />
                </DropdownMenuItem>
              ))}
            </>
          </DropdownMenuGroup>
        )}

        {user?.role === "ADMIN" && (
          <DropdownMenuGroup>
            <>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuLabel>Change status</DropdownMenuLabel>
              {allStatuses.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={(e) => changeStatus(e, status)}
                >
                  <TicketStatusBadge status={status} full={true} />
                </DropdownMenuItem>
              ))}
            </>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
