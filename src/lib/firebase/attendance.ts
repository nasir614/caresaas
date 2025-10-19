import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
  doc,
  setDoc,
} from "firebase/firestore";

// A placeholder for a real tenancy solution
function getTenantId() {
  return "demo-tenant";
}

export interface AttendanceRecord {
  id?: string;
  clientId: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'unchecked';
  userId?: string;
}

// Get all attendance for a specific date
export async function getAttendanceByDate(date: string): Promise<AttendanceRecord[]> {
  const user = auth.currentUser;
  if (!user) return [];
  
  const attendanceRef = collection(db, `tenants/${getTenantId()}/attendance`);
  const q = query(attendanceRef, where("date", "==", date));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AttendanceRecord[];
}

// Add or update an attendance record for a client on a specific date
export async function addAttendance(data: Omit<AttendanceRecord, 'id' | 'userId'>) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");

  const attendanceCollection = collection(db, `tenants/${getTenantId()}/attendance`);
  // Create a composite ID to ensure one record per client per day for this tenant
  const recordId = `${data.date}_${data.clientId}`;
  const docRef = doc(attendanceCollection, recordId);

  await setDoc(docRef, { ...data, userId: user.uid }, { merge: true });
}
