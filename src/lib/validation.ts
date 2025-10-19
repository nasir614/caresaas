import { z } from "zod";

export const clientSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

export const staffSchema = z.object({
  name: z.string().min(1, "Name required"),
  role: z.string().min(1, "Role required"),
  credential: z.string().optional(),
  expirationDate: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});
