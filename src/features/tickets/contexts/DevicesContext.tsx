/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface DevicesContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const DevicesContext = createContext<DevicesContextValue | undefined>(
  undefined
);

export function DevicesProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <DevicesContext value={{ search, setSearch }}>
      {children}
    </DevicesContext>
  );
}

export function useDevices() {
  const context = useContext(DevicesContext);

  if (context === undefined) {
    throw new Error("useDevices must be used within an DevicesProvider");
  }

  return context;
}
