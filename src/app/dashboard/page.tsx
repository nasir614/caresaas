"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/useAuth";

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
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-gray-600">
        Welcome back, {user.email}! Here’s a snapshot of your organization’s activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="p-5 bg-white shadow-sm rounded-lg border">
          <h3 className="text-sm font-semibold text-gray-700">Total Clients</h3>
          <p className="text-2xl font-bold text-primary mt-1">125</p>
        </div>
        <div className="p-5 bg-white shadow-sm rounded-lg border">
          <h3 className="text-sm font-semibold text-gray-700">
            Attendance Today
          </h3>
          <p className="text-2xl font-bold text-primary mt-1">82</p>
        </div>
        <div className="p-5 bg-white shadow-sm rounded-lg border">
          <h3 className="text-sm font-semibold text-gray-700">
            Compliance Alerts
          </h3>
          <p className="text-2xl font-bold text-red-600 mt-1">3</p>
        </div>
      </div>
    </div>
  );
}