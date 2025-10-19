"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/firebase/useAuth";
import { getNotifications, markNotificationAsRead } from "@/lib/firebase/notifications";
import Link from "next/link";
import { Bell, Check } from "lucide-react";

export default function NotificationCenter() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = getNotifications(user.uid, (newNotifications) => {
        setNotifications(newNotifications);
        const unread = newNotifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleMarkAsRead = async (id: string) => {
    if(user?.uid) {
        await markNotificationAsRead(user.uid, id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-50 animate-fade-in">
          <div className="p-3 border-b">
            <h4 className="font-semibold text-gray-800">Notifications</h4>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-6">No notifications yet.</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`border-b p-3 hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}
                >
                  <Link href={notif.link || "#"} onClick={() => setIsOpen(false)}>
                    <p className="font-semibold text-sm text-gray-800">{notif.title}</p>
                    <p className="text-xs text-gray-600">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notif.date.seconds * 1000).toLocaleString()}
                    </p>
                  </Link>
                  {!notif.read && (
                     <button onClick={() => handleMarkAsRead(notif.id)} className="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2">
                        <Check size={14}/> Mark as read
                     </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
