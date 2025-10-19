
// src/lib/firebase/config.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA2nfco9xBvpy4G-8FPtz-07MmtI-XdZRY",
    authDomain: "studio-8082800862-2cf3e.firebaseapp.com",
    projectId: "studio-8082800862-2cf3e",
    storageBucket: "studio-8082800862-2cf3e.firebasestorage.app",
    messagingSenderId: "710900543925",
    appId: "1:710900543925:web:c62637b20f1c064cab69fc"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window === "undefined") {
    // Server-side initialization
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Connect to emulators in server-side development
    if (process.env.NODE_ENV === 'development') {
        try {
            console.log("Connecting to Firebase Emulators (SSR)...");
            connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
            connectFirestoreEmulator(db, "127.0.0.1", 8080);
            connectStorageEmulator(storage, "127.0.0.1", 9199);
            console.log("Successfully connected to Firebase Emulators (SSR).");
        } catch (e) {
            // Emulator may already be connected
        }
    }
} else {
    // Client-side initialization
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Connect to emulators in client-side development
    if (process.env.NODE_ENV === 'development' && !(auth as any)._isInitialized) {
        console.log("Connecting to Firebase Emulators (Client)...");
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
        connectFirestoreEmulator(db, "127.0.0.1", 8080);
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        console.log("Successfully connected to Firebase Emulators (Client).");
    }
}

export { app, auth, db, storage };
