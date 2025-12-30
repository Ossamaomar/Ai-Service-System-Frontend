import { IconUser } from "@tabler/icons-react";
import type { CustomerOverview } from "../types/users.types";

export default function CustomersTableData({
  customers,
}: {
  customers: CustomerOverview[];
}) {
    
  return (
    <tbody className="[&>tr]:border-b [&>tr:last-child]:border-0 [&>tr]:border-gray-200">
      {customers.map((customer) => (
        <tr
          key={customer.id}
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
            <IconUser />
          </td>
          <td>{customer.name}</td>
          <td>{customer.phone}</td>
          <td>{customer.email}</td>
          <td>{customer.ticketsCount}</td>
          <td>{customer.devicesCount}</td>
          <td>{customer.createdAt.split("T")[0]}</td>
        </tr>
      ))}
    </tbody>
  );
}
