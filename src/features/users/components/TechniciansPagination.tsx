import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router";

export default function TechniciansPagination() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  function nextPage() {
    // navigate({
    //   from: "/tickets",
    //   search: (prev) => ({
    //     ...prev,
    //     page: (prev.page ?? 1) + 1,
    //   }),
    // });
    const nextPage = currentPage + 1;
    searchParams.set("page", `${nextPage}`);
    setSearchParams(searchParams);
  }

  function prevPage() {
    if (currentPage <= 1) return;
    const prevPage = currentPage - 1;
    searchParams.set("page", `${prevPage}`);
    setSearchParams(searchParams);
  }

  return (
    <Pagination defaultValue={2}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={prevPage} />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={prevPage}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={nextPage}>{currentPage + 1}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
