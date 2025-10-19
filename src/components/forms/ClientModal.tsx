"use client";

import { useState } from "react";
import { Client } from "@/lib/firebase/clients";

export default function ClientModal({
  client,
  onClose,
  onSave,
}: {
  client: Client | null;
  onClose: () => void;
  onSave: (data: Client) => Promise<void>;
}) {
  const [form, setForm] = useState<Client>(
    client || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        <h3 className="text-lg font-semibold mb-4">
          {client ? "Edit Client" : "Add Client"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["firstName", "lastName", "phone", "email", "address"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize text-gray-700">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                required={["firstName", "lastName", "phone"].includes(field)}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              rows={3}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
