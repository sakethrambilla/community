import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className="flex h-fit w-full flex-col items-center justify-center gap-8 overflow-hidden px-8 py-40 lg:px-24">
      <div className="flex h-fit w-full flex-col items-start justify-start gap-4 rounded-lg border-2 p-8 lg:flex-row lg:gap-8">
        {/* 1st Column */}
        <div className="flex w-full flex-col items-start justify-start gap-4 md:gap-8 lg:w-2/3 lg:gap-14">
          <Link
            href="/"
            className="font-nippo text-lg font-semibold lg:text-2xl"
          >
            community.sakethrambilla
          </Link>
          <h3 className="font-nippo text-4xl font-semibold md:text-6xl lg:text-7xl">
            Connect, Collaborate, and Create Together
          </h3>
          <p>
            Join our thriving community of software developers and share your
            knowledge and experiences.
          </p>
          <div className="flex w-full items-center justify-start gap-4 md:w-fit">
            <Button className="w-full">Sign Up</Button>
            <Button className="w-full">Login</Button>
          </div>
        </div>

        {/* 2nd Column */}
        <div className="flex w-1/3 flex-col items-start justify-start gap-14">
          <h3>Quick Links</h3>
          <div className="flex flex-col items-start justify-start gap-2 lg:gap-4">
            {links.map((link, index) => (
              <Link href={link.link} key={index}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Meta data */}
      <div className="flex h-full w-full flex-col items-start justify-between gap-8 text-sm lg:flex-row">
        <h3>2024 @community.sakethrambilla . All rights reserved.</h3>
        <div className="flex items-start justify-start gap-4">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
