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
    appId: "1:710900543925:web:2b42cccf2e8e5c03ab69fc"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

if (process.env.NODE_ENV === 'development') {
    //This is a workaround for a bug in the Firebase SDK where it doesn't
    //handle HMR correctly.
    // @ts-ignore
    if (!globalThis._firebaseEmulatorsConnected) {
        console.log("Connecting to Firebase Emulators...");
        try {
            connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
            connectFirestoreEmulator(db, "127.0.0.1", 8080);
            connectStorageEmulator(storage, "127.0.0.1", 9199);
            console.log("Successfully connected to Firebase Emulators.");
        } catch (e) {
            console.error("Error connecting to Firebase emulators:", e);
        }
        // @ts-ignore
        globalThis._firebaseEmulatorsConnected = true;
    }
}


export { app, auth, db, storage };
