import React from "react";
import UserDashboard from "@/components/common/user-dashboard";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // // <SidebarProvider>
    //   {/* <AppSidebar /> */}
    //   {/* <SidebarInset> */}
    //   {/* </SidebarInset> */}
    //   // </SidebarProvider>
    <div className="flex min-h-screen w-full">
      <UserDashboard />
      {children}
    </div>
  );
}
