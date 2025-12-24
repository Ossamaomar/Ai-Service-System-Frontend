import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function TicketsPagination() {
  const { page } = useSearch({ from: "/app/_layout/tickets/" });
  const navigate = useNavigate();

  function nextPage() {
    navigate({
      from: "/app/tickets",
      search: (prev) => ({
        ...prev,
        page: (prev.page ?? 1) + 1,
      }),
    });
  }

  function prevPage() {
    if (page <= 1) return;
    navigate({
      from: "/app/tickets",
      search: (prev) => ({
        ...prev,
        page: page - 1,
      }),
    });
  }

  return (
    <Pagination defaultValue={2}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} />
        </PaginationItem>

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={prevPage}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={nextPage}>{page + 1}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
