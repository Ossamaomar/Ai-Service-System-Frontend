


/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface CustomersContextValue {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const CustomersContext = createContext<CustomersContextValue | undefined>(undefined);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <CustomersContext value={{ search, setSearch }}>{children}</CustomersContext>
  );
}

export function useCustomers() {
  const context = useContext(CustomersContext);

  if (context === undefined) {
    throw new Error("useCustomers must be used within an CustomersProvider");
  }

  return context;
}
