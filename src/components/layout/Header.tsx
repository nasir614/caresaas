"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/firebase/useProfile";
import { logoutUser } from "@/lib/firebase/auth";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";

export default function Header() {
  const { profile } = useProfile();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/auth/login");
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b shadow-sm sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1.5 hover:bg-gray-50 transition"
        >
          {profile?.photoURL ? (
            <Image
              src={profile.photoURL}
              width={28}
              height={28}
              alt="avatar"
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
              {profile?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <ChevronDown size={16} className="text-gray-600" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-lg z-50 animate-fade-in">
            <button
              onClick={() => {
                router.push("/profile");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <User size={16} /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
