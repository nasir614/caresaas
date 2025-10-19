"use client";

import { useEffect, useState } from "react";
import {
  getClients,
  addClient,
  deleteClient,
  updateClient,
  Client,
} from "@/lib/firebase/clients";
import { Plus, Pencil, Trash } from "lucide-react";
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
    if (!confirm("Delete this client?")) return;
    await deleteClient(id);
    await loadClients();
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading clients...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Clients</h2>
        <button
          onClick={() => {
            setSelectedClient(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <Plus size={18} /> Add Client
        </button>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500 text-sm">No clients found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {client.firstName} {client.lastName}
                  </td>
                  <td className="px-4 py-3">{client.phone}</td>
                  <td className="px-4 py-3">{client.email || "-"}</td>
                  <td className="px-4 py-3">{client.notes || "-"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedClient(client);
                        setShowModal(true);
                      }}
                      className="p-1 rounded hover:bg-blue-50 text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id!)}
                      className="p-1 rounded hover:bg-red-50 text-red-600"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
