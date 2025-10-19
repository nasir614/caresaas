"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/useAuth";
import { useEffect, type ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}