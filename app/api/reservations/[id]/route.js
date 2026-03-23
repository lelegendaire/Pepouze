import { prisma } from "@/lib/prisma.config"
import { NextResponse } from "next/server"

export async function DELETE(req, { params }) {
  const { id } = await params  // ← await ici
  try {
    await prisma.reservation.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}