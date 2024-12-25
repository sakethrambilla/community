import { Bell, Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const items = [
  { label: "Dashboard", url: "#", icon: Home },
  { label: "Dashboard", url: "#", icon: Home },
  { label: "Dashboard", url: "#", icon: Home },
  { label: "Dashboard", url: "#", icon: Home },
  { label: "Dashboard", url: "#", icon: Home },
];
export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between w-full py-4 px-40 border-b-2 ">
      <div className="flex items-center gap-4">
        {items.map((item, index) => (
          <Link href={item.url} key={index} className="flex items-center gap-2">
            <item.icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Bell />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
