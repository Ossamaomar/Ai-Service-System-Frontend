import { Button } from "@/components/ui/button";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function TicketsSorting() {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [searchParams, setSearchParams] = useSearchParams({sort: "desc"});

  useEffect(() => {
    // navigate({
    //   from: "/app/tickets",
    //   search: (prev) => ({
    //     ...prev,
    //     sort: sort || "desc",
    //   }),
    // });
    searchParams.set("sort", sort);
    setSearchParams(searchParams)
    
  }, [searchParams, setSearchParams, sort]);

  function changeSort() {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  }
  return (
    <Button
      variant={"outline"}
      onClick={changeSort}
      className="col-span-3 lg:col-span-1 lg:w-fit"
    >
      {sort === "desc" ? <IconSortDescending /> : <IconSortAscending />}
    </Button>
  );
}
