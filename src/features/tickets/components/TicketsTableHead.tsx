export default function TicketsTableHead() {
  return (
    <thead className="bg-gray-300/60 text-slate-800">
      <tr
        className="
          [&>th]:px-6
          [&>th]:py-2
          [&>th]:text-sm
          [&>th]:font-normal
          [&>th]:text-center
          [&>th:first-child]:rounded-tl-lg
          [&>th:last-child]:rounded-tr-lg
          [&>th]:text-nowrap
        "
      >
        <th>Device Code</th>
        <th>Ticket number</th>
        <th>Status</th>
        <th>Branch</th>
        <th>Urgent</th>
        <th>Technician</th>
        <th>Created At</th>
      </tr>
    </thead>
  );
}
