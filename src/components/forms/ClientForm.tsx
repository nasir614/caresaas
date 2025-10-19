"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@/lib/validation";
import { z } from "zod";
import { createDocument, updateDocument } from "@/lib/firebase/firestore";

type Client = z.infer<typeof clientSchema>;

export default function ClientForm({
  onClose,
  defaultValues,
  id,
}: {
  onClose: () => void;
  defaultValues?: Partial<Client>;
  id?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const onSubmit = async (data: Client) => {
    try {
      if (id)
        await updateDocument(`clients/${id}`, data);
      else await createDocument("clients", data);
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
        {id ? "Edit Client" : "New Client"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <input {...register("firstName")} className="mt-1 w-full border rounded p-2 text-sm" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input {...register("lastName")} className="mt-1 w-full border rounded p-2 text-sm" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} className="mt-1 w-full border rounded p-2 text-sm" />
           {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input {...register("phone")} className="mt-1 w-full border rounded p-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input {...register("email")} className="mt-1 w-full border rounded p-2 text-sm" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
