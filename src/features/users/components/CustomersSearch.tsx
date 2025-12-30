import { Input } from "@/components/ui/input";
// import { useTechnicians } from "../contexts/TechniciansContext";
import { useCustomers } from "../contexts/CustomersContext";


export default function CustomersSearch() {
    const {search, setSearch} = useCustomers();
  
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
