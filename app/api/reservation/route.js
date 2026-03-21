import { prisma } from "@/lib/prisma.config"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const body = await req.json()
    const { nom, personnes, email, telephone, date, heure, message } = body

    const reservation = await prisma.reservation.create({
      data: {
        nom,
        personnes: parseInt(personnes),
        email,
        telephone,
        date: new Date(date),
        heure,
        message,
      },
    })

    return NextResponse.json({ success: true, reservation }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { date: "asc" },
    })
    return NextResponse.json(reservations)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}