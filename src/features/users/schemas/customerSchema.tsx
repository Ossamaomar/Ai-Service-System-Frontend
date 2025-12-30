import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(2, "Minimum length for a name is two characters"),
  phone: z
    .string()
    .regex(
      /^[79]\d{7}$/,
      "Phone number must be an Omani number (8 digits starting with 7 or 9)"
    ),
  email: z.email("Please provide a valid email").toLowerCase().optional(),
});

// Input type (what you pass in)
export type CreateCustomerInput = z.input<typeof createCustomerSchema>;

// Output type (what you get after validation)
// export type CreateTicketOutput = z.output<typeof createTicketSchema>;
