export default function DevicesTableHead() {
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
        <th>Type</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Color</th>
        <th>Serial Number</th>
        <th>Customer Name</th>
        <th></th>
      </tr>
    </thead>
  );
}
