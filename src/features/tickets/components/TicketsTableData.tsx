import {
  IconCircleDashedCheck,
  IconCircleDashedX,
  IconMinus,
} from "@tabler/icons-react";
import type { Ticket } from "../types/tickets.types";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { useNavigate } from "react-router";
import TicketActionsMenu from "./TicketActionsMenu";
import { RiBillLine } from "react-icons/ri";


export default function TicketsTableData({ data }: { data: Ticket[] }) {
  const navigate = useNavigate();
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {data.map((ticket) => (
        <tr
          key={ticket.id}
          onClick={() =>
            navigate(`/tickets/${ticket.id}`)
          }
          className="
            cursor-pointer
            transition
            duration-300
            hover:bg-gray-100
            [&>td]:px-6
            [&>td]:py-1.5
            [&>td]:text-sm
            [&>td]:font-normal
            [&>td]:text-center
            [&>td]:text-nowrap
          "
        >
          <td><RiBillLine  size={20} /></td>
          <td>{ticket.deviceCode}</td>
          <td>{ticket.ticketNumber}</td>
          <td>
            <TicketStatusBadge status={ticket.status} />
          </td>
          <td>
            {ticket.branch.charAt(0) + ticket.branch.slice(1).toLowerCase()}
          </td>
          <td className="text-center align-middle">
            {ticket.urgent ? (
              <IconCircleDashedCheck
                size={28}
                className="mx-auto text-yellow-500"
              />
            ) : (
              <IconCircleDashedX size={28} className="mx-auto text-gray-500" />
            )}
          </td>
          <td>
            {ticket.assignedTechId ? (
              ticket.assignedTech?.name
            ) : (
              <IconMinus size={28} className="mx-auto text-gray-500" />
            )}
          </td>
          <td>{ticket.createdAt.split("T")[0]}</td>
          <td><TicketActionsMenu ticket={ticket} /></td>
        </tr>
      ))}
    </tbody>
  );
}
