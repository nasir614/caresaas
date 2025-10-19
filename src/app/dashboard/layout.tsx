import AppSidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 sm:px-6 sm:py-0 flex-1">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
