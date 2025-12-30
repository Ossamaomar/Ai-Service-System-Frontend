import TicketsTable from "./TicketsTable";
import Loader from "@/components/ui/Loader";
import TicketsHead from "./TicketsHead";
import TicketsPagination from "./TicketsPagination";
import TicketsSearch from "./TicketsSearch";
import TicketsFiltering from "./TicketsFiltering";
import CreateTicket from "./CreateTicket";
import TicketsSorting from "./TicketsSorting";
import useTicketsTable from "../hooks/useTicketsTable";

export default function Tickets() {
  const { tickets, isLoading, isFetching } = useTicketsTable();
  if (isLoading) return <Loader />;

  return (
    <div className="space-y-2 h-full flex flex-col justify-between ">
      <TicketsHead />
      <div className="space-y-2">
        <div className="grid grid-cols-6 justify-between gap-2">
          <TicketsSearch />
          <TicketsFiltering />
          <TicketsSorting />
          <CreateTicket />
        </div>

        {isFetching ? <Loader /> : <TicketsTable data={tickets?.data.data} />}
      </div>
      <TicketsPagination />
    </div>
  );
}
