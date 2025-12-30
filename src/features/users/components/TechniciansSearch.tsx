import { Input } from "@/components/ui/input";
import { useTechnicians } from "../contexts/TechniciansContext";


export default function TechniciansSearch() {
    const {search, setSearch} = useTechnicians();
  
    return (
    <div className="col-span-6 lg:col-span-2">
      <Input
        type="text"
        placeholder="Search by technician name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
