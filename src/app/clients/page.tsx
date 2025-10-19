"use client";
import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "@/lib/firebase/firestore";
import ClientForm from "@/components/forms/ClientForm";
import Modal from "@/components/ui/Modal";
import { clientSchema } from "@/lib/validation";
import { z } from "zod";

type Client = z.infer<typeof clientSchema> & { id: string };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);

  const load = async () => {
    const data = await getCollection("clients");
    setClients(data as Client[]);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };
  
  const handleAdd = () => {
    setSelectedClient(undefined);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(undefined);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Clients</h1>
        <button
          onClick={handleAdd}
          className="rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80"
        >
          + Add Client
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-card">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2 font-medium">Name</th>
              <th className="p-2 font-medium">DOB</th>
              <th className="p-2 font-medium">Status</th>
              <th className="p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-t hover:bg-surface/50">
                <td className="p-2 font-medium">
                  {c.firstName} {c.lastName}
                </td>
                <td className="p-2">{c.dateOfBirth}</td>
                <td className="p-2">{c.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                   <button
                    onClick={() => deleteDocument(`clients/${c.id}`).then(load)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <ClientForm 
            id={selectedClient?.id}
            defaultValues={selectedClient}
            onClose={handleClose} 
          />
        </Modal>
      )}
    </div>
  );
}
