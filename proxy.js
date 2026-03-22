import { NextResponse } from "next/server"

export function proxy(request) {
  const token = request.cookies.get("admin_token")?.value

  if (!token || token !== "adminloggedin") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard"],
}