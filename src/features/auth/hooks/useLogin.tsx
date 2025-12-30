import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { userLoginSchema } from "../schemas/authSchemas";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function useLogin() {
  const { login, isLoading } = useAuth();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof userLoginSchema>) {
    const isSuccess = await login(data);
    if (isSuccess) {
      navigate("/");
    }
  }

  return { form, onSubmit, isLoading };
}
