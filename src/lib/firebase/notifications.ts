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

// A placeholder for a real tenancy solution
function getTenantId() {
  return "demo-tenant";
}

export const getNotifications = (
  userId: string,
  callback: (notifications: any[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, `tenants/${getTenantId()}/notifications`),
    where("userId", "==", userId),
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
  const notifRef = doc(db, `tenants/${getTenantId()}/notifications`, notificationId);
  await updateDoc(notifRef, {
    read: true,
  });
};
