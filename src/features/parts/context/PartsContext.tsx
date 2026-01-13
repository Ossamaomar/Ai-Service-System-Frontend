/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface PartsContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const PartsContext = createContext<PartsContextValue | undefined>(
  undefined
);

export function PartsProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <PartsContext value={{ search, setSearch }}>
      {children}
    </PartsContext>
  );
}

export function useParts() {
  const context = useContext(PartsContext);

  if (context === undefined) {
    throw new Error("useParts must be used within an PartsProvider");
  }

  return context;
}
