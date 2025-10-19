"use client";

import { useState, useEffect, createContext, useContext } from "react";
import type { User } from "@/types";

// This hook would manage the global authentication state.
// In a real app, it would interact with Firebase Auth.

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: User['role'] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
    id: "user-1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "admin@example.com",
    role: "org_admin",
    tenantId: "tenant-1",
    organizationId: "org-1",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would use onAuthStateChanged from Firebase
    // to listen for authentication state changes.
    const timer = setTimeout(() => {
      // Forcing a "logged out" state initially to test the redirect logic.
      // To test the "logged in" state, you can switch this back to mockUser.
      setUser(null); 
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    user,
    loading,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
