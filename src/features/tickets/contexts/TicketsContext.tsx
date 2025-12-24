/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface TicketsContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TicketsContext = createContext<TicketsContextValue | undefined>(undefined);

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <TicketsContext value={{ search, setSearch }}>{children}</TicketsContext>
  );
}

export function useTickets() {
  const context = useContext(TicketsContext);

  if (context === undefined) {
    throw new Error("useTickets must be used within an TicketsProvider");
  }

  return context;
}
