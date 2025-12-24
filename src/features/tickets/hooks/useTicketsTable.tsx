import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getAllTicketService } from "../services/tickets.api";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes/app/_layout/tickets";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useTickets } from "../contexts/TicketsContext";

export default function useTicketsTable() {
  const { search } = useTickets();
  const { page, status, sort } = useSearch({ from: "/app/_layout/tickets/" });
  const { refresh } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const {
    data: tickets,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () =>
      getAllTicketService(search, page, status as string, sort as string),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["tickets"] });
  }, [queryClient, search, page, status, sort]);

  useEffect(() => {
    async function handleError() {
      if (isError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resError = error as any;
        if (resError.status === 401) {
          console.log(resError);
          toast.error("Your session has expired please login again");
          await refresh();
          await router.invalidate();
          await navigate({ to: "/auth/login" });
        }
        if (resError.status === 403) {
          console.log(resError);
          toast.error("You are not allowed to perform this action");
          await refresh();
          await router.invalidate();
          await navigate({ to: "/auth/login" });
        }
      }
    }
    handleError();
  }, [error, isError, navigate, router, refresh]);

  return { tickets, isLoading, isFetching };
}
