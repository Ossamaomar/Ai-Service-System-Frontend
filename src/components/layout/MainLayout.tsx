import { useLayoutEffect } from "react";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { Outlet, useRouter } from "@tanstack/react-router";
import { Route } from "@/routes/app/_layout";

export default function MainLayout() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const router = useRouter();
  useLayoutEffect(() => {
    async function validate() {
      await router.invalidate();

      await navigate({ to: search.redirect || "/" });
    }

    validate();
  }, [navigate, router, search.redirect]);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
