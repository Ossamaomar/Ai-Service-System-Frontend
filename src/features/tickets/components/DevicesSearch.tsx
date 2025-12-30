import { Input } from "@/components/ui/input";
import { useDevices } from "../contexts/DevicesContext";


export default function DevicesSearch() {
    const {search, setSearch} = useDevices();
  
    return (
    <div className="col-span-6 lg:col-span-2">
      <Input
        type="text"
        placeholder="Search by customers phone number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
