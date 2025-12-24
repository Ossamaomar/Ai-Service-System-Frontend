import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContextValue } from "@/features/auth/contexts/AuthContext";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NotFound from "@/components/NotFound";
import { Toaster } from "sonner";
interface MyRouterContext {
  auth: AuthContextValue
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound
});

function RootComponent() {
  return <>
    <Outlet />
    <Toaster position="top-center" />
    <TanStackRouterDevtools />
  </>
}
