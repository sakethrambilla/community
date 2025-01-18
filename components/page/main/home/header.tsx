"use client";
import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, CirclePlay, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header() {
  const { theme } = useTheme();
  console.log("Theme", theme);
  return (
    <section className="flex h-full min-h-screen w-full flex-col items-start justify-start gap-4 px-8 py-40">
      <h1 className="group text-start font-nippo text-4xl font-bold md:text-5xl lg:text-6xl">
        Join the{" "}
        <span className="transition-all duration-500 group-hover:text-primary group-hover:dark:text-primary">
          {" Community "}
        </span>
        and Kickstart Your{" "}
        <span className="transition-all duration-500 group-hover:text-primary group-hover:dark:text-primary">
          {" Software "}
        </span>{" "}
        Journey Alongside{" "}
        <span className="transition-all duration-500 group-hover:text-primary group-hover:dark:text-primary">
          {" Like-Minded Peers "}
        </span>
      </h1>

      <p className="font-nippo font-normal text-gray-500 lg:w-2/3 lg:text-xl">
        Unlock the tools, knowledge, and network to excel in software
        development. Gain access to curated courses, valuable resources, and
        exclusive coding challenges designed to elevate your skills.
      </p>
      <div className="flex w-full flex-col items-start justify-center gap-4 lg:w-fit">
        <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row lg:items-center">
          <Link href={"/login"}>
            <Button
              size={"lg"}
              className="flex w-full items-center gap-2 md:w-fit"
            >
              <ChartNoAxesCombined />
              Career growth starts here
            </Button>
          </Link>
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-full transition-all duration-500 md:w-fit"
          >
            <CirclePlay />
            See how it works
          </Button>
        </div>
        <p className="flex w-full items-center justify-center gap-2 transition-all duration-500 hover:text-custom_green">
          <ShieldCheck /> No Payment Required
        </p>
      </div>
    </section>
  );
}
