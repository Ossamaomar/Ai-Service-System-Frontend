import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Ticket, TicketStatus } from "../types/tickets.types";
import { changeTicketStatusService } from "../services/tickets.api";
import type { MouseEvent } from "react";
import EditTicket from "./EditTicket";

export default function TicketActionsMenu({
  ticket,
}: {
  ticket: Ticket;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (status: TicketStatus) =>
      changeTicketStatusService(ticket.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  function changeStatus(e: MouseEvent<HTMLDivElement>, status: TicketStatus) {
    e.stopPropagation();
    mutation.mutate(status);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-10 h-7">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem>
          <EditTicket ticket={ticket} />
        </DropdownMenuItem>
        <DropdownMenuLabel>Change Status To</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(e) => changeStatus(e, "RECEIVED")}>
            <TicketStatusBadge status="RECEIVED" full={true} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => changeStatus(e, "READY")}>
            <TicketStatusBadge status="READY" full={true} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => changeStatus(e, "APPROVED")}>
            <TicketStatusBadge status="APPROVED" full={true} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => changeStatus(e, "DELIVERED")}>
            <TicketStatusBadge status="DELIVERED" full={true} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => changeStatus(e, "CANCELLED")}>
            <TicketStatusBadge status="CANCELLED" full={true} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
