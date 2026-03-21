"use client"
import { useState } from "react"

export default function ReservationSection() {
  const [form, setForm] = useState({
    nom: "", personnes: "", email: "",
    telephone: "", date: "", heure: "", message: ""
  })
  const [status, setStatus] = useState(null) // "loading" | "success" | "error"

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setForm({ nom: "", personnes: "", email: "", telephone: "", date: "", heure: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      className="Réservation text-white flex flex-col justify-center items-center bg-[url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen relative"
      id="reservation"
    >
      <div className="bg-black opacity-60 h-full w-full absolute" />

      <div className="z-10 flex flex-col justify-center items-center w-full gap-4">
        <h1 className="text-3xl font-bold">Réservation</h1>
        <p className="text-2xl">Réserver votre table</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4">

          <div className="flex flex-col w-155">
            <label>Votre nom</label>
            <input name="nom" value={form.nom} onChange={handleChange}
              className="border-b bg-transparent focus:outline-0" required />
          </div>

          <div className="flex flex-col w-155">
            <label>Nombre de personnes</label>
            <input name="personnes" value={form.personnes} onChange={handleChange}
              className="border-b bg-transparent focus:outline-0" type="number" min="1" max="24" required />
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col w-100">
              <label>Votre mail</label>
              <input name="email" value={form.email} onChange={handleChange}
                className="border-b bg-transparent focus:outline-0" type="email" required />
            </div>
            <div className="flex flex-col w-50">
              <label>Téléphone</label>
              <input name="telephone" value={form.telephone} onChange={handleChange}
                className="border-b bg-transparent focus:outline-0" type="tel" />
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col w-100">
              <label>La date</label>
              <input name="date" value={form.date} onChange={handleChange}
                className="border-b bg-transparent focus:outline-0" type="date" required />
            </div>
            <div className="flex flex-col w-50">
              <label>L'heure</label>
              <input name="heure" value={form.heure} onChange={handleChange}
                className="border-b bg-transparent focus:outline-0" type="time" required />
            </div>
          </div>

          <div className="flex flex-col w-155">
            <label>Message (optionnel)</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              className="border-b bg-transparent focus:outline-0" />
          </div>

          {/* Feedback */}
          {status === "success" && (
            <p className="text-green-400 text-sm">✅ Réservation envoyée avec succès !</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">❌ Une erreur s'est produite, réessayez.</p>
          )}

          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={status === "loading"}
              className="p-[8px_22px] bg-transparent border-2 border-white rounded-4xl text-white text-xs font-bold uppercase cursor-pointer transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-left before:transition-transform before:duration-350 before:-z-1 hover:text-black hover:before:scale-x-100 disabled:opacity-50"
            >
              {status === "loading" ? "Envoi..." : "Réserver dès maintenant"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}