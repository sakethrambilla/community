"use client";

import UserDashboardNavbar from "@/components/common/user-dashboard-navbar";
import UserDashboardSidebar from "@/components/common/user-dashboard-sidebar";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <UserDashboardNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex h-full w-full items-start justify-start">
        <UserDashboardSidebar isSidebarOpen={isSidebarOpen} />
        <div className="flex h-full w-full flex-col items-center justify-start transition-all duration-500 ease-in-out">
          {children}
        </div>
      </div>
    </div>
  );
}
