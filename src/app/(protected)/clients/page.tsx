"use client";

import { useEffect, useState } from "react";
import {
  getClients,
  addClient,
  deleteClient,
  updateClient,
  Client,
} from "@/lib/firebase/clients";
import { Plus, Pencil, Trash, MoreVertical } from "lucide-react";
import ClientModal from "@/components/forms/ClientModal";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadClients = async () => {
    setLoading(true);
    const data = await getClients();
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSave = async (data: Client) => {
    if (selectedClient?.id) {
      await updateClient(selectedClient.id, data);
    } else {
      await addClient(data);
    }
    setShowModal(false);
    setSelectedClient(null);
    await loadClients();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await deleteClient(id);
    await loadClients();
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading clients...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
        <button
          onClick={() => {
            setSelectedClient(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No Clients Found</h3>
          <p className="text-sm text-gray-500 mt-1">Get started by adding your first client.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
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
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{client.email || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{client.notes || "-"}</td>
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

          {/* Mobile Card View */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{client.firstName} {client.lastName}</p>
                    <p className="text-sm text-gray-600">{client.phone}</p>
                    <p className="text-sm text-gray-600">{client.email || "No email"}</p>
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
