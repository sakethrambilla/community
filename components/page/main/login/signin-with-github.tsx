import { Button } from "@/components/ui/button";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function SignInWithGithub() {
  return (
    <Button
      variant={"outline"}
      className="w-1/2  lg:text-xl flex items-center justify-center gap-2  py-6 lg:py-7 rounded-lg border border-muted"
    >
      <FaGithub
        className="min-w-[12px] min-h-[12px] lg:min-w-[24px] lg:min-h-[24px]"
        size={24}
      />
      Github
    </Button>
  );
}
