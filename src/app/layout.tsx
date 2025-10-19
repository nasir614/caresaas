import "./globals.css";
import { AuthProvider } from "@/lib/firebase/useAuth";

export const metadata = { title: "CareCloud SaaS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
