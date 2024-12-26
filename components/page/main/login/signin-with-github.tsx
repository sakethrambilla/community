"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function SignInWithGithub() {
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        signIn("github", { callbackUrl: "/dashboard" });
      }}
      className="flex w-1/2 items-center justify-center gap-2 rounded-lg border border-muted py-6 lg:py-7 lg:text-xl"
    >
      <FaGithub
        className="min-h-[12px] min-w-[12px] lg:min-h-[24px] lg:min-w-[24px]"
        size={24}
      />
      Github
    </Button>
  );
}
