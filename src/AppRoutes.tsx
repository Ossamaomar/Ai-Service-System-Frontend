import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AppLayout from "./components/layout/AppLayout";
import { useAuth } from "./features/auth/contexts/AuthContext";
import Loader from "./components/ui/Loader";
import Tickets from "./features/tickets/components/Tickets";
import AuthLayout from "./features/auth/components/AuthLayout";
import Login from "./features/auth/components/Login";
import Singnup from "./features/auth/components/Singnup";
import OTP from "./features/auth/components/OTP";
import ForgetPassword from "./features/auth/components/ForgetPassword";
import ResetPassword from "./features/auth/components/ResetPassword";
import Ticket from "./features/tickets/components/Ticket";
import NotFound from "./components/NotFound";
import Technicians from "./features/users/components/Technicians";
import Account from "./features/users/components/Account";
import Customers from "./features/users/components/Customers";
import Devices from "./features/tickets/components/Devices";
import Parts from "./features/parts/components/Parts";
import Repairs from "./features/repairs/components/Repairs";
import AuthorizeRoute from "./components/AuthorizeRoute";

export default function AppRoutes() {
  const { user, isInitialized } = useAuth();

  // Show loader while auth is initializing
  if (!isInitialized) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Navigate
                to={`${
                  user?.role === "STORE_MANAGER" ? "/parts" : "/tickets"
                } `}
                replace
              />
            }
          />
          <Route path="tickets">
            <Route
              index
              element={
                <AuthorizeRoute
                  roles={["ADMIN", "CUSTOMER", "RECEPTIONIST", "TECHNICIAN"]}
                >
                  <Tickets />
                </AuthorizeRoute>
              }
            />
            <Route path=":ticketId" element={<Ticket />} />
          </Route>
          <Route
            path="devices"
            element={
              <AuthorizeRoute
                roles={["ADMIN", "CUSTOMER", "RECEPTIONIST", "TECHNICIAN"]}
              >
                <Devices />
              </AuthorizeRoute>
            }
          />
          <Route
            path="technicians"
            element={
              <AuthorizeRoute roles={["ADMIN", "RECEPTIONIST"]}>
                <Technicians />
              </AuthorizeRoute>
            }
          />
          <Route
            path="customers"
            element={
              <AuthorizeRoute roles={["ADMIN", "RECEPTIONIST"]}>
                <Customers />
              </AuthorizeRoute>
            }
          />
          <Route
            path="parts"
            element={
              <AuthorizeRoute roles={["ADMIN", "TECHNICIAN"]}>
                <Parts />
              </AuthorizeRoute>
            }
          />
          <Route
            path="repairs"
            element={
              <AuthorizeRoute roles={["ADMIN", "TECHNICIAN"]}>
                <Repairs />
              </AuthorizeRoute>
            }
          />
          <Route path="account" element={<Account />} />
        </Route>

        {/* Public Routes (Auth) */}
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Singnup />} />
          <Route path="otp" element={<OTP />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
