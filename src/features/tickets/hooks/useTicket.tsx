import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTicketByIdService } from "../services/tickets.api";
import { deleteTicketPartService } from "../services/ticketParts.api";
import { toast } from "sonner";
import { deleteTicketRepairService } from "../services/ticketRepair.api";

export default function useTicket() {
  const params = useParams();
  const ticketId = params.ticketId!;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticket", params.ticketId],
    queryFn: () => getTicketByIdService(params.ticketId!),
  });
  const ticket = data?.data;

  const canEdit =
    ticket?.status !== "CANCELLED" &&
    ticket?.status !== "RECEIVED" &&
    ticket?.status !== "DELIVERED" &&
    (user?.role === "TECHNICIAN" || user?.role === "ADMIN");

  const deletePartMutation = useMutation({
    mutationFn: (id: string) => deleteTicketPartService(id),
    onSuccess: () => {
      toast.success("Part deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["ticket", params.ticketId] });
      //   setIsLoading(false);
      //   setOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      //   setIsLoading(false);
      toast.error(error?.message || "Failed to delete part");
    },
  });

  const deleteRepairMutation = useMutation({
    mutationFn: (id: string) => deleteTicketRepairService(id),
    onSuccess: () => {
      toast.success("Repair deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["ticket", params.ticketId] });
      //   setIsLoading(false);
      //   setOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      //   setIsLoading(false);
      toast.error(error?.message || "Failed to delete repair");
    },
  });

  return {
    canEdit,
    isLoading,
    isError,
    deletePartMutation,
    deleteRepairMutation,
    ticket,
    ticketId,
    data,
  };
}
