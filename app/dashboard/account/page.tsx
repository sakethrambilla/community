"use client";
import { useGetUserDetailsQuery } from "@/redux/user-details/api";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();
  const { data: userDetails } = useGetUserDetailsQuery(session?.user?.id || "");
  console.log("User Details", userDetails); //
  return <div>AccountPage</div>;
}
