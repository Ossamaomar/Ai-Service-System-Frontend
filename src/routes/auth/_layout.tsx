import Loader from "@/components/ui/Loader";
import AuthLayout from "@/features/auth/components/AuthLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
const fallback = '/' as const
export const Route = createFileRoute("/auth/_layout")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  loader: Loader,
  component: AuthLayout,
});
