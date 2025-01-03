"use client";
import UserDetailsForm from "@/components/page/dashboard/account/user-details-form";
import { Separator } from "@/components/ui/separator";
import { useGetUserDetailsQuery } from "@/redux/user-details/api";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function AccountPage() {
  const { data: session } = useSession();
  const { data: userDetails } = useGetUserDetailsQuery(session?.user?.id || "");
  console.log("User Details", userDetails); //
  return (
    <div className="flex w-full flex-col gap-4 p-4 lg:gap-8 lg:p-12">
      <div className="flex items-start justify-start gap-5 rounded-2xl">
        <Image
          src={session?.user?.image || "https://github.com/shadcn.png"}
          alt="Profile Picture"
          width={100}
          height={100}
          className="h-40 w-auto rounded-2xl border border-muted"
          unoptimized
        />
        <div className="flex flex-col py-4">
          <h1 className="text-4xl">{session?.user?.name}</h1>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>
      <Separator className="w-full" />
      {/* User Details */}
      <UserDetailsForm />
    </div>
  );
}
