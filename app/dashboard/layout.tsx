import React from "react";
import UserDashboard from "@/components/common/user-dashboard";
import UserDashboardNavbar from "@/components/common/user-dashboard-navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // // <SidebarProvider>
    //   {/* <AppSidebar /> */}
    //   {/* <SidebarInset> */}
    //   {/* </SidebarInset> */}
    //   // </SidebarProvider>
    <div className="flex min-h-screen w-full">
      <UserDashboard />
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start">
        <UserDashboardNavbar />
        {children}
      </div>
    </div>
  );
}
