import { Button } from "@/components/ui/button";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function TicketsSorting() {
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      from: "/app/tickets",
      search: (prev) => ({
        ...prev,
        sort: sort || "desc",
      }),
    });
  }, [navigate, sort]);

  function changeSort() {
    if (sort === "asc") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  }
  return (
    <Button variant={"outline"} onClick={changeSort} className="lg:col-span-1 lg:w-fit">
      {sort === "desc" ? <IconSortAscending /> : <IconSortDescending />}
    </Button>
  );
}
