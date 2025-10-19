import { db, auth } from "./config";
import {
  collection,
  addDoc,
  Timestamp,
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
  const collectionPath = `users/${metadata.userId}/${metadata.module}/${metadata.recordId}/documents`;
  await addDoc(collection(db, collectionPath), {
    ...metadata,
    uploadedAt: Timestamp.now(),
  });
}
