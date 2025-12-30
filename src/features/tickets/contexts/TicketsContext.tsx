/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type SearchType = "deviceCode" | "ticketNumber" | "customerPhone";

interface TicketsContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}

const TicketsContext = createContext<TicketsContextValue | undefined>(undefined);

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("deviceCode");

  return (
    <TicketsContext.Provider value={{ search, setSearch, searchType, setSearchType }}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketsContext);

  if (context === undefined) {
    throw new Error("useTickets must be used within an TicketsProvider");
  }

  return context;
}