import { Button } from "@/components/ui/button";
import { IconSortDescending } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function TechniciansSorting() {
  const [sort, setSort] = useState<"least_completed" | "most_completed">("most_completed");
  const [searchParams, setSearchParams] = useSearchParams({ sort: "most_completed" });

  useEffect(() => {
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, sort]);

  function changeSort() {
    if (sort === "least_completed") {
      setSort("most_completed");
    } else {
      setSort("least_completed");
    }
  }
  return (
    <Button
      variant={"outline"}
      onClick={changeSort}
      className="col-span-6 lg:col-span-1 lg:w-fit"
    >
      {sort === "most_completed" ? <>Most completed  <IconSortDescending /></> : <>Least completed  <IconSortDescending /></>}
    </Button>
  );
}
