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
  const q = query(collection(db, "clients"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Client[];
}

export async function addClient(data: Omit<Client, 'id' | 'userId' | 'createdAt'>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  await addDoc(collection(db, "clients"), { 
    ...data, 
    userId: user.uid,
    createdAt: Timestamp.now(),
  });
}

export async function updateClient(id: string, data: Partial<Client>) {
  await updateDoc(doc(db, "clients", id), data);
}

export async function deleteClient(id: string) {
  await deleteDoc(doc(db, "clients", id));
}
