import Loader from "@/components/ui/Loader";
import PartsTableHead from "./PartsTableHead";
import usePartsTable from "../hooks/usePartsTable";
import PartsTableData from "./PartsTableData";

export default function PartsTable() {
  const { data, isLoading } = usePartsTable();

  if (isLoading) return <Loader />;
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <PartsTableHead />
        <PartsTableData data={data?.data.data} />
      </table>
    </div>
  );
}
