"use client";
import { useAuth } from "@/lib/firebase/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600">
        Welcome back, {user?.email}! Here's a snapshot of your organization's
        activity.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm font-semibold text-gray-600">Total Clients</h2>
          <p className="text-2xl font-bold text-primary mt-2">125</p>
          <p className="text-xs text-gray-500 mt-1">+5.2% month-over-month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm font-semibold text-gray-600">Attendance Today</h2>
          <p className="text-2xl font-bold text-primary mt-2">82</p>
          <p className="text-xs text-gray-500 mt-1">91% of expected</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-sm font-semibold text-gray-600">Compliance Alerts</h2>
          <p className="text-2xl font-bold text-red-600 mt-2">3</p>
          <p className="text-xs text-gray-500 mt-1">2 credentials expiring soon</p>
        </div>
      </div>
    </div>
  );
}
