// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration, using environment variables
// NOTE: These are now placeholders as we are forcing emulator connection.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "dummy-sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "dummy-app",
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// FORCED EMULATOR CONNECTION FOR DEVELOPMENT
// This block is critical for ensuring connectivity in environments
// like Cloud Workstations / Firebase Studio. It bypasses any potential
// issues with environment variable detection or network policies.
console.log("⚙️ Forcing connection to Firebase Emulators");

// Point Firestore to the local emulator
connectFirestoreEmulator(db, "127.0.0.1", 8080);
// Point Auth to the local emulator
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
// Point Storage to the local emulator
connectStorageEmulator(storage, "127.0.0.1", 9199);


export { app, auth, db, storage };
