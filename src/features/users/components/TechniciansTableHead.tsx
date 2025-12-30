

export default function TechniciansTableHead() {
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
        <th></th>
        <th>Name</th>
        <th>Phone</th>
        <th>Number of Tickets Completed</th>
        <th>Current Number of Tickets</th>
        <th>Joining Date</th>
      </tr>
    </thead>
  );
}
