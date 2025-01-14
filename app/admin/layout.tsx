import { AppSidebar } from "@/components/app-sidebar";
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
        <AppSidebar />
        <SidebarContent>
          <SidebarTrigger />
          {children}
        </SidebarContent>
      </SidebarProvider>
    </div>
  );
}
