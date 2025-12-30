import { AuthProvider } from "./features/auth/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TicketsProvider } from "./features/tickets/contexts/TicketsContext";
import AppRoutes from "./AppRoutes";
import { TechniciansProvider } from "./features/users/contexts/TechniciansContext";
import { CustomersProvider } from "./features/users/contexts/CustomersContext";
import { Toaster } from "sonner";
import { DevicesProvider } from "./features/tickets/contexts/DevicesContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TicketsProvider>
          <TechniciansProvider>
            <CustomersProvider>
              <DevicesProvider>
                <AppRoutes />
              </DevicesProvider>
            </CustomersProvider>
          </TechniciansProvider>
        </TicketsProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
