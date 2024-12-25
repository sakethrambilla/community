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
    <footer className="w-full h-fit flex flex-col items-center justify-center gap-8 p-24">
      <div className="h-fit w-full border-2 rounded-lg flex items-start justify-start gap-8 p-8">
        {/* 1st Column */}
        <div className="flex flex-col items-start justify-start gap-14 w-2/3">
          <Link href="/" className="text-2xl font-semibold font-nippo">
            community.sakethrambilla
          </Link>
          <h3 className="text-7xl font-semibold font-nippo">
            Connect, Collaborate, and Create Together
          </h3>
          <p>
            Join our thriving community of software developers and share your
            knowledge and experiences.
          </p>
          <div className="flex items-center justify-start gap-4">
            <Button>Sign Up</Button>
            <Button>Login</Button>
          </div>
        </div>

        {/* 2nd Column */}
        <div className="flex flex-col items-start justify-start gap-14 w-1/3">
          <h3>Quick Links</h3>
          <div className="flex flex-col items-start justify-start gap-4">
            {links.map((link, index) => (
              <Link href={link.link} key={index}>
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Meta data */}
      <div className="w-full h-full flex items-start justify-between">
        <h3>2024 @community.sakethrambilla . All rights reserved.</h3>
        <div className="flex items-start justify-start gap-4">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
