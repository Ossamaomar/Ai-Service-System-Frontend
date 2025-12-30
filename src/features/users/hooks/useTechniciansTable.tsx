import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTechniciansOverviewService } from "../services/users.api";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useTechnicians } from "../contexts/TechniciansContext";
import { useSearchParams } from "react-router";

export default function useTechniciansTable() {
  const { search } = useTechnicians();
  const {user} = useAuth();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const sort = searchParams.get("sort") ?? "";
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["technicians"],
    queryFn: () => getAllTechniciansOverviewService(sort, page, search, user?.branch || ""),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
  const { refresh } = useAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["technicians"] });
  }, [queryClient, search, page, sort]);

  useEffect(() => {
    async function handleError() {
      if (isError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resError = error as any;
        console.log("Here");
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
  }, [error, isError, refresh]);

  return { data, isLoading, isError };
}
