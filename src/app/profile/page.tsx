"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useProfile } from "@/lib/firebase/useProfile";
import { useAuth } from "@/lib/firebase/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }
  }, [user, router]);
  const { profile, updateProfilePhoto, loading } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }
    setUploading(true);
    setError("");
    try {
      await updateProfilePhoto(file);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading || !user) return <p className="mt-10 text-center">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-sm rounded-lg p-6 mt-6 border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">User Profile</h2>

      <div className="flex items-center gap-6 mb-4">
        <div className="relative w-24 h-24">
          {profile?.photoURL ? (
            <Image
              src={profile.photoURL}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {profile?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}

          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-full shadow hover:bg-blue-600"
          >
            Edit
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        <div>
          <p className="text-gray-700 font-semibold">{profile?.email ?? user.email}</p>
          <p className="text-sm text-gray-500 mt-1">Role: Admin</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {uploading && <p className="text-blue-600 text-sm">Uploading...</p>}
    </div>
  );
}
