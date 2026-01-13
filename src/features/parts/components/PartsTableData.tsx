import type { Part } from "@/features/tickets/types/tickets.types";
import { BsCpu } from "react-icons/bs";
import EditPart from "./EditPart";
// import EditDevice from "./EditDevice";

export default function PartsTableData({ data }: { data: Part[] }) {
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {data.map((part) => (
        <tr
          key={part.id}
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
            <BsCpu size={20} />
          </td>
          <td>{part.name}</td>
          <td>{part.model}</td>
          <td>{part.sellingPrice}</td>
          <td>{part.quantity}</td>
          <td>{part.minimumQuantity}</td>
          <td>{part.branch[0] + part.branch.slice(1).toLowerCase()}</td>
          <td>{part.updatedAt.split("T")[0]}</td>
          <td><EditPart part={part} /></td>
        </tr>
      ))}
    </tbody>
  );
}
