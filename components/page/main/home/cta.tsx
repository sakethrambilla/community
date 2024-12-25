import { Button } from "@/components/ui/button";
import React from "react";

export default function Cta() {
  return (
    <div className="  h-full w-full flex items-center p-24 justify-center">
      <div className="border-2 rounded-lg flex flex-col px-8 py-12 w-full text-center h-full gap-8  items-center justify-center">
        <h3 className="text-5xl font-semibold font-nippo w-2/3">
          Ready to Level Up Your Coding Skills?
        </h3>
        <p className="w-2/3">
          Join our community to access courses, projects, and exclusive
          resources that will accelerate your software development journey!
        </p>
        <Button>Sign to access free resources to grow your career </Button>
      </div>
    </div>
  );
}
