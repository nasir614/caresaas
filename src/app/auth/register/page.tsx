"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/firebase/auth";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      let friendlyMessage = "An error occurred during registration.";
      if (err.code === "auth/email-already-in-use") {
        friendlyMessage = "This email address is already in use.";
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = "Please enter a valid email address."
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 shadow-md rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">Join CareCloud to manage your organization.</p>


        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              className="w-full border rounded-md px-10 py-2.5 mt-1 focus:ring-primary focus:border-primary outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              className="w-full border rounded-md px-10 py-2.5 mt-1 focus:ring-primary focus:border-primary outline-none"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-md py-2.5 font-medium hover:bg-blue-600 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
