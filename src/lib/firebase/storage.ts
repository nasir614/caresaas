import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export async function uploadProfileImage(file: File, userId: string) {
  const fileRef = ref(storage, `profileImages/${userId}.jpg`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}
