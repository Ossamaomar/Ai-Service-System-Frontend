import Loader from "@/components/ui/Loader";
import useRepairsTable from "../hooks/useRepairsTable";
import RepairsTableHead from "./RepairsTableHead";
import RepairsTableData from "./RepairsTableData";

export default function RepairsTable() {
  const { data, isLoading, user } = useRepairsTable();

  if (isLoading) return <Loader />;
  
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <RepairsTableHead user={user} />
        <RepairsTableData data={data?.data.data} user={user} />
      </table>
    </div>
  );
}
