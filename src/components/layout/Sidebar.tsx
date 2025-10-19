"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CheckSquare,
  Truck,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/staff", label: "Staff", icon: UserCog },
  { href: "/attendance", label: "Attendance", icon: CheckSquare },
  { href: "/transportation", label: "Transportation", icon: Truck },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const adjustedPath = path.replace("/(protected)", "");

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Dark overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 md:flex flex-col w-64 h-screen bg-white border-r shadow-sm fixed md:static z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-lg font-bold text-primary">CareCloud SaaS</h1>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = adjustedPath.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-primary/5"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t text-xs text-gray-500">
          © {new Date().getFullYear()} CareCloud
        </div>
      </aside>
    </>
  );
}