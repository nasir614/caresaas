import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const complianceRecords = [
  {
    documentName: "Staff Background Check",
    assignedTo: "Sarah Brown",
    expiryDate: "2025-12-01",
    status: "Active",
    createdAt: Timestamp.now(),
  },
  {
    documentName: "Driver License Renewal",
    assignedTo: "Linda White",
    expiryDate: "2025-11-10",
    status: "Expiring Soon",
    createdAt: Timestamp.now(),
  },
  {
    documentName: "HIPAA Training Certificate",
    assignedTo: "Michael Smith",
    expiryDate: "2026-03-05",
    status: "Active",
    createdAt: Timestamp.now(),
  },
];

async function seedCompliance() {
  const tenantPath = "tenants/demo-tenant/compliance";
  console.log("⏳ Seeding compliance...");
  for (const docData of complianceRecords) {
    await addDoc(collection(db, tenantPath), docData);
    console.log("✅ Added compliance record:", docData.documentName);
  }
  console.log("🎉 Compliance seeding complete!");
  process.exit(0);
}

seedCompliance().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
