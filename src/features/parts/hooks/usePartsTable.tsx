import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { useSearchParams } from "react-router";
import { useParts } from "../context/PartsContext";
import { getAllPartsService } from "../services/parts.api";

export default function usePartsTable() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const { search } = useParts();
  const branch = searchParams.get("branch") ?? "";
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["parts"],
    queryFn: () => getAllPartsService(page, search, branch),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
  const { refresh } = useAuth();
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["parts"] });
  }, [queryClient, page, search, branch]);

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
