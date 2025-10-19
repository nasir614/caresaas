"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash, DollarSign } from "lucide-react";
import { getCollection } from "@/lib/firebase/firestore";

interface Bill {
  id: string;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

export default function BillingPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBills = async () => {
    setLoading(true);
    try {
      const data = await getCollection<Bill>('billing');
      setBills(data);
    } catch (error) {
      console.error("Failed to load bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);
  
  const getStatusBadge = (status: Bill['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading billing records...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Billing</h2>
        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      {bills.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <DollarSign size={32} className="mx-auto text-gray-400 mb-2"/>
          <h3 className="text-lg font-medium text-gray-700">No Billing Records Found</h3>
          <p className="text-sm text-gray-500 mt-1">Get started by creating an invoice.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Client Name</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{bill.clientName}</td>
                  <td className="px-6 py-4 text-gray-600">${bill.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{bill.dueDate}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 rounded-md hover:bg-blue-50 text-blue-600"><Pencil size={16} /></button>
                    <button className="p-2 rounded-md hover:bg-red-50 text-red-600"><Trash size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
