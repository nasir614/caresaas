"use client";
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
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-sm sticky top-0">
      <div className="px-6 py-4 text-xl font-bold text-primary border-b">
        CareCloud SaaS
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                ${
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
      <div className="px-4 py-3 border-t text-xs text-gray-500">
        © {new Date().getFullYear()} CareCloud
      </div>
    </aside>
  );
}
