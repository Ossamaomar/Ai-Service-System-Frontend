
import type { Device } from "../types/tickets.types";
import { MdOutlineDevices } from "react-icons/md";
import EditDevice from "./EditDevice";

export default function DevicesTableData({ data }: { data: Device[] }) {
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {data.map((device) => (
        <tr
          key={device.id}
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
            <MdOutlineDevices size={20} />
          </td>
          <td>{device.otherType ? device.otherType : device.type}</td>
          <td>{device.brand}</td>
          <td>{device.model}</td>
          <td>{device.color}</td>
          <td>{device.serialNumber}</td>
          <td>{device.customer?.name}</td>
          <td><EditDevice device={device} /></td>
        </tr>
      ))}
    </tbody>
  );
}
