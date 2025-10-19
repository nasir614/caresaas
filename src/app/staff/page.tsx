"use client";
import { useEffect, useState } from "react";
import { getCollection, deleteDocument } from "@/lib/firebase/firestore";
import StaffForm from "@/components/forms/StaffForm";
import Modal from "@/components/ui/Modal";
import { z } from "zod";
import { staffSchema } from "@/lib/validation";

type Staff = z.infer<typeof staffSchema> & { id: string };

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(undefined);


  const load = async () => {
    const data = await getCollection("staff");
    setStaff(data as Staff[]);
  };

  const handleEdit = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedStaff(undefined);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(undefined);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Staff</h1>
        <button
          onClick={handleAdd}
          className="rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80"
        >
          + Add Staff
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-4 shadow-card">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2 font-medium">Name</th>
              <th className="p-2 font-medium">Role</th>
              <th className="p-2 font-medium">Expiration</th>
              <th className="p-2 font-medium">Status</th>
              <th className="p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-t hover:bg-surface/50">
                <td className="p-2 font-medium">{s.name}</td>
                <td className="p-2">{s.role}</td>
                <td className="p-2">{s.expirationDate || "—"}</td>
                <td className="p-2">{s.status}</td>
                <td className="p-2 space-x-2">
                   <button
                    onClick={() => handleEdit(s)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteDocument(`staff/${s.id}`).then(load)}
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
          <StaffForm 
            id={selectedStaff?.id}
            defaultValues={selectedStaff}
            onClose={handleClose} 
          />
        </Modal>
      )}
    </div>
  );
}
