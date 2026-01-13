import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRepairSchema,
  type CreateRepairInput,
} from "../schemas/repairsSchema";
import { editRepairService } from "../services/repairs.api";
import type { Repair } from "@/features/tickets/types/tickets.types";

export default function useEditRepair(repair: Repair) {
  const { user } = useAuth();
  const form = useForm<CreateRepairInput>({
    resolver: zodResolver(createRepairSchema),
    defaultValues: {
      name: repair.name,
      price: repair.price,
    },
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateRepairInput) => editRepairService(repair.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repairs"] });
      toast.success("Repair edited successfully");
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

  async function onSubmit(data: CreateRepairInput) {
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
