import { prisma } from "@/lib/prisma.config"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { emailClient, emailRestaurateur } from "@/lib/emails"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RESTAURATEUR = "thefabstudio2@gmail.com" // ← email du resto

export async function POST(req) {
  try {
    const body = await req.json()
    const { nom, personnes, email, telephone, date, heure, message } = body

    // 1. Enregistre en base
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

    // 2. Email au client
    await resend.emails.send({
      from: "Pépouze <onboarding@resend.dev>",
  to: process.env.TEST_EMAIL, // ton email uniquement
  reply_to: email,
      ...emailClient(reservation),
    })

    // 3. Email au restaurateur
    await resend.emails.send({
      from: "Pépouze <onboarding@resend.dev>",
      to: EMAIL_RESTAURATEUR,
      ...emailRestaurateur(reservation),
    })

    return NextResponse.json({ success: true, reservation }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}