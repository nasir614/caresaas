import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// A placeholder for a real tenancy solution
function getTenantId() {
  return "demo-tenant";
}

export interface Staff {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: string;
}

export async function getStaff(): Promise<Staff[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const q = query(collection(db, `tenants/${getTenantId()}/staff`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Staff[];
}

export async function addStaff(data: Staff) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  await addDoc(collection(db, `tenants/${getTenantId()}/staff`), { ...data, userId: user.uid });
}

export async function updateStaff(id: string, data: Partial<Staff>) {
  await updateDoc(doc(db, `tenants/${getTenantId()}/staff`, id), data);
}

export async function deleteStaff(id: string) {
  await deleteDoc(doc(db, `tenants/${getTenantId()}/staff`, id));
}
