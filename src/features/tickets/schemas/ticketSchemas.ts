import { z } from "zod";
import { TicketStatusEnum, BranchesEnum } from "../types/tickets.types";

export const createTicketSchema = z.object({
  customerPhone: z
    .string()
    .regex(
      /^[79]\d{7}$/,
      "Phone number must be an Omani number (8 digits starting with 7 or 9)"
    ),
  deviceId: z.cuid("Invalid device ID"),
  customerId: z.cuid("Invalid customer ID"),
  assignedTechId: z.cuid("Invalid technician ID").optional(),

  status: TicketStatusEnum.default("RECEIVED"),
  urgent: z.boolean().default(false),
  branch: BranchesEnum,
  notes: z.string().max(1000).optional(),
  password: z.string().max(50).optional(),

  includesBattery: z.boolean().default(false),
  includesCharger: z.boolean().default(false),
  missingSkrews: z.boolean().default(false),
  hasScratches: z.boolean().default(false),
  wantsBackup: z.boolean().default(false),
  underWarranty: z.boolean().default(false),
});

export const updateTicketSchema = z.object({

  assignedTechId: z.cuid("Invalid technician ID").optional(),
  status: TicketStatusEnum.default("RECEIVED"),
  urgent: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
  password: z.string().max(50).optional(),
  includesBattery: z.boolean().optional(),
  includesCharger: z.boolean().optional(),
  missingSkrews: z.boolean().optional(),
  hasScratches: z.boolean().optional(),
  wantsBackup: z.boolean().optional(),
  underWarranty: z.boolean().optional(),
});

// Input type (what you pass in)
export type CreateTicketInput = z.input<typeof createTicketSchema>;
export type UpdateTicketInput = z.input<typeof updateTicketSchema>;

// Output type (what you get after validation)
// export type CreateTicketOutput = z.output<typeof createTicketSchema>;
