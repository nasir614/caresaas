import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  writeBatch,
} from "firebase/firestore";

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
  const tenantId = user.uid;
  const q = query(collection(db, `tenants/${tenantId}/staff`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Staff[];
}

export async function addStaff(data: Omit<Staff, 'id'>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  const tenantId = user.uid;
  const batch = writeBatch(db);
  const docRef = doc(collection(db, `tenants/${tenantId}/staff`));
  batch.set(docRef, { ...data, userId: user.uid });
  await batch.commit();
}

export async function updateStaff(id: string, data: Partial<Staff>) {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");
    const tenantId = user.uid;
    const batch = writeBatch(db);
    const docRef = doc(db, `tenants/${tenantId}/staff`, id);
    batch.update(docRef, data);
    await batch.commit();
}

export async function deleteStaff(id: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");
    const tenantId = user.uid;
    const batch = writeBatch(db);
    const docRef = doc(db, `tenants/${tenantId}/staff`, id);
    batch.delete(docRef);
    await batch.commit();
}
