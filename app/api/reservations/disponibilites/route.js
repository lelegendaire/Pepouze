import { prisma } from "@/lib/prisma.config"
import { NextResponse } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  if (!date) return NextResponse.json({})

  // Récupère toutes les réservations du jour sélectionné
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)

  const reservations = await prisma.reservation.findMany({
    where: { date: { gte: start, lte: end } },
    select: { heure: true },
  })

  // Compte le nombre de réservations par créneau
  const counts = {}
  reservations.forEach(({ heure }) => {
    counts[heure] = (counts[heure] || 0) + 1
  })

  return NextResponse.json(counts)
}