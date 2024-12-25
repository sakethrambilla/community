import React from "react";
import DashboardNavbar from "@/components/common/dashboard-navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardNavbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
