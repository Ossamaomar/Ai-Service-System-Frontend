import { Input } from "@/components/ui/input";
import { useParts } from "../context/PartsContext";


export default function PartsSearch() {
  const {search, setSearch} = useParts();
  
    return (
    <div className="col-span-6 lg:col-span-2">
      <Input
        type="text"
        placeholder="Search by part name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
