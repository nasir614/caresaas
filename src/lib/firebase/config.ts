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

// This ensures we initialize on the client-side only, but the instances
// are created and exported for server-side use as well.
if (typeof window !== "undefined" && !getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Force connection to emulators in the development environment
    // This is the most reliable way to avoid network issues in Cloud Workstations
    console.log("Connecting to Firebase Emulators...");
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    console.log("Successfully connected to Firebase Emulators.");
} else if (getApps().length) {
    // If the app is already initialized, get the existing instances
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} else {
    // For server-side rendering, initialize a new app
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}


export { app, auth, db, storage };
