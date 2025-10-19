import { db } from "./config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  Unsubscribe,
} from "firebase/firestore";

export const getNotifications = (
  userId: string,
  callback: (notifications: any[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, `users/${userId}/notifications`),
    orderBy("date", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifications);
  });
};

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  const notifRef = doc(db, `users/${userId}/notifications`, notificationId);
  await updateDoc(notifRef, {
    read: true,
  });
};
