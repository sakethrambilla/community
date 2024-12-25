"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Courses", href: "/courses" },
];

export default function MainNavbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-8 w-full absolute top-0 left-0 z-50 uppercase">
      <nav className="flex items-center bg-foreground text-background p-4 px-8 rounded-lg justify-between">
        <Link href="/" className="font-nippo text-2xl">
          C.SRB
        </Link>
        <div className="flex items-center text-sm gap-8">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Link href="/login" className="uppercase font-semibold">
              Register
            </Link>
          </Button>
          <div
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
      </nav>
    </div>
  );
}
