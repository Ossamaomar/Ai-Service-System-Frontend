
import z from "zod";

export const createRepairSchema = z.object({
  name: z.string().trim().min(2, "Repair name is required"),
  price: z.number().min(0.1 , "Price must be higher than 0"),
});

// Input type (what you pass in)
export type CreateRepairInput = z.input<typeof createRepairSchema>;
