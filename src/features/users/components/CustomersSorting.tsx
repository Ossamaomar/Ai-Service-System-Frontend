import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type SortsType =
  | "least_tickets"
  | "most_tickets"
  | "most_devices"
  | "least_devices"
  | "newest"
  | "oldest";

const statuses: {value: SortsType, label: string}[]  = [
  {
    value: "least_tickets",
    label: "Least Tickets",
  },
  {
    value: "most_tickets",
    label: "Most Tickets",
  },
  {
    value: "most_devices",
    label: "Most Devices",
  },
  {
    value: "least_devices",
    label: "Least Devices",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

export default function CustomersSorting() {
  const [sort, setSort] = useState<SortsType>("most_tickets");
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    sort: "most_tickets",
  });

  useEffect(() => {
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, sort]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-6 lg:col-span-2 justify-between overflow-hidden"
        >
          {sort
            ? statuses.find((framework) => framework.value === sort)?.label
            : "Status"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setSort(
                      currentValue === sort ? "most_tickets" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      sort === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
