import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  Timestamp,
} from "firebase/firestore";

export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  userId?: string;
  createdAt?: Timestamp;
}

export async function getClients(): Promise<Client[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const tenantId = user.uid;
  const q = query(collection(db, `tenants/${tenantId}/clients`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Client[];
}

export async function addClient(data: Omit<Client, 'id' | 'userId' | 'createdAt'>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  const tenantId = user.uid;
  await addDoc(collection(db, `tenants/${tenantId}/clients`), { 
    ...data, 
    userId: user.uid,
    createdAt: Timestamp.now(),
  });
}

export async function updateClient(id: string, data: Partial<Client>) {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");
    const tenantId = user.uid;
    await updateDoc(doc(db, `tenants/${tenantId}/clients`, id), data);
}

export async function deleteClient(id: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Unauthorized");
    const tenantId = user.uid;
    await deleteDoc(doc(db, `tenants/${tenantId}/clients`, id));
}
