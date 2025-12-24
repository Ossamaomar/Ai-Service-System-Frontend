import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { userLoginSchema } from "../schemas/authSchemas";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "@tanstack/react-router";
import { Route } from "@/routes/auth/_layout";

export default function useLogin() {
  const { login, isLoading } = useAuth();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof userLoginSchema>) {
    const isSuccess = await login(data);
    if (isSuccess) {
      await router.invalidate();
      await navigate({ to: search.redirect || "/" });
    }
  }

  return { form, onSubmit, isLoading };
}
