"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/useAuth";
import { Plus, Pencil, Trash } from "lucide-react";
import ClientModal from "@/components/forms/ClientModal";
import { Button } from "@/components/ui/button";

export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  userId?: string;
  createdAt?: Timestamp;
}

export default function ClientsPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant";
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchClients() {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, `tenants/${tenantId}/clients`));
      setClients(
        snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Client[]
      );
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, [user]);

  const handleSave = async (data: Client) => {
    if (!user) return;
    if (selectedClient?.id) {
      await updateDoc(
        doc(db, `tenants/${tenantId}/clients`, selectedClient.id),
        data
      );
    } else {
      await addDoc(collection(db, `tenants/${tenantId}/clients`), {
        ...data,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
    }
    setShowModal(false);
    setSelectedClient(null);
    await fetchClients();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this client?")) return;
    await deleteDoc(doc(db, `tenants/${tenantId}/clients`, id));
    await fetchClients();
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading clients...</p>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
        <Button
          onClick={() => {
            setSelectedClient(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} /> Add Client
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">
            No Clients Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Get started by adding your first client.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto bg-white shadow-sm rounded-lg border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Notes</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {client.email || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                      {client.notes || "-"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowModal(true);
                        }}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                        aria-label="Edit client"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id!)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                        aria-label="Delete client"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-4 rounded-lg shadow-sm border space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {client.firstName} {client.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                    <p className="text-sm text-gray-600">
                      {client.email || "No email"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowModal(true);
                      }}
                      className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                      aria-label="Edit client"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id!)}
                      className="p-2 rounded-md hover:bg-red-50 text-red-600"
                      aria-label="Delete client"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                {client.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                    <strong>Notes:</strong> {client.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <ClientModal
          client={selectedClient}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
