
// Purpose: To be run from the terminal to verify that all collections exist and have data.
// Usage: npx ts-node scripts/verifyCollections.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// This config must match the one used by your seed script to connect to the LIVE project,
// as this script is intended to be run from your local machine's terminal.
const firebaseConfig = {
    apiKey: "AIzaSyA2nfco9xBvpy4G-8FPtz-07MmtI-XdZRY",
    authDomain: "studio-8082800862-2cf3e.firebaseapp.com",
    projectId: "studio-8082800862-2cf3e",
    storageBucket: "studio-8082800862-2cf3e.appspot.com",
    messagingSenderId: "710900543925",
    appId: "1:710900543925:web:b90134aa4a6a0a40ab69fc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function verifyCollections() {
  console.log("\nVerifying collections in 'tenants/demo-tenant'...");
  const paths = [
    "clients",
    "staff",
    "attendance",
    "billing",
    "compliance",
    "transportation",
  ];

  let allOk = true;
  for (const path of paths) {
    try {
      const fullPath = `tenants/demo-tenant/${path}`;
      const snap = await getDocs(collection(db, fullPath));
      if (snap.size > 0) {
        console.log(`✅ ${path}: Found ${snap.size} documents.`);
      } else {
        console.log(`⚠️ ${path}: Found 0 documents. Make sure you have run the seed script.`);
        allOk = false;
      }
    } catch (err: any) {
      console.error(`❌ Error checking ${path}:`, err.message);
      allOk = false;
    }
  }

  if (allOk) {
    console.log("\n🎉 All collections verified successfully!");
  } else {
    console.log("\n🤔 Some collections are empty or had errors. Please check your seed script and Firestore data.");
  }
}

verifyCollections()
  .catch(console.error)
  .finally(() => process.exit(0));
