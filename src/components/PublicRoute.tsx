import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render children (auth pages)
  return <>{children}</>;
}

export default PublicRoute;