import TicketsPagination from "@/features/tickets/components/TicketsPagination";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import RepairsSearch from "./RepairsSearch";
import CreateRepair from "./CreateRepair";
import RepairsTable from "./RepairsTable";

export default function Repairs() {
  const { user } = useAuth();

  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <div>
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Welcome back!
        </h1>
        <p className="text-slate-500">
          Here is a list of all the repairs that can be added on a ticket
        </p>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 justify-between gap-2">
          <RepairsSearch />
          {/* <PartsFiltering /> */}
          {/* <TicketsSorting /> */}
          {user && (user?.role === "ADMIN" || user?.role === "TECHNICIAN") && (
            <CreateRepair />
          )}
        </div>

        <RepairsTable />
      </div>
      <TicketsPagination />
    </div>
  );
}
