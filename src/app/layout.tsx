import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/hooks/useAuth.tsx";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "CareCloud SaaS",
  description: "The All-in-One Solution for Adult Daycare Management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-gray-800">
        <AuthProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {/* Sidebar */}
              <Sidebar />

              {/* Main content area */}
              <div className="flex flex-1 flex-col bg-surface min-h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
