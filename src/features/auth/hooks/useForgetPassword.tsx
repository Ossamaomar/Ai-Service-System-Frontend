import { useForm } from "react-hook-form";
import type z from "zod";
import { forgetPasswordSchema } from "../schemas/authSchemas";
import { forgetPasswordService } from "../services/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof forgetPasswordSchema>) {
    try {
      setIsLoading(true);
      const res = await forgetPasswordService(data);
      console.log(res);
      toast.success(res.message);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }
  return { form, onSubmit, isLoading };
}
