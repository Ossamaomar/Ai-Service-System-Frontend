import { IconUserCog } from "@tabler/icons-react";
import type { TechnicianOverview } from "../types/users.types";

export default function TechniciansTableData({
  data,
}: {
  data: TechnicianOverview[];
}) {
  console.log(data);
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {data.map((tech) => (
        <tr
          key={tech.id}
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
          <td>
            <IconUserCog />
          </td>
          <td>{tech.name}</td>
          <td>{tech.phone}</td>
          <td>{tech.completedTickets}</td>
          <td>{tech.activeTickets}</td>
          <td>{tech.createdAt.split('T')[0]}</td>
        </tr>
      ))}
    </tbody>
  );
}
