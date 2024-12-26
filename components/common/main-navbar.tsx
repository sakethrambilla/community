"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Menu, SunIcon, X } from "lucide-react";
import { MoonIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Courses", href: "/courses" },
];

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mobileMenuRef = useRef(null);
  function handleMenu() {
    setIsOpen(!isOpen);
  }

  console.log("ISOpen   ", isOpen);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(mobileMenuRef.current, { y: -2000 });
    if (isOpen) {
      tl.to(mobileMenuRef.current, {
        y: 0,
        duration: 1,
      });
    } else {
      tl.to(mobileMenuRef.current, {
        y: -2000,
        duration: 1,
      });
    }
  }, [isOpen]);
  return (
    <>
      <div className="absolute left-0 top-0 z-50 w-full p-8 uppercase">
        <nav className="flex items-center justify-between rounded-lg bg-foreground p-4 px-8 text-background">
          <Link href="/" className="font-nippo text-lg md:text-xl lg:text-2xl">
            C.SRB
          </Link>
          <div className="hidden items-center gap-8 text-sm lg:flex">
            {navItems.map((item) => (
              <Link href={item.href} key={item.name}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button className="hidden lg:flex">
              <Link href="/login" className="font-semibold uppercase">
                Register
              </Link>
            </Button>

            <div
              className="cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </div>
            <div className="flex cursor-pointer lg:hidden" onClick={handleMenu}>
              {isOpen ? <X /> : <Menu />}
            </div>
          </div>
        </nav>
      </div>
      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="nav absolute left-0 top-0 z-40 h-screen w-full bg-background px-8 py-32 text-foreground"
      >
        <div className="flex flex-col gap-8 text-lg">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => setIsOpen(false)}
              className="transform transition-transform hover:translate-x-2"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)} className="">
            <Button variant="default" className="w-full py-7 text-lg">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
