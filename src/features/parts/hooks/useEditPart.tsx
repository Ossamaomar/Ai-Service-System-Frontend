import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPartSchema, type CreatePartInput } from "../schemas/partsSchema";
import { editPartService } from "../services/parts.api";
import type { Part } from "@/features/tickets/types/tickets.types";

export default function useEditPart(part: Part) {
  const { user } = useAuth();
  const form = useForm<CreatePartInput>({
    resolver: zodResolver(createPartSchema),
    defaultValues: {
      name: part.name,
      model: part.model ?? "",
      branch: part.branch,
      sellingPrice: part.sellingPrice,
      minimumQuantity: part.minimumQuantity,
      quantity: part.quantity,
    },
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreatePartInput) => editPartService(part.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      toast.success("Part edited successfully");
      form.reset();
      setOpen(false);
      setIsLoading(false);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsLoading(false);
    },
  });

  async function onSubmit(data: CreatePartInput) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  useEffect(() => {
    if (open === false) {
      form.reset();
    }
  }, [form, open]);

  return {
    form,
    onSubmit,
    user,
    open,
    setOpen,
    isLoading,
  };
}
