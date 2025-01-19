"use client";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  Code,
  Lightbulb,
  LogOut,
  MessageCircleQuestion,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const items = [
  {
    icon: Users,
    url: "/user",
  },
  {
    icon: BookOpen,
    url: "/user/classroom",
  },
  {
    icon: MessageCircleQuestion,
    url: "/user/ask-anything",
  },
  {
    icon: Lightbulb,
    url: "/user/project-ideas",
  },
  {
    icon: Code,
    url: "/user/code-with-peers",
  },
  {
    icon: Brain,
    url: "/user/weekly-catchup",
  },
];

interface UserDashboardSidebarProps {
  isSidebarOpen: boolean;
}

export default function UserDashboardSidebar({
  isSidebarOpen,
}: UserDashboardSidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  function handleThemeChange() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div
      className={cn(
        "sticky left-0 top-32 h-full flex-col items-center justify-between gap-8 px-2 py-4 transition-all duration-500 ease-in-out md:top-0 md:flex md:gap-16 md:px-4 md:py-8 lg:py-8 2xl:h-[90vh]",
        isSidebarOpen ? "flex" : "hidden",
      )}
    >
      <div className="flex flex-col items-center justify-start gap-8 lg:gap-8 2xl:gap-24">
        {/* Items */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-full bg-secondary">
          {items.map((item, index) => (
            <Link
              href={item.url}
              className={cn(
                "group flex cursor-pointer items-center justify-center rounded-full p-4",
                pathname === item.url
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
              key={index}
            >
              <item.icon className="size-4 transition-all duration-500 group-hover:scale-125 xl:size-5 2xl:size-6" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-1 rounded-full bg-secondary text-secondary-foreground">
        {/* Theme */}
        <div
          className="flex cursor-pointer items-center justify-center rounded-full p-4 transition-all duration-300 hover:scale-125"
          onClick={handleThemeChange}
        >
          {theme === "dark" ? (
            <Sun className="size-4 transition-all duration-500 xl:size-5 2xl:size-6" />
          ) : (
            <Moon className="size-4 transition-all duration-500 xl:size-5 2xl:size-6" />
          )}
        </div>
        {/* Logout */}
        <div
          className="flex cursor-pointer items-center justify-center rounded-full p-4 transition-all duration-300 hover:scale-125"
          onClick={handleSignOut}
        >
          <LogOut className="size-4 transition-all duration-500 xl:size-5 2xl:size-6" />
        </div>

        {/* User */}

        <Avatar className="size-12 rounded-full xl:size-14 2xl:size-16">
          <AvatarImage
            src={session?.user?.image || "https://github.com/shadcn.png"}
            alt={session?.user?.name ?? "CSRB"}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
