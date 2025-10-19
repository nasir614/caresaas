"use client";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b shadow-sm sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      <UserCircle size={26} className="text-gray-600" />
    </header>
  );
}
