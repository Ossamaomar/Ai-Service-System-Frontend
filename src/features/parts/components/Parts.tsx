import TicketsPagination from "@/features/tickets/components/TicketsPagination";
import PartsTable from "./PartsTable";
import PartsSearch from "./PartsSearch";
import PartsFiltering from "./PartsFiltering";
import CreatePart from "./CreatePart";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export default function Parts() {
  const { user } = useAuth();

  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <div>
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Welcome back!
        </h1>
        <p className="text-slate-500">
          Here is a list of all the parts for this branch
        </p>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 justify-between gap-2">
          <PartsSearch />
          <PartsFiltering />
          {/* <TicketsSorting /> */}
          {user &&
            (user?.role === "ADMIN" || user?.role === "TECHNICIAN" || user?.role === "STORE_MANAGER") && (
              <CreatePart />
            )}
        </div>

        <PartsTable />
      </div>
      <TicketsPagination />
    </div>
  );
}
