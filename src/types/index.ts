// This file contains all the core TypeScript interfaces for the application data models.

export type Role = "admin" | "org_admin" | "caregiver" | "nurse";

export interface Tenant {
  id: string;
  name: string;
  createdAt: any; // Firestore Timestamp
}

export interface Organization {
  id: string;
  tenantId: string;
  name: string;
}

export interface User {
  id: string; // This will be the Firebase Auth UID
  tenantId?: string;
  organizationId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  assignedClientIds?: string[];
  createdAt: any; // Firestore Timestamp
}

export interface Client {
  id: string;
  tenantId: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  status: "Active" | "Inactive" | "Pending";
  assignedCaregivers?: string[];
  assignedNurses?: string[];
  // Other fields like address, contacts, etc. would go here
}

export interface AttendanceRecord {
  id: string;
  clientId: string;
  checkInTime: any; // Firestore Timestamp
  checkOutTime?: any; // Firestore Timestamp
  date: any; // Firestore Timestamp
  recordedBy: string; // User ID
}

export interface CarePlan {
  id: string;
  clientId: string;
  goals: string[];
  startDate: any; // Firestore Timestamp
  endDate?: any; // Firestore Timestamp
  notes?: string;
  authorId: string; // User ID
}

export interface Billing {
  subscriptionId: string;
  stripeCustomerId: string;
  status: "active" | "inactive" | "past_due" | "canceled";
  currentPeriodEnd: any; // Firestore Timestamp
}
