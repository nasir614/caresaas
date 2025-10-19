"use client";

import { useEffect, useState } from "react";
import { db, auth } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { uploadProfileImage } from "./storage";
import type { User } from "firebase/auth";

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (user: User) => {
      setLoading(true);
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        // If no profile exists, create a placeholder from auth data
        setProfile({ email: user.email, photoURL: user.photoURL });
      }
      setLoading(false);
    };

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchProfile(user);
      } else {
        setProfile(null);
        setLoading(false);
      }
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
