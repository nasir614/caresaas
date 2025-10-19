import { db, auth } from "./config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

export interface AttendanceRecord {
  id?: string;
  clientId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'unchecked';
  userId?: string;
  tenantId: string;
}

// Get all attendance for a specific date
export async function getAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const tenantId = user.uid; // Use user's UID as tenant ID
  
  const attendanceRef = collection(db, `tenants/${tenantId}/attendance`);
  const q = query(attendanceRef, where("date", "==", date));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AttendanceRecord[];
}

// Add or update an attendance record for a client on a specific date
export async function addAttendance(data: Omit<AttendanceRecord, 'id' | 'userId'>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  if(user.uid !== data.tenantId) throw new Error("Unauthorized: Tenant ID mismatch");


  const attendanceCollection = collection(db, `tenants/${data.tenantId}/attendance`);
  // Create a composite ID to ensure one record per client per day for this tenant
  const recordId = `${data.date}_${data.clientId}`;
  const docRef = doc(attendanceCollection, recordId);

  await setDoc(docRef, { ...data, userId: user.uid }, { merge: true });
}
