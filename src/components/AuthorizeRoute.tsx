import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import type { UserRolesType } from "@/features/auth/types/auth.types";

function AuthorizeRoute({
  children,
  roles,
}: {
  children: ReactNode;
  roles: UserRolesType[];
}) {
  const { user } = useAuth();

  // If not authenticated, redirect to login
  //   if (!isAuthenticated) {
  //     return <Navigate to="/auth/login" replace />;
  //   }

  if (user && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
}

export default AuthorizeRoute;
