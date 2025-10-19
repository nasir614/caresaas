import AppSidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="p-4 sm:px-6 sm:py-0">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
