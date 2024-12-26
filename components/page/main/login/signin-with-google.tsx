"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
export default function SignInWithGoogle() {
  return (
    <Button
      variant={"outline"}
      className="flex w-1/2 items-center justify-center gap-2 border border-muted py-6 lg:py-7 lg:text-xl"
      onClick={() => {
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      <FcGoogle
        className="min-h-[12px] min-w-[12px] lg:min-h-[24px] lg:min-w-[24px]"
        size={24}
      />
      Google
    </Button>
  );
}
