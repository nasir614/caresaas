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

const transportRecords = [
  {
    date: "2025-10-18",
    clientName: "John Doe",
    pickupLocation: "123 Main St, Columbus, OH",
    dropoffLocation: "CareCloud Center A",
    driver: "Linda White",
    status: "Completed",
    createdAt: Timestamp.now(),
  },
  {
    date: "2025-10-18",
    clientName: "Mary Johnson",
    pickupLocation: "456 Oak Ave, Dublin, OH",
    dropoffLocation: "CareCloud Center A",
    driver: "Linda White",
    status: "Pending",
    createdAt: Timestamp.now(),
  },
];

async function seedTransportation() {
  const tenantPath = "tenants/demo-tenant/transportation";
  console.log("⏳ Seeding transportation...");
  for (const trip of transportRecords) {
    await addDoc(collection(db, tenantPath), trip);
    console.log("✅ Added trip for:", trip.clientName);
  }
  console.log("🎉 Transportation seeding complete!");
  process.exit(0);
}

seedTransportation().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
