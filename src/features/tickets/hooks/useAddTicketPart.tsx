import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  createTicketPartSchema,
  type CreateTicketPartInput,
} from "../schemas/ticketPartSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllPartsService } from "@/features/parts/services/parts.api";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import type { Part } from "../types/tickets.types";
import { addTicketPartService } from "../services/ticketParts.api";

export default function useAddTicketPart(ticketId: string) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CreateTicketPartInput>({
    resolver: zodResolver(createTicketPartSchema),
    defaultValues: {
      partId: "",
      ticketId: ticketId,
      quantity: 1,
      priceAtUse: 0,
    },
  });
  const queryClient = useQueryClient();
  const partId = useWatch({
    control: form.control,
    name: "partId",
  });

  // Fetch available parts
  const { data } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getAllPartsService("", "", user?.branch || ""),
  });

  const selectedPart =
    data && data.data.data.find((part: Part) => part.id === partId);

  // Add part mutation
  const addPartMutation = useMutation({
    mutationFn: async (data: CreateTicketPartInput) => addTicketPartService(data),
    onSuccess: () => {
      toast.success("Part added successfully!");
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      setIsLoading(false);
      setOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error?.message || "Failed to add part");
    },
  });  
  


  const handleSubmit = (data: CreateTicketPartInput) => {
    setIsLoading(true);
    addPartMutation.mutate(data);
  };
  useEffect(() => {
    if (selectedPart) {
      form.setValue("priceAtUse", selectedPart.sellingPrice);
    } else {
      form.setValue("priceAtUse", 0);
    }
  }, [form, partId, selectedPart]);

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  return { open, setOpen, form, isLoading, data, handleSubmit, selectedPart };
}
