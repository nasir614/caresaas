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

const billingRecords = [
  {
    clientName: "John Doe",
    serviceType: "Adult Daycare",
    serviceDate: "2025-10-18",
    amount: 120.0,
    status: "Paid",
    createdAt: Timestamp.now(),
  },
  {
    clientName: "Mary Johnson",
    serviceType: "Transportation",
    serviceDate: "2025-10-18",
    amount: 45.0,
    status: "Pending",
    createdAt: Timestamp.now(),
  },
  {
    clientName: "Ahmed Ali",
    serviceType: "Home Health",
    serviceDate: "2025-10-17",
    amount: 100.0,
    status: "Paid",
    createdAt: Timestamp.now(),
  },
];

async function seedBilling() {
  const tenantPath = "tenants/demo-tenant/billing";
  console.log("⏳ Seeding billing...");
  for (const rec of billingRecords) {
    await addDoc(collection(db, tenantPath), rec);
    console.log("✅ Added billing record for:", rec.clientName);
  }
  console.log("🎉 Billing seeding complete!");
  process.exit(0);
}

seedBilling().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
