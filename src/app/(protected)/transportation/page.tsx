"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/useAuth";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransportRecord {
  id?: string;
  date: string;
  clientName: string;
  pickupLocation: string;
  dropoffLocation: string;
  driver: string;
  status: string;
}

export default function TransportationPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant";
  const [records, setRecords] = useState<TransportRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransportation() {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const snap = await getDocs(
        collection(db, `tenants/${tenantId}/transportation`)
      );
      setRecords(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })) as TransportRecord[]
      );
    } catch (error) {
      console.error("Error fetching transportation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransportation();
  }, [user]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading transportation...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Transportation</h2>
        <Button>+ New Trip</Button>
      </div>
      {records.length === 0 ? (
        <div className="text-center py-20 px-4 border-2 border-dashed rounded-lg">
          <Truck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">
            No Transportation Records
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Schedule a new trip to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Pickup</th>
                <th className="p-3 text-left">Dropoff</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{r.clientName}</td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">{r.pickupLocation}</td>
                  <td className="p-3">{r.dropoffLocation}</td>
                  <td className="p-3">{r.driver}</td>
                  <td className="p-3">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
