import { NextResponse } from "next/server";

export function middleware(req) {
  // No auth logic here
  // No Supabase here
  // No redirects here
  return NextResponse.next();
}

export const config = {
  matcher: ["/favourites/:path*"],
};
