"use client";

import React from "react";
import dynamic from "next/dynamic";
const NextAuthSessionProvider = dynamic(
  () => import("next-auth/react").then((mod) => mod.SessionProvider),
  {
    ssr: false,
  },
);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
