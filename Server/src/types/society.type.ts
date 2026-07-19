import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z
  .string()
  .regex(objectIdRegex, "Invalid ObjectId format");

const addressSchema = z.object({
  street: z.string().optional(),
  locality: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

const facilitySchema = z.object({
  name: z.string().min(1, "Facility name is required"),
  description: z.string().optional(),
});

const securityMemberSchema = z.object({
  _id: objectIdSchema,
  address: z.object({
    towerNo: z.string().min(1, "Tower number is required for security members"),
  }),
});

export const societyValidationSchema = z.object({
  name: z.string().trim().min(1, "Society name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  address: addressSchema,
  totalTowers: z.number().int().min(1).default(1),
  totalFlats: z.number().int().min(1).default(1),
  facilities: z.array(facilitySchema).default([]),
  contactEmail: z
    .string()
    .email("Please fill a valid email address")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().min(1, "Contact phone is required"),
  chairman: objectIdSchema.optional(),
  committeeMembers: z.array(objectIdSchema).default([]),
  securityMembers: z.array(securityMemberSchema).default([]),
  maintenanceRate: z
    .number()
    .positive("Maintenance rate must be a positive number"),
  maintenanceFrequency: z
    .enum(["Monthly", "Quarterly", "Annually"])
    .default("Monthly"),
  isActive: z.boolean().default(true),
});

export type ISociety = z.infer<typeof societyValidationSchema>;
