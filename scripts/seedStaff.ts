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

const staffList = [
  {
    firstName: "Sarah",
    lastName: "Brown",
    role: "Nurse",
    email: "sarah.brown@carecloud.com",
    status: "Active",
    createdAt: Timestamp.now(),
  },
  {
    firstName: "Michael",
    lastName: "Smith",
    role: "Caregiver",
    email: "michael.smith@carecloud.com",
    status: "Active",
    createdAt: Timestamp.now(),
  },
  {
    firstName: "Linda",
    lastName: "White",
    role: "Driver",
    email: "linda.white@carecloud.com",
    status: "On Leave",
    createdAt: Timestamp.now(),
  },
];

async function seedStaff() {
  const tenantPath = "tenants/demo-tenant/staff";
  console.log("⏳ Seeding staff...");
  for (const staff of staffList) {
    await addDoc(collection(db, tenantPath), staff);
    console.log("✅ Added staff:", staff.firstName);
  }
  console.log("🎉 Staff seeding complete!");
  process.exit(0);
}

seedStaff().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
