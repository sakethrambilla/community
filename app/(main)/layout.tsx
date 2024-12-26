import Footer from "@/components/common/footer";
import MainNavbar from "@/components/common/main-navbar";
import React from "react";

export default function MainLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
