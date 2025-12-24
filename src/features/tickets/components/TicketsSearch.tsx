import { Input } from "@/components/ui/input";
import { useTickets } from "../contexts/TicketsContext";


export default function TicketsSearch() {
  const { search, setSearch } = useTickets();

  return (
    <div className="col-span-2 lg:col-span-2">
      <Input
        type="text"
        placeholder="Search by device code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}


