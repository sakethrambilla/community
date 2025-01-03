"use client";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Brain,
  Code,
  CreditCard,
  GalleryVerticalEnd,
  Lightbulb,
  LogOut,
  MessageCircleQuestion,
  Moon,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const items = [
  {
    icon: Users,
    url: "/dashboard",
  },
  {
    icon: BookOpen,
    url: "/dashboard/classroom",
  },
  {
    icon: MessageCircleQuestion,
    url: "/dashboard/ask-me-anything",
  },
  {
    icon: Lightbulb,
    url: "/dashboard/project-ideas",
  },
  {
    icon: Code,
    url: "/dashboard/code-with-peers",
  },
  {
    icon: Brain,
    url: "/dashboard/weekly-catchup",
  },
];

export default function UserDashboardSidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sticky left-0 top-0 flex h-screen flex-col items-center justify-between px-1 py-4 md:px-4 md:py-8 lg:p-8">
      <div className="flex flex-col items-center justify-start gap-8 lg:gap-8 2xl:gap-24">
        {/* Logo */}
        <div className="flex items-center justify-center rounded-full bg-sidebar-primary p-4 text-sidebar-primary-foreground">
          <GalleryVerticalEnd className="size-4 lg:size-6" />
        </div>

        {/* Items */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-full bg-secondary">
          {items.map((item, index) => (
            <Link
              href={item.url}
              className={cn(
                "flex items-center justify-center rounded-full p-4 transition-all duration-300",
                pathname === item.url && "bg-primary text-primary-foreground",
              )}
              key={index}
            >
              <item.icon className="size-4 lg:size-6" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-center gap-1 rounded-full bg-secondary">
        {/* Theme */}
        <div
          className="flex items-center justify-center rounded-full p-4"
          onClick={handleThemeChange}
        >
          {theme === "dark" ? (
            <Sun className="size-4 lg:size-6" />
          ) : (
            <Moon className="size-4 lg:size-6" />
          )}
        </div>
        {/* Logout */}
        <div className="flex items-center justify-center rounded-full p-4">
          <LogOut className="size-4 lg:size-6" />
        </div>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="size-12 rounded-full lg:size-14">
              <AvatarImage
                src={session?.user?.image || "https://github.com/shadcn.png"}
                alt={session?.user?.name ?? "CSRB"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="ml-20 w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg lg:ml-24"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      session?.user?.image || "https://github.com/shadcn.png"
                    }
                    alt={session?.user?.name ?? "CSRB"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/dashboard/account">
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
