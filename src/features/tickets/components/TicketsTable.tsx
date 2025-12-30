import type { Ticket } from "../types/tickets.types";
import TicketsTableData from "./TicketsTableData";
import TicketsTableHead from "./TicketsTableHead";

export default function TicketsTable({ data }: { data: Ticket[] }) {
  return (
    <div className="overflow-x-scroll rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <TicketsTableHead />
        <TicketsTableData data={data} />
      </table>
    </div>
  );
}
