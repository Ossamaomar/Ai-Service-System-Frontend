/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface RepairsContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const RepairsContext = createContext<RepairsContextValue | undefined>(
  undefined
);

export function RepairsProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <RepairsContext value={{ search, setSearch }}>
      {children}
    </RepairsContext>
  );
}

export function useRepairs() {
  const context = useContext(RepairsContext);

  if (context === undefined) {
    throw new Error("useRepairs must be used within an RepairsProvider");
  }

  return context;
}
