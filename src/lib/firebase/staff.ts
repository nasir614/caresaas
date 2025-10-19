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
  const q = query(collection(db, "staff"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Staff[];
}

export async function addStaff(data: Staff) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  await addDoc(collection(db, "staff"), { ...data, userId: user.uid });
}

export async function updateStaff(id: string, data: Partial<Staff>) {
  await updateDoc(doc(db, "staff", id), data);
}

export async function deleteStaff(id: string) {
  await deleteDoc(doc(db, "staff", id));
}
