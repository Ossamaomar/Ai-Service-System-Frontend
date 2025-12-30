import z from "zod";

export const DeviceTypeEnum = z.enum(["LAPTOP", "CAMERA", "PRINTER", "OTHER"], {
  error: "Please select a valid device type",
});

export const createDeviceSchema = z
  .object({
    serialNumber: z.string().optional(),
    customerPhone: z
      .string()
      .regex(
        /^[79]\d{7}$/,
        "Phone number must be an Omani number (8 digits starting with 7 or 9)"
      ),
    type: DeviceTypeEnum,
    otherType: z.string().optional(),
    brand: z
      .string("The brand name is required")
      .min(2, "Enter a valid brand name"),
    model: z
      .string("The model name is required")
      .min(1, "Enter a valid model name"),
    color: z
      .string("The color name is required")
      .min(3, "Enter a valid color name"),
    customerId: z.cuid("Invalid customer ID"),
  })
  .refine(
    (data) =>
      data.type !== "OTHER" || (data.otherType && data.otherType.length >= 3),
    {
      message: "Please enter a valid device type",
      path: ["otherType"],
    }
  );

// Input type (what you pass in)
export type CreateDeviceInput = z.input<typeof createDeviceSchema>;
