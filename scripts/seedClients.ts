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

const clients = [
  {
    firstName: "John",
    lastName: "Doe",
    phone: "614-555-0192",
    email: "john.doe@example.com",
    address: "123 Main St, Columbus, OH",
    createdAt: Timestamp.now(),
  },
  {
    firstName: "Mary",
    lastName: "Johnson",
    phone: "614-555-0175",
    email: "mary.johnson@example.com",
    address: "456 Oak Ave, Dublin, OH",
    createdAt: Timestamp.now(),
  },
  {
    firstName: "Ahmed",
    lastName: "Ali",
    phone: "614-555-0113",
    email: "ahmed.ali@example.com",
    address: "789 Elm St, Westerville, OH",
    createdAt: Timestamp.now(),
  },
];

async function seedClients() {
  const tenantPath = "tenants/demo-tenant/clients";
  console.log("⏳ Seeding clients...");
  for (const client of clients) {
    await addDoc(collection(db, tenantPath), client);
    console.log("✅ Added client:", client.firstName);
  }
  console.log("🎉 Clients seeding complete!");
  process.exit(0);
}

seedClients().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
