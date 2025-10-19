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
import StaffModal from "@/components/forms/StaffModal";
import { Button } from "@/components/ui/button";

export interface Staff {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: string;
}

export default function StaffPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant";
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchStaff() {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, `tenants/${tenantId}/staff`));
      setStaff(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Staff[]);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, [user]);

  const handleSave = async (data: Staff) => {
    if (!user) return;
    if (selectedStaff?.id) {
      await updateDoc(
        doc(db, `tenants/${tenantId}/staff`, selectedStaff.id),
        data
      );
    } else {
      await addDoc(collection(db, `tenants/${tenantId}/staff`), {
        ...data,
        userId: user.uid,
      });
    }
    setShowModal(false);
    setSelectedStaff(null);
    await fetchStaff();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    await deleteDoc(doc(db, `tenants/${tenantId}/staff`, id));
    await fetchStaff();
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading staff...</p>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Staff</h2>
        <Button
          onClick={() => {
            setSelectedStaff(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} /> Add Staff
        </Button>
      </div>

      {staff.length === 0 ? (
        <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">
            No Staff Members Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Get started by adding your first staff member.
          </p>
        </div>
      ) : (
        <>
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
                    <td className="px-6 py-4 text-gray-600">
                      {staffMember.role}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {staffMember.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {staffMember.email || "-"}
                    </td>
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

          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staff.map((staffMember) => (
              <div
                key={staffMember.id}
                className="bg-white p-4 rounded-lg shadow-sm border space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {staffMember.firstName} {staffMember.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {staffMember.role}
                    </p>
                    <p className="text-sm text-gray-600">
                      {staffMember.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      {staffMember.email || "No email"}
                    </p>
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
