"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function UserDashboardNavbar() {
  const { data: session } = useSession();
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-8 p-4 lg:flex-row lg:p-12">
      {/* User Info */}
      <div className="flex flex-col items-start justify-start gap-2">
        <h3 className="font-nippo text-4xl">{`Hi ,${session?.user?.name}`}</h3>
        <p className="text-muted-foreground">
          {"Let's take a look at your dashboard"}
        </p>
      </div>

      {/* Search and Notification */}
      <div className="flex items-center justify-center gap-4">
        {/* Search */}
        <div className="flex w-full items-center rounded-full bg-secondary px-3 py-2 text-secondary-foreground md:w-96 lg:px-4 lg:py-3">
          <Input
            placeholder="Search"
            className="border-none text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Search className="size-6 lg:size-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Bell className="size-10 rounded-full bg-secondary p-3 text-primary lg:size-14" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <div className="h-32 w-32 bg-red-500"></div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
