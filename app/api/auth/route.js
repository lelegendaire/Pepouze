import { NextResponse } from "next/server"

export async function POST(req) {
  const { username, password } = await req.json()

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true })
    res.cookies.set("admin_token", "adminloggedin", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 8, // 8 heures
    })
    return res
  }

  return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 })
}