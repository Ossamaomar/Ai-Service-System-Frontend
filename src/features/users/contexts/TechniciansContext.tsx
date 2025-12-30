/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface TechniciansContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TechniciansContext = createContext<TechniciansContextValue | undefined>(undefined);

export function TechniciansProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <TechniciansContext value={{ search, setSearch }}>{children}</TechniciansContext>
  );
}

export function useTechnicians() {
  const context = useContext(TechniciansContext);

  if (context === undefined) {
    throw new Error("useTechnicians must be used within an TechniciansProvider");
  }

  return context;
}
