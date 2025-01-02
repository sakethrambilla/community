import UserDashboardNavbar from "@/components/common/user-dashboard-navbar";
import UserDashboardSidebar from "@/components/common/user-dashboard-sidebar";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // // <SidebarProvider>
    //   {/* <AppSidebar /> */}
    //   {/* <SidebarInset> */}
    //   {/* </SidebarInset> */}
    //   // </SidebarProvider>
    <div className="flex min-h-screen w-full">
      <UserDashboardSidebar />
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-start">
        <UserDashboardNavbar />
        {children}
      </div>
    </div>
  );
}
