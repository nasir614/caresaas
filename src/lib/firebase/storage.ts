import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage, auth } from "./config";

export async function uploadProfileImage(file: File, userId: string) {
  const user = auth.currentUser;
  if(!user) throw new Error("Unauthorized");

  const fileRef = ref(storage, `tenants/${user.uid}/profileImages/${userId}.jpg`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}

// New generalized file upload function
export function uploadFile(
    file: File,
    path: string,
    onProgress: (progress: number) => void
  ): Promise<{ downloadURL: string; filePath: string }> {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      if(!user) {
        return reject(new Error("Unauthorized"));
      }
      
      const storageRef = ref(storage, `tenants/${user.uid}/${path}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ downloadURL, filePath: path });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
