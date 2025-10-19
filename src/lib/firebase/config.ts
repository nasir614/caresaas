// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration, using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Connect to emulators in development.
// This block MUST be after the service initializations.
if (process.env.NODE_ENV === "development") {
  console.log("⚙️ Using Firebase Emulators");
  // Point Firestore to the local emulator
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  // Point Auth to the local emulator
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  // Point Storage to the local emulator
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { app, auth, db, storage };
