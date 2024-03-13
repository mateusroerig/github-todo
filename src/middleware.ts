import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session && request.nextUrl.pathname !== "/") {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }
}
