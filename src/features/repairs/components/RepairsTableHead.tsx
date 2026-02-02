import type { User } from "@/features/auth/types/auth.types";

export default function RepairsTableHead({ user }: { user: User | null }) {
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
        <th>Price</th>
        <th>Last Update</th>
        {user?.role === 'ADMIN' || user?.role === 'STORE_MANAGER' && <th></th>}
      </tr>
    </thead>
  );
}
