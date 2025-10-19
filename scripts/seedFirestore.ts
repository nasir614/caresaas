
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch,
} from "firebase/firestore";

// IMPORTANT: This configuration is for the script to connect to your LIVE Firebase project.
// This is necessary because the script runs in a Node.js environment outside the app's dev server.
const firebaseConfig = {
  apiKey: "AIzaSyA2nfco9xBvpy4G-8FPtz-07MmtI-XdZRY",
  authDomain: "studio-8082800862-2cf3e.firebaseapp.com",
  projectId: "studio-8082800862-2cf3e",
  storageBucket: "studio-8082800862-2cf3e.appspot.com",
  messagingSenderId: "710900543925",
  appId: "1:710900543925:web:c62637b20f1c064cab69fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed data
async function seed() {
  console.log("🚀 Starting Firestore seeding...");
  const batch = writeBatch(db);

  const tenantRef = doc(db, "tenants", "demo-tenant");
  batch.set(tenantRef, {
    name: "Demo Tenant",
    email: "admin@carecloud.test",
    status: "active",
    createdAt: new Date().toISOString(),
  });

  // === Clients ===
  const clients = [
    {
      firstName: "John",
      lastName: "Doe",
      phone: "555-1001",
      email: "john@example.com",
      address: "123 Main St",
      status: "active",
    },
    {
      firstName: "Mary",
      lastName: "Adams",
      phone: "555-1002",
      email: "mary@example.com",
      address: "456 Oak Ave",
      status: "inactive",
    },
  ];
  for (const c of clients) {
    const ref = doc(collection(db, "tenants/demo-tenant/clients"));
    batch.set(ref, c);
  }

  // === Staff ===
  const staff = [
    {
      firstName: "Sarah",
      lastName: "Lopez",
      role: "Nurse",
      email: "sarah@carecloud.test",
      status: "active",
    },
    {
      firstName: "Mark",
      lastName: "Reed",
      role: "Caregiver",
      email: "mark@carecloud.test",
      status: "active",
    },
  ];
  for (const s of staff) {
    const ref = doc(collection(db, "tenants/demo-tenant/staff"));
    batch.set(ref, s);
  }

  // === Attendance ===
  const attendance = [
    {
      clientName: "John Doe",
      date: "2025-10-19",
      checkInTime: "09:00",
      checkOutTime: "16:30",
      status: "Present",
    },
    {
      clientName: "Mary Adams",
      date: "2025-10-19",
      checkInTime: "09:15",
      checkOutTime: "16:00",
      status: "Present",
    },
  ];
  for (const a of attendance) {
    const ref = doc(collection(db, "tenants/demo-tenant/attendance"));
    batch.set(ref, a);
  }

  // === Billing ===
  const billing = [
    {
      clientName: "John Doe",
      serviceType: "Adult Daycare",
      serviceDate: "2025-10-19",
      amount: 125.0,
      status: "Approved",
    },
    {
      clientName: "Mary Adams",
      serviceType: "Transportation",
      serviceDate: "2025-10-19",
      amount: 35.0,
      status: "Pending",
    },
  ];
  for (const b of billing) {
    const ref = doc(collection(db, "tenants/demo-tenant/billing"));
    batch.set(ref, b);
  }

  // === Compliance ===
  const compliance = [
    {
      document: "TB Test",
      staffName: "Sarah Lopez",
      expiresOn: "2025-12-01",
      status: "Expiring Soon",
    },
    {
      document: "CPR Certification",
      staffName: "Mark Reed",
      expiresOn: "2026-02-15",
      status: "Valid",
    },
  ];
  for (const c of compliance) {
    const ref = doc(collection(db, "tenants/demo-tenant/compliance"));
    batch.set(ref, c);
  }

  // === Transportation ===
  const transportation = [
    {
      driverName: "Michael Reed",
      vehicle: "Van #3",
      clientName: "John Doe",
      date: "2025-10-19",
      status: "Completed",
    },
    {
      driverName: "Paul Green",
      vehicle: "Van #1",
      clientName: "Mary Adams",
      date: "2025-10-19",
      status: "Scheduled",
    },
  ];
  for (const t of transportation) {
    const ref = doc(collection(db, "tenants/demo-tenant/transportation"));
    batch.set(ref, t);
  }

  await batch.commit();
  console.log("✅ Seeding complete! Your Firestore is ready.");
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
