"use client";
import { useAuth } from "@/lib/firebase/useAuth";
import { BarChart, Users, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-headline">Welcome back!</h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s a snapshot of your organization.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600">Total Clients</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">125</p>
            <p className="text-xs text-green-600 mt-2">+5.2% from last month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <BarChart className="text-green-600" size={24} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600">Attendance Today</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">82</p>
            <p className="text-xs text-gray-500 mt-2">91% of expected</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <ShieldAlert className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600">Compliance Alerts</h2>
            <p className="text-3xl font-bold text-red-600 mt-1">3</p>
            <p className="text-xs text-gray-500 mt-2">2 credentials expiring</p>
          </div>
        </div>
      </div>
    </div>
  );
}
