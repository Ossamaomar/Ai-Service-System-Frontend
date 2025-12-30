import { useForm } from "react-hook-form";
import type z from "zod";
import { userSignupSchema } from "../schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";


export default function useSignup() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof userSignupSchema>>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      branch: null,
    },
  });

  async function onSubmit(data: z.infer<typeof userSignupSchema>) {
    const isSuccess = await signup(data);
    if (isSuccess) {
      navigate("/auth/otp");
    }
  }

  return { form, onSubmit, isLoading };
}
