import type { Customer, User } from "@/features/users/types/users.types";
import z from "zod";

// Define Zod schemas first
export const TicketStatusEnum = z.enum([
  "RECEIVED",
  "APPROVED",
  "DIAGNOSIS",
  "WAITING_APPROVAL",
  "WAITING_PARTS",
  "UNDER_REPAIR",
  "READY",
  "DELIVERED",
  "CANCELLED",
]);

export const BranchesEnum = z.enum(["FARQ", "SOUQ"]);

// Derive TypeScript types from Zod schemas
export type TicketStatus = z.infer<typeof TicketStatusEnum>;
export type Branches = z.infer<typeof BranchesEnum>;

export interface TicketSummary {
  id: string;
  ticketNumber: string;
  deviceCode: string;
  assignedTechId?: string | null;
  status: TicketStatus;
  urgent: string;
  branch: Branches;
  createdAt: string;
  assignedTech?: User;
}
export interface Ticket {
  id: string;
  ticketNumber: string;
  deviceCode: string;
  deviceId: string;
  customerId: string;
  assignedTechId?: string | null;

  status: TicketStatus;
  urgent: boolean;
  branch: Branches;

  notes?: string | null;
  password?: string | null;

  includesBattery?: boolean;
  includesCharger?: boolean;
  missingSkrews?: boolean;
  hasScratches?: boolean;
  wantsBackup?: boolean;
  underWarranty?: boolean;

  assignedTech?: User;

  totalRepairsCost?: number;
  totalPartsCost?: number;
  totalPrice?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Device {
  id: string;
  serialNumber?: string;
  type: "LAPTOP" | "CAMERA" | "PRINTER" | "OTHER";
  otherType?: string;
  brand: string;
  model: string;
  color: string;
  tickets?: Ticket[];
  customer?: Customer;
  customerId: string;
  createdAt: Date;
}

// export interface TicketWithRelations extends Ticket {
//   device: Device;
//   customer: Customer;
//   assignedTech?: User | null;
//   parts: TicketPart[];
//   repairs: TicketRepair[];
// }
