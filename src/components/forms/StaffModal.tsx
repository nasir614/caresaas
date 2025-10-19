"use client";

import { useState } from "react";
import { Staff } from "@/app/(protected)/staff/page";
import { X } from "lucide-react";

export default function StaffModal({
  staff,
  onClose,
  onSave,
}: {
  staff: Staff | null;
  onClose: () => void;
  onSave: (data: Staff) => Promise<void>;
}) {
  const [form, setForm] = useState<Omit<Staff, "id">>(
    staff || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      role: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ ...staff, ...form });
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {staff ? "Edit Staff" : "Add Staff"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                  value={form.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                  value={form.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role *
              </label>
              <input
                type="text"
                name="role"
                placeholder="e.g. Caregiver, Administrator"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                value={form.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                value={form.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-primary focus:border-primary outline-none"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
