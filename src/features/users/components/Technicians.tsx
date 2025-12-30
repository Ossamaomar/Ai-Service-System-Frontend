import TechniciansPagination from "./TechniciansPagination";
import TechniciansTable from "./TechniciansTable";
import TechniciansSearch from "./TechniciansSearch";
import TechniciansSorting from "./TechniciansSorting";

export default function Technicians() {
  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <div>
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Welcome back!
        </h1>
        <p className="text-slate-500">
          Here is a list of all the technicians for this branch
        </p>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          <TechniciansSearch />
          <TechniciansSorting />
        </div>
        <TechniciansTable />
      </div>
      <TechniciansPagination />
    </div>
  );
}
