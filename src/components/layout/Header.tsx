"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  UserCircle,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (e) {
      console.error(e);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 h-14 bg-white border-b shadow-sm relative z-20">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

      {/* User dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm hover:bg-gray-50 transition"
        >
          <UserCircle className="text-gray-600" size={22} />
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg animate-fade-in">
            <div className="px-4 py-2 text-sm text-gray-700 border-b font-medium">
              Logged in as <br />
              <span className="font-semibold text-primary">Admin User</span>
            </div>

            <button
              onClick={() => {
                router.push("/profile");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
            >
              <User size={16} />
              Profile
            </button>

            <button
              onClick={() => {
                router.push("/settings");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
            >
              <Settings size={16} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}