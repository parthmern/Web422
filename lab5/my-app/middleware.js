import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    console.log(`API ==> ${req.method} ${req.nextUrl.pathname}`);
  }

  return NextResponse.next(); // calling next original handler
  // req --> middleware ---> original handler
}
