"use client";

import { useEffect, useState } from "react";
import { db } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadProfileImage } from "./storage";
import { auth } from "./config";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (user: any) => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        // To ensure profile is populated with email if it's a new user
        setProfile({ email: user.email });
      }
      setLoading(false);
    };

    const unsub = auth.onAuthStateChanged((user) => {
      setLoading(true);
      fetchProfile(user);
    });

    return () => unsub();
  }, []);

  const updateProfilePhoto = async (file: File) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");
    const url = await uploadProfileImage(file, user.uid);
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { photoURL: url, email: user.email }, { merge: true });
    setProfile((prev: any) => ({ ...prev, photoURL: url }));
    return url;
  };

  return { profile, updateProfilePhoto, loading };
}
