import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log("REQ", req.nextauth);
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/user", req.nextUrl));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/api/vo/public")) {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/user/:path*"],
};
