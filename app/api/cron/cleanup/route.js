import { prisma } from "@/lib/prisma.config"
import { NextResponse } from "next/server"

export async function GET(req) {
  // Sécurité — vérifie que c'est bien Vercel qui appelle
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const hier = new Date()
  hier.setHours(0, 0, 0, 0)

  const { count } = await prisma.reservation.deleteMany({
    where: { date: { lt: hier } },
  })

  return NextResponse.json({ deleted: count })
}