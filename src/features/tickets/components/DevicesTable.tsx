import Loader from "@/components/ui/Loader";
import useDevicesTable from "../hooks/useDevicesTable";
import DevicesTableHead from "./DevicesTableHead";
import DevicesTableData from "./DevicesTableData";

export default function DevicesTable() {
  const { data, isLoading } = useDevicesTable();

  if (isLoading) return <Loader />;
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <DevicesTableHead />
        <DevicesTableData data={data?.data.data} />
      </table>
    </div>
  );
}
