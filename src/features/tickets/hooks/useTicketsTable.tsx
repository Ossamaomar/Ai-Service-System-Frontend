import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getAllTicketService } from "../services/tickets.api";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useTickets } from "../contexts/TicketsContext";
import { useNavigate, useSearchParams } from "react-router";

export default function useTicketsTable() {
  const { search, searchType } = useTickets();
  const { refresh, user } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const status = searchParams.get("status") ?? "";
  const sort = searchParams.get("sort") ?? "desc";
  const navigate = useNavigate();
  const {
    data: tickets,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () =>
      getAllTicketService(search, searchType, page, status, sort, user?.branch || ""),
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
        console.log("Here")
        if (resError.status === 401) {
          console.log(resError);
          toast.error("Your session has expired please login again");
          await refresh();
        }
        if (resError.status === 403) {
          console.log(resError);
          toast.error("You are not allowed to perform this action");
          await refresh();
        }
      }
    }
    handleError();
  }, [error, isError, navigate, refresh]);

  return { tickets, isLoading, isFetching };
}
