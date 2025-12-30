import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTickets, type SearchType } from "../contexts/TicketsContext";
import {
  IconDeviceMobile,
  IconTicket,
  IconPhone,
  IconQrcode,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { TicketQRScanner } from "./TicketQRScanner";

const searchOptions = [
  {
    value: "deviceCode" as SearchType,
    label: "Device Code",
    icon: IconDeviceMobile,
    placeholder: "Search by device code...",
  },
  {
    value: "ticketNumber" as SearchType,
    label: "Ticket Number",
    icon: IconTicket,
    placeholder: "Search by ticket number...",
  },
  {
    value: "customerPhone" as SearchType,
    label: "Customer Phone",
    icon: IconPhone,
    placeholder: "Search by phone number...",
  },
];

export default function TicketsSearch() {
  const { search, setSearch, searchType, setSearchType } = useTickets();
  const [showScanner, setShowScanner] = useState(false);

  const currentOption = searchOptions.find((opt) => opt.value === searchType);
  const Icon = currentOption?.icon || IconSearch;

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="col-span-6 lg:col-span-3 flex flex-row gap-2">
      <div className="relative flex-1">
        <div className="bg-white absolute z-10 w-fit right-0 top-1/2 -translate-y-1/2 text-muted-foreground">
          {/* <Icon className="h-4 w-4" /> */}

          <Select
            value={searchType}
            onValueChange={(value) => {
              setSearchType(value as SearchType);
              setSearch(""); // Clear search when changing type
            }}
          >
            <SelectTrigger className="w-f">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {searchOptions.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <OptionIcon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="absolute w-fit left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <Input
          type="text"
          placeholder={currentOption?.placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={handleClear}
          >
            <IconX className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowScanner(true)}
        className="shrink-0"
        title="Scan QR Code"
      >
        <IconQrcode className="h-5 w-5" />
      </Button>
      <TicketQRScanner
        open={showScanner}
        onClose={() => setShowScanner(false)}
      />
    </div>
  );
}
