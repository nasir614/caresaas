"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffSchema } from "@/lib/validation";
import { z } from "zod";
import { createDocument, updateDocument } from "@/lib/firebase/firestore";

type Staff = z.infer<typeof staffSchema>;

export default function StaffForm({
  onClose,
  defaultValues,
  id,
}: {
  onClose: () => void;
  defaultValues?: Partial<Staff>;
  id?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Staff>({
    resolver: zodResolver(staffSchema),
    defaultValues,
  });

  const onSubmit = async (data: Staff) => {
    try {
      if (id) await updateDocument(`staff/${id}`, data);
      else await createDocument("staff", data);
      onClose();
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl bg-white p-4 shadow-card"
    >
      <h2 className="text-lg font-semibold text-primary">
        {id ? "Edit Staff" : "New Staff"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input {...register("name")} className="mt-1 w-full border rounded p-2 text-sm" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <input {...register("role")} className="mt-1 w-full border rounded p-2 text-sm" />
           {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Credential</label>
          <input {...register("credential")} className="mt-1 w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Expiration</label>
          <input type="date" {...register("expirationDate")} className="mt-1 w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <select {...register("status")} className="mt-1 w-full border rounded p-2 text-sm bg-white">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
         <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
        <button
          disabled={isSubmitting}
          className="rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80 disabled:bg-primary/50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
