"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useProfile } from "@/lib/firebase/useProfile";
import { useAuth } from "@/lib/firebase/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Camera } from "lucide-react";

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
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setError("File size should not exceed 2MB.");
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

  if (loading || !user) return <p className="mt-10 text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg p-4 sm:p-6 md:p-8 mt-6 border">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">User Profile</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 group">
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-4xl overflow-hidden">
            {profile?.photoURL ? (
              <Image
                src={profile.photoURL}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              profile?.email?.[0]?.toUpperCase() ?? "U"
            )}
          </div>
          
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Change profile photo"
          >
            <Camera size={24} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold text-gray-800">{profile?.email ?? user.email}</p>
          <p className="text-sm text-gray-500 mt-1">Administrator Role</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4 text-center sm:text-left">{error}</p>}
      {uploading && <p className="text-blue-600 text-sm mb-4 text-center sm:text-left">Uploading image...</p>}

      <div className="border-t pt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-4">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">User ID:</span>
            <span className="font-mono text-xs bg-gray-100 p-1 rounded">{user.uid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Account Created:</span>
            <span className="font-medium text-gray-800">{new Date(user.metadata.creationTime!).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}