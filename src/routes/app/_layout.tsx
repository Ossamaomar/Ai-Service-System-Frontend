// import { RootLayout } from "@/components/RootLayout";
import { RootLayout } from "@/components/RootLayout";
import Loader from "@/components/ui/Loader";
import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
export const Route = createFileRoute("/app/_layout")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, location }) => {

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: Loader,
  component: RootLayout,
});
