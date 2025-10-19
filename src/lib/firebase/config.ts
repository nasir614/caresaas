// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA2nfco9xBvpy4G-8FPtz-07MmtI-XdZRY",
    authDomain: "studio-8082800862-2cf3e.firebaseapp.com",
    projectId: "studio-8082800862-2cf3e",
    storageBucket: "studio-8082800862-2cf3e.appspot.com",
    messagingSenderId: "710900543925",
    appId: "1:710900543925:web:c62637b20f1c064cab69fc"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// This function ensures Firebase is initialized only once.
function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // This is the key change: Connect to emulators if they are running.
  // The process.env.NODE_ENV check ensures this only happens in development.
  if (process.env.NODE_ENV === 'development') {
    // Check if emulators are already connected to avoid re-connecting
    // The `_isInitialized` property is an unofficial way to check, but effective.
    if (!(auth as any)._isInitialized) {
        console.log("Connecting to Firebase Emulators...");
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
        connectFirestoreEmulator(db, "127.0.0.1", 8080);
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        console.log("Successfully connected to Firebase Emulators.");
    }
  }
}

// Call the initialization function to set up the services.
initializeFirebase();

export { app, auth, db, storage };
