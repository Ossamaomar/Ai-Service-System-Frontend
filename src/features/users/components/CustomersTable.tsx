import Loader from "@/components/ui/Loader";
import useCustomersTable from "../hooks/useCustomersTable";
import CustomersTableData from "./CustomersTableData";
import CustomersTableHead from "./CustomersTableHead";

export default function CustomersTable() {
  const { data, isLoading } = useCustomersTable();

  if (isLoading) return <Loader />;
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <CustomersTableHead />
        <CustomersTableData customers={data?.data.data} />
      </table>
    </div>
  );
}
