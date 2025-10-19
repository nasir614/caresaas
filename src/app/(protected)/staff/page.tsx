"use client";

import { useEffect, useState } from "react";
import {
  getStaff,
  addStaff,
  deleteStaff,
  updateStaff,
  Staff,
} from "@/lib/firebase/staff";
import { Plus, Pencil, Trash } from "lucide-react";
import StaffModal from "@/components/forms/StaffModal";

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadStaff = async () => {
    setLoading(true);
    try {
      const data = await getStaff();
      setStaff(data);
    } catch (error) {
      console.error("Failed to load staff:", error);
      // Optionally set an error state here to show in the UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleSave = async (data: Staff) => {
    if (selectedStaff?.id) {
      await updateStaff(selectedStaff.id, data);
    } else {
      await addStaff(data);
    }
    setShowModal(false);
    setSelectedStaff(null);
    await loadStaff();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    await deleteStaff(id);
    await loadStaff();
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading staff...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Staff</h2>
        <button
          onClick={() => {
            setSelectedStaff(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      {staff.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No Staff Members Found</h3>
          <p className="text-sm text-gray-500 mt-1">Get started by adding your first staff member.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-sm rounded-lg border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staff.map((staffMember) => (
                  <tr
                    key={staffMember.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {staffMember.firstName} {staffMember.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{staffMember.role}</td>
                    <td className="px-6 py-4 text-gray-600">{staffMember.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{staffMember.email || "-"}</td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedStaff(staffMember);
                          setShowModal(true);
                        }}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                        aria-label="Edit staff"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(staffMember.id!)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                        aria-label="Delete staff"
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
            {staff.map((staffMember) => (
              <div key={staffMember.id} className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{staffMember.firstName} {staffMember.lastName}</p>
                    <p className="text-sm text-gray-600">{staffMember.role}</p>
                    <p className="text-sm text-gray-600">{staffMember.phone}</p>
                    <p className="text-sm text-gray-600">{staffMember.email || "No email"}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedStaff(staffMember);
                        setShowModal(true);
                      }}
                      className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                      aria-label="Edit staff"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(staffMember.id!)}
                      className="p-2 rounded-md hover:bg-red-50 text-red-600"
                      aria-label="Delete staff"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <StaffModal
          staff={selectedStaff}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
