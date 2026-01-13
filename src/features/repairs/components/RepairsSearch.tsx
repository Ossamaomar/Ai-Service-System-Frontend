import { Input } from "@/components/ui/input";
import { useRepairs } from "../contexts/RepairsContext";


export default function RepairsSearch() {
  const {search, setSearch} = useRepairs();
  
    return (
    <div className="col-span-6 lg:col-span-2">
      <Input
        type="text"
        placeholder="Search by repair name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
