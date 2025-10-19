"use client";

import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { app } from "./config";

export async function testFirestoreConnection() {
  const db = getFirestore(app);
  try {
    const ref = doc(db, "tenants", "demo-tenant");
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      console.log("✅ Firestore connected!");
      console.log("Tenant:", snapshot.data());
      return { ok: true, data: snapshot.data() };
    } else {
      console.log("⚠️ Firestore connected, but tenant 'demo-tenant' not found.");
      return { ok: false, message: "Tenant 'demo-tenant' not found. Please run the seed script." };
    }
  } catch (err: any) {
    console.error("❌ Firestore connection failed:", err);
    return { ok: false, message: err.message };
  }
}

export async function verifyCollections() {
  console.log("\nVerifying collections in 'tenants/demo-tenant'...");
  const db = getFirestore(app);
  const paths = [
    "clients",
    "staff",
    "attendance",
    "billing",
    "compliance",
    "transportation",
  ];

  for (const path of paths) {
    try {
      const fullPath = `tenants/demo-tenant/${path}`;
      const snap = await getDocs(collection(db, fullPath));
      console.log(`✅ ${path}: ${snap.size} documents`);
    } catch (err: any) {
      console.error(`❌ Error checking ${path}:`, err.message);
    }
  }
}
