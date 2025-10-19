"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Building,
  ClipboardList,
  CreditCard,
  Settings,
  LifeBuoy,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/staff", icon: ClipboardList, label: "Staff" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  };

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader className="h-14 items-center justify-center gap-2 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sidebar-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.6 15.15C17.6 15.15 17.39 16.29 16.2 16.89C15.01 17.49 13.57 17.13 13.57 17.13L12 16.5L10.43 17.13C10.43 17.13 8.99 17.49 7.8 16.89C6.61 16.29 6.4 15.15 6.4 15.15C6.4 15.15 6.86 13.88 7.94 13.33C9.02 12.78 10.43 13.15 10.43 13.15L12 13.78L13.57 13.15C13.57 13.15 14.98 12.78 16.06 13.33C17.14 13.88 17.6 15.15 17.6 15.15Z" fill="currentColor"/>
            <path d="M14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5Z" fill="currentColor"/>
          </svg>
          <span className="font-headline text-lg group-data-[collapsible=icon]:hidden">
            CareCloud
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator />
         <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Support">
                <LifeBuoy />
                <span>Support</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
