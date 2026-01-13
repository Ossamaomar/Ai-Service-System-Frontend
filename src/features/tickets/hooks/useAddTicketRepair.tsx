import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Repair } from "../types/tickets.types";
import { createTicketRepairSchema, type CreateTicketRepairInput } from "../schemas/ticketRepairSchema";
import { addTicketRepairService } from "../services/ticketRepair.api";
import { getAllRepairsService } from "@/features/repairs/services/repairs.api";

export default function useAddTicketRepair(ticketId: string) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateTicketRepairInput>({
    resolver: zodResolver(createTicketRepairSchema),
    defaultValues: {
        repairId: "",
        ticketId: ticketId,
        priceAtUse: 0
    },
  });
  const queryClient = useQueryClient();
  const repairId = useWatch({
    control: form.control,
    name: "repairId",
  });

  // Fetch available parts
  const { data } = useQuery({
    queryKey: ["repairs"],
    queryFn: () => getAllRepairsService("", ""),
  });

  const selectedRepair =
    data && data.data.data.find((repair: Repair) => repair.id === repairId);

  // Add part mutation
  const addRepairMutation = useMutation({
    mutationFn: async (data: CreateTicketRepairInput) =>
      addTicketRepairService(data),
    onSuccess: () => {
      toast.success("Repair added successfully!");
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      setIsLoading(false);
      setOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error?.message || "Failed to add repair");
    },
  });

  const handleSubmit = (data: CreateTicketRepairInput) => {
    setIsLoading(true);
    addRepairMutation.mutate(data);
  };
  useEffect(() => {
    if (selectedRepair) {
      form.setValue("priceAtUse", selectedRepair.price);
    } else {
      form.setValue("priceAtUse", 0);
    }
  }, [form, repairId, selectedRepair]);

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  return { open, setOpen, form, isLoading, data, handleSubmit, selectedRepair };
}
