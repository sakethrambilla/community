"use client";
import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, CirclePlay, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function Header() {
  const { theme } = useTheme();
  console.log("Theme", theme);
  return (
    <div className="flex flex-col  items-start justify-start h-screen gap-4 w-full px-8 py-40">
      <h1 className="text-6xl font-nippo font-bold text-start  group">
        Join the{" "}
        <span className="group-hover:text-secondary transition-all duration-500 group-hover:dark:text-primary">
          {" Community "}
        </span>
        and Kickstart Your{" "}
        <span className="group-hover:text-secondary transition-all duration-500 group-hover:dark:text-primary">
          {" Software "}
        </span>{" "}
        Journey Alongside{" "}
        <span className="group-hover:text-secondary transition-all duration-500 group-hover:dark:text-primary">
          {" Like-Minded Peers "}
        </span>
      </h1>

      <p className="text-xl w-2/3 font-nippo font-normal text-gray-500">
        Unlock the tools, knowledge, and network to excel in software
        development. Gain access to curated courses, valuable resources, and
        exclusive coding challenges designed to elevate your skills.
      </p>
      <div className="flex flex-col gap-4 w-fit items-start justify-center">
        <div className="flex items-center justify-start gap-4">
          <Button size={"lg"} className="   flex items-center gap-2">
            <ChartNoAxesCombined />
            Career growth starts here
          </Button>
          <Button
            size={"lg"}
            variant={"outline"}
            className=" transition-all duration-500 "
          >
            <CirclePlay />
            See how it works
          </Button>
        </div>
        <p className="flex items-center hover:text-custom_green transition-all duration-500 justify-center w-full gap-2">
          <ShieldCheck /> No Payment Required
        </p>
      </div>
    </div>
  );
}
