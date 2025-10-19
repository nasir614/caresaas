/**
 * Seed sample attendance records for testing CareCloud SaaS.
 * Run with: npx ts-node scripts/seedAttendance.ts
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

// 1️⃣  Configure Firebase SDK
// IMPORTANT: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

// 2️⃣  Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3️⃣  Mock attendance data
const attendanceRecords = [
  {
    clientName: "John Doe",
    date: "2025-10-18",
    checkInTime: "09:00",
    checkOutTime: "15:30",
    status: "Present",
    notes: "Participated in group activities",
    createdAt: Timestamp.now(),
  },
  {
    clientName: "Mary Johnson",
    date: "2025-10-18",
    checkInTime: "09:15",
    checkOutTime: "15:45",
    status: "Present",
    notes: "Went for therapy session",
    createdAt: Timestamp.now(),
  },
  {
    clientName: "Ahmed Ali",
    date: "2025-10-17",
    checkInTime: "09:05",
    checkOutTime: "15:00",
    status: "Absent",
    notes: "Hospital visit, excused absence",
    createdAt: Timestamp.now(),
  },
];

async function seedAttendance() {
  const tenantPath = "tenants/demo-tenant/attendance";
  console.log("⏳ Seeding attendance data to:", tenantPath);

  for (const record of attendanceRecords) {
    await addDoc(collection(db, tenantPath), record);
    console.log("✅ Added record for:", record.clientName);
  }

  console.log("🎉 Attendance seeding complete!");
  process.exit(0);
}

seedAttendance().catch((err) => {
  console.error("❌ Error seeding attendance:", err);
  process.exit(1);
});
