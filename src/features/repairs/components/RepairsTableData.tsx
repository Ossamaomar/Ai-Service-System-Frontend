import type { Repair } from "@/features/tickets/types/tickets.types";
import EditRepair from "./EditRepair";
import { GiAutoRepair } from "react-icons/gi";
import type { User } from "@/features/auth/types/auth.types";

export default function RepairsTableData({ data, user }: { data: Repair[], user: User | null }) {
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {data.map((repair) => (
        <tr
          key={repair.id}
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
            <GiAutoRepair size={20} />
          </td>
          <td>{repair.name}</td>
          <td>{repair.price}</td>
          <td>{repair.updatedAt.split("T")[0]}</td>
          {user?.role === 'ADMIN' || user?.role === 'STORE_MANAGER' && <td><EditRepair repair={repair} /></td>}
        </tr>
      ))}
    </tbody>
  );
}
