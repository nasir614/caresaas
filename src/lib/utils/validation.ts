import { z } from 'zod';

// Client Form Validation Schema
export const clientSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
  phone: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().min(1, { message: "Contact name is required" }),
    phone: z.string().min(1, { message: "Contact phone is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
  }),
});

// Attendance Form Validation Schema
export const attendanceSchema = z.object({
  clientId: z.string().min(1),
  date: z.date(),
  checkInTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM)" }),
  checkOutTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM)" }).optional(),
});

// Care Plan Form Validation Schema
export const carePlanSchema = z.object({
  clientId: z.string().min(1),
  startDate: z.date(),
  goals: z.array(z.string().min(1)).min(1, { message: "At least one goal is required" }).max(10),
});

// Staff Form Validation Schema
export const staffSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(['org_admin', 'caregiver', 'nurse']),
});
