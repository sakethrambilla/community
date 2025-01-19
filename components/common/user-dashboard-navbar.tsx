"use client";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Bell, GalleryVerticalEnd, Search } from "lucide-react";
import { useSession } from "next-auth/react";

interface UserDashboardNavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

export default function UserDashboardNavbar({
  isSidebarOpen,
  setIsSidebarOpen,
}: UserDashboardNavbarProps) {
  const { data: session } = useSession();
  return (
    <div className="sticky left-0 top-0 z-50 flex w-full items-start justify-between gap-8 bg-background px-2 py-4 md:px-4 md:py-8 lg:static lg:flex lg:flex-row">
      <div className="flex items-center justify-start gap-12">
        {/* Logo */}
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex cursor-pointer items-center justify-center rounded-full bg-sidebar-primary p-4 text-sidebar-primary-foreground md:cursor-default"
        >
          <GalleryVerticalEnd className="size-4 lg:size-6" />
        </div>
        {/* User Info */}
        <div className="hidden flex-col items-start justify-start lg:flex lg:gap-2">
          <h3 className="font-nippo text-2xl lg:text-4xl">{`Hi ,${session?.user?.name}`}</h3>
          <p className="text-sm text-muted-foreground lg:text-base">
            {"Let's take a look at your dashboard"}
          </p>
        </div>
      </div>

      {/* Search and Notification */}
      <div className="flex items-center justify-center gap-4">
        {/* Search */}
        <div className="flex w-full items-center rounded-full bg-secondary px-2 py-1 pr-4 text-secondary-foreground md:w-96 lg:px-4 lg:py-2">
          <Input
            placeholder="Search"
            className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-xl"
          />
          <Search className="size-4 transition-all duration-500 md:size-6" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full bg-secondary p-3 text-secondary-foreground">
            <Bell className="size-4 transition-all duration-500 md:size-6" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <div className="h-32 w-32 bg-red-500"></div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
