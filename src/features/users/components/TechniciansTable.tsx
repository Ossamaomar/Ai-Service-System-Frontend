import Loader from "@/components/ui/Loader";
import useTechniciansTable from "../hooks/useTechniciansTable";
import TechniciansTableData from "./TechniciansTableData";
import TechniciansTableHead from "./TechniciansTableHead";

export default function TechniciansTable() {
  const { data, isLoading } = useTechniciansTable();
  
  if(isLoading) return <Loader />
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <TechniciansTableHead />
        <TechniciansTableData data={data?.data.data} />
      </table>
    </div>
  );
}
