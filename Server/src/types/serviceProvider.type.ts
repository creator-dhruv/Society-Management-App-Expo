import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid ObjectId format");

export const serviceProviderValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  serviceProvided: z.string().min(1, "Service type is required"),
  contactNumber: z
    .number()
    .int({ message: "Contact number must be an integer" }),
  aadharNumber: z
    .number()
    .int()
    .refine(
      (num) => {
        const length = num.toString().length;
        return length === 12;
      },
      { message: "Identifier must be exactly 12 digits long" },
    ),
  isVerified: z.boolean().default(false),
  societies: z.array(objectIdSchema).default([]),
});

export type IServiceProvider = z.infer<typeof serviceProviderValidationSchema>;
