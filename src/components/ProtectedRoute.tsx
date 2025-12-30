import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { useAuth } from "@/features/auth/contexts/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
}

export default ProtectedRoute;