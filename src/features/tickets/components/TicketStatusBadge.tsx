import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { GiAutoRepair } from "react-icons/gi"
import { MdCallReceived } from "react-icons/md"
import {
  IconChecklist,
  IconAdjustmentsSearch,
  IconLoader,
  IconRosetteDiscountCheck,
  IconBasketCheck,
  IconCircleDashedX,
} from "@tabler/icons-react"
import type { TicketStatus } from "../types/tickets.types"

const statusConfig = {
  RECEIVED: {
    icon: MdCallReceived,
    label: "Received",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
  },
  UNDER_REPAIR: {
    icon: GiAutoRepair,
    label: "Under Repair",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  },
  WAITING_APPROVAL: {
    icon: IconLoader,
    label: "Waiting Approval",
    className: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300",
  },
  CANCELLED: {
    icon: IconCircleDashedX,
    label: "Cancelled",
    className: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
  },
  APPROVED: {
    icon: IconChecklist,
    label: "Approved",
    className: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  },
  DIAGNOSIS: {
    icon: IconAdjustmentsSearch,
    label: "Diagnosis",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
  },
  READY: {
    icon: IconRosetteDiscountCheck,
    label: "Ready",
    className: "bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-300",
  },
  DELIVERED: {
    icon: IconBasketCheck,
    label: "Delivered",
    className: "bg-emerald-100  text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300",
  },
  WAITING_PARTS: {
    icon: IconLoader,
    label: "Waiting Parts",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300",
  },
} as const

export function TicketStatusBadge({ status, full }: { status: TicketStatus; full?: boolean }) {
  const config = statusConfig[status]
  
  if (!config) return null
  
  const Icon = config.icon

  return (
    <Badge 
      variant="secondary" 
      className={cn(`inline-flex items-center gap-1.5 font-medium ${full ? "w-full" : ""}`, config.className)}
    >
      <Icon className="h-5! w-5! text-a" />
      {config.label}
    </Badge>
  )
}