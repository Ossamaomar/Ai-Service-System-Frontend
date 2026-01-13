import { AuthProvider } from "./features/auth/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TicketsProvider } from "./features/tickets/contexts/TicketsContext";
import AppRoutes from "./AppRoutes";
import { TechniciansProvider } from "./features/users/contexts/TechniciansContext";
import { CustomersProvider } from "./features/users/contexts/CustomersContext";
import { Toaster } from "sonner";
import { DevicesProvider } from "./features/tickets/contexts/DevicesContext";
import { PartsProvider } from "./features/parts/context/PartsContext";
import { RepairsProvider } from "./features/repairs/contexts/RepairsContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TicketsProvider>
          <TechniciansProvider>
            <CustomersProvider>
              <DevicesProvider>
                <PartsProvider>
                  <RepairsProvider>
                    <AppRoutes />
                  </RepairsProvider>
                </PartsProvider>
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
