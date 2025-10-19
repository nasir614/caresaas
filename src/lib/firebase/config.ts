// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache, // disables offline mode for Cloud Workstations
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ Your exact Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase safely (prevents “already initialized” errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firestore with live (no offline) cache
const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
});

// ✅ Firebase Authentication
const auth = getAuth(app);

// ✅ Firebase Storage
const storage = getStorage(app);

export { app, auth, db, storage };
