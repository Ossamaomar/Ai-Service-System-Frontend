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
import { useAuth } from "@/features/auth/contexts/AuthContext";

const statuses = [
  {
    value: "",
    label: "Branch",
  },
  {
    value: "FARQ",
    label: "Farq",
  },
  {
    value: "SOUQ",
    label: "Souq",
  },
];

export default function PartsFiltering() {
  const [open, setOpen] = useState(false);
  const {user} = useAuth();
  const [value, setValue] = useState(user?.branch ?? "");
  const [searchParams, setSearchParams] = useSearchParams({ branch: "" });

  useEffect(() => {
    searchParams.set("branch", value);
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
            : "Branch"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No branches found.</CommandEmpty>
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
