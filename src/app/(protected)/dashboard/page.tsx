"use client";
import { useState } from "react";
import { useAuth } from "@/lib/firebase/useAuth";
import { BarChart, Users, ShieldAlert } from "lucide-react";
import { testFirestoreConnection } from "@/lib/firebase/testConnection";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();
  const [testStatus, setTestStatus] = useState("Idle");

  const handleTest = async () => {
    setTestStatus("Testing connection...");
    const result = await testFirestoreConnection();
    if (result.ok) {
        setTestStatus(`✅ Success! Connected to Firestore and found tenant: ${result.data?.name}`);
    } else {
        setTestStatus(`❌ Failed. Reason: ${result.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-headline">Welcome back!</h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s a snapshot of your organization.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
          <h2 className="font-semibold text-gray-800">Firebase Connection Test</h2>
          <p className="text-sm text-gray-600">Click the button to verify the connection to the Firestore database.</p>
          <Button onClick={handleTest}>Test Firestore Connection</Button>
          <p className="mt-2 text-sm text-gray-700 font-mono p-2 bg-gray-50 rounded-md">Status: {testStatus}</p>
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
