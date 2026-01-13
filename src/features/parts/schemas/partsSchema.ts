import { BranchesEnum } from "@/features/tickets/types/tickets.types";
import z from "zod";

export const createPartSchema = z.object({
  name: z.string().min(1, "Name is required for a part"),
  branch: BranchesEnum,
  model: z.string().trim().optional(),
  sellingPrice: z.number().min(0.1, "Price must be higher than 0"),
  quantity: z.number().int().nonnegative(),
  minimumQuantity: z.number().int().nonnegative(),
});

// Input type (what you pass in)
export type CreatePartInput = z.input<typeof createPartSchema>;
