"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import TextEditor from "@/components/common/text-editor";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AddPost() {
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex h-fit w-full justify-start gap-4 rounded-xl border px-4 py-2 md:max-w-[60vw] lg:w-2/3 lg:rounded-2xl lg:px-8 lg:py-6",
        open ? "items-start" : "items-center",
      )}
    >
      {/* Profile Photo */}
      <Avatar className="hidden size-8 rounded-full lg:block lg:size-12">
        <AvatarImage
          src={session?.user?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col items-start gap-2">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          {!open && (
            <CollapsibleTrigger className="flex w-full flex-col items-start justify-start gap-2">
              <div className="flex h-full w-full items-center justify-start lg:text-2xl">
                {"Write Something"}
              </div>
            </CollapsibleTrigger>
          )}
          <CollapsibleContent className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-start">
              {open && <h3 className="text-lg lg:text-2xl">{"Title:"}</h3>}
              <Input
                className="w-full border-none bg-transparent text-lg focus-visible:ring-0 lg:text-2xl"
                placeholder="Write Something"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="lg:text-lg">{"Content:"}</p>
              <TextEditor value={value} onChange={setValue} />
            </div>
          </CollapsibleContent>
        </Collapsible>
        {open && (
          <div className="flex items-center justify-center gap-2">
            <Button>{"Add Post"}</Button>
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              {"Cancel"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
