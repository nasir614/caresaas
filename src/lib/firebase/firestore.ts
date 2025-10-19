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
  onSnapshot,
} from "firebase/firestore";

// This is a new function to handle file metadata
export async function addFileMetadata(metadata: {
  userId: string;
  module: "clients" | "staff";
  recordId: string;
  fileName: string;
  fileUrl: string;
  filePath: string;
  uploadedBy: string;
}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthorized");
  const collectionPath = `tenants/${getTenantId()}/${metadata.module}/${metadata.recordId}/documents`;
  await addDoc(collection(db, collectionPath), {
    ...metadata,
    uploadedAt: Timestamp.now(),
  });
}

// A placeholder for a real tenancy solution
function getTenantId() {
  return "demo-tenant";
}

// Generic getCollection function
export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const tenantId = getTenantId();
  const q = query(collection(db, `tenants/${tenantId}/${collectionName}`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
}
