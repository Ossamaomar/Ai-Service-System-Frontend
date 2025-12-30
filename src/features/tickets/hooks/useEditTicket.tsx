import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTicketSchema,
  type UpdateTicketInput,
} from "../schemas/ticketSchemas";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import type { Ticket } from "../types/tickets.types";
import type { User } from "@/features/auth/types/auth.types";
import { getAllTechniciansService } from "@/features/users/services/users.api";
import { updateTicketService } from "../services/tickets.api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditTicket(ticket: Ticket) {
  const form = useForm<UpdateTicketInput>({
    resolver: zodResolver(updateTicketSchema),
    defaultValues: {
      assignedTechId: ticket.assignedTechId || "",
      hasScratches: ticket.hasScratches,
      includesBattery: ticket.includesBattery,
      includesCharger: ticket.includesCharger,
      missingSkrews: ticket.missingSkrews,
      underWarranty: ticket.underWarranty,
      urgent: ticket.urgent,
      wantsBackup: ticket.wantsBackup,
      password: ticket.password || "",
      notes: ticket.notes || "",
    },
  });

  const { user } = useAuth();

  const [technicians, setTechnicians] = useState<User[]>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateTicketInput) =>
      updateTicketService(ticket.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket edited successfully");
      form.reset();
      setOpen(false); // 👈 CLOSE DIALOG
      setIsLoading(false);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        const res = await getAllTechniciansService("TECHNICIAN", ticket.branch);
        setTechnicians(res.data);
        // console.log(res);
      } catch {
        toast.error("An error occured");
      }
    }

    fetchTechnicians();
  }, [ticket.branch]);

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  async function onSubmit(data: UpdateTicketInput) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  return {
    form,
    onSubmit,
    technicians,
    user,
    open,
    setOpen,
    isLoading
  };
}
