import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRepairSchema, type CreateRepairInput } from "../schemas/repairsSchema";
import { createRepairService } from "../services/repairs.api";

export default function useCreateRepair() {
  const { user } = useAuth();
  const form = useForm<CreateRepairInput>({
    resolver: zodResolver(createRepairSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateRepairInput) => createRepairService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repairs"] });
      toast.success("Repair created successfully");
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
