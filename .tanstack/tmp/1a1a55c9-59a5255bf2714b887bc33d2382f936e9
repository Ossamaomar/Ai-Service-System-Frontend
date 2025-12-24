import Tickets from "@/features/tickets/components/Tickets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_layout/tickets/")({
  component: Tickets,
  validateSearch: (search: Record<string, unknown>) => ({
    // query: (search.query as string) ?? "",
    page: Number(search.page ?? 1),
    status: search.status ?? "all",
    sort: search.sort ?? "desc",
  }),
});
