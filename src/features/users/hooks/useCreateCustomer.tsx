import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useEffect, useState } from "react";
import { createCustomerService } from "@/features/users/services/users.api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCustomerSchema,
  type CreateCustomerInput,
} from "../schemas/customerSchema";

export default function useCreateCustomer() {
  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateCustomerInput) => createCustomerService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer created successfully");
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

  async function onSubmit(data: CreateCustomerInput) {
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
    isLoading
  };
}
