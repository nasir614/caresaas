"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2nfco9xBvpy4G-8FPtz-07MmtI-XdZRY",
  authDomain: "studio-8082800862-2cf3e.firebaseapp.com",
  projectId: "studio-8082800862-2cf3e",
  storageBucket: "studio-8082800862-2cf3e.appspot.com",
  messagingSenderId: "710900543925",
  appId: "1:710900543925:web:f9f51a24b3d452d8ab69fc",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
