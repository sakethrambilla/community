import { Button } from "@/components/ui/button";
import React from "react";

export default function Cta() {
  return (
    <section className="  h-full w-full flex items-center  px-8 lg:px-24 py-40 justify-center">
      <div className="border-2 rounded-lg flex flex-col px-8 py-12 w-full text-start lg:text-center h-full gap-8 items-start lg:items-center justify-center">
        <h3 className="text-4xl md:text-5xl  font-semibold font-nippo w-full lg:w-2/3">
          Ready to Level Up Your Coding Skills?
        </h3>
        <p className="w-full lg:w-2/3">
          Join our community to access courses, projects, and exclusive
          resources that will accelerate your software development journey!
        </p>
        <Button className="w-full lg:w-1/3 text-wrap h-fit">
          Sign to access free resources to grow your career{" "}
        </Button>
      </div>
    </section>
  );
}
