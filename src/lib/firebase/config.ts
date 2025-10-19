
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

// Singleton pattern to initialize Firebase app only once
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Connect to emulators in development.
    // The `process.env.NODE_ENV` check ensures this only runs in dev,
    // and the `!auth.emulatorConfig` check prevents reconnecting on hot reloads.
    if (process.env.NODE_ENV === 'development') {
        console.log("Connecting to Firebase Emulators...");
        try {
            // Check if not already connected
            if (!auth.emulatorConfig) {
                connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
            }
            if (!(db.toJSON() as any).settings.host) {
                 connectFirestoreEmulator(db, "127.0.0.1", 8080);
            }
            if (!(storage as any).emulator) {
                connectStorageEmulator(storage, "127.0.0.1", 9199);
            }
            console.log("Successfully connected to Firebase Emulators.");
        } catch (e) {
            console.error("Error connecting to Firebase emulators:", e);
        }
    }
} else {
    // If the app is already initialized, get the existing instances
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

export { app, auth, db, storage };
