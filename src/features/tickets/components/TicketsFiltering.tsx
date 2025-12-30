import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const statuses = [
  {
    value: "RECEIVED",
    label: "Received",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "DIAGNOSIS",
    label: "Diagnosis",
  },
  {
    value: "WAITING_APPROVAL",
    label: "Waiting approval",
  },
  {
    value: "WAITING_PARTS",
    label: "Waiting parts",
  },
  {
    value: "UNDER_REPAIR",
    label: "Under repair",
  },
  {
    value: "READY",
    label: "Ready",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export default function TicketsFiltering() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({ status: "" });

  useEffect(() => {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-3 lg:col-span-1 justify-between overflow-hidden"
        >
          {value
            ? statuses.find((framework) => framework.value === value)?.label
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
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
