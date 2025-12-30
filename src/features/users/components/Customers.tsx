import CreateCustomer from "./CreateCustomer";
import CustomersSearch from "./CustomersSearch";
import CustomersSorting from "./CustomersSorting";
import CustomersTable from "./CustomersTable";
import TechniciansPagination from "./TechniciansPagination";

export default function Customers() {
  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <div>
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Welcome back!
        </h1>
        <p className="text-slate-500">Here is a list of all the customers</p>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          <CustomersSearch />
          <CustomersSorting />
          <CreateCustomer />
        </div>
        <CustomersTable />
      </div>
      <TechniciansPagination />
    </div>
  );
}
