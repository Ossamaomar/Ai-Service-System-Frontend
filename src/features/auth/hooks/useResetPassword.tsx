import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { resetPasswordSchema } from "../schemas/authSchemas";
import { resetPasswordService } from "../services/auth.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";

export default function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      setIsLoading(true);
      await resetPasswordService(data, params.token!);
      setIsLoading(false);
      navigate("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("here");
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  return { form, isLoading, onSubmit };
}
