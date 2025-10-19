import { db, auth } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  Timestamp,
  onSnapshot,
  where,
  DocumentData,
  Query,
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

  const tenantId = user.uid;
  if (metadata.userId !== tenantId) throw new Error("Unauthorized tenant access");

  const collectionPath = `tenants/${tenantId}/${metadata.module}/${metadata.recordId}/documents`;
  await addDoc(collection(db, collectionPath), {
    ...metadata,
    uploadedAt: Timestamp.now(),
  });
}

// Generic getCollection function
export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const user = auth.currentUser;
  if (!user) return [];
  const tenantId = user.uid;
  const q = query(collection(db, `tenants/${tenantId}/${collectionName}`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
}

// Generic function to subscribe to a collection
export function subscribeToCollection<T>(
    collectionName: string,
    callback: (data: T[]) => void,
    tenantId: string
  ): () => void {
    const q = query(collection(db, `tenants/${tenantId}/${collectionName}`));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
      callback(data);
    });
  
    return unsubscribe;
}
