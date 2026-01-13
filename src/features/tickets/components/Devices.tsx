import TechniciansPagination from "@/features/users/components/TechniciansPagination";
import DevicesTable from "./DevicesTable";
import CreateDevice from "./CreateDevice";
import DevicesSearch from "./DevicesSearch";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export default function Devices() {
  const { user } = useAuth();
  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <div>
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Welcome back!
        </h1>
        <p className="text-slate-500">Here is a list of all the devices</p>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          <DevicesSearch />
          {user?.role === "ADMIN" ||
            (user?.role === "RECEPTIONIST" && <CreateDevice />)}
        </div>
        <DevicesTable />
      </div>
      <TechniciansPagination />
    </div>
  );
}
