import { AdminSidebar } from "@/components/admin-sidebar";
import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarContent>
          <SidebarTrigger />
          {children}
        </SidebarContent>
      </SidebarProvider>
    </div>
  );
}
