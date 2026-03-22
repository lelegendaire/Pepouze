"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, List, LogOut, Users, Calendar, Clock } from "lucide-react"
import { California_Paradise } from "../font"

export default function Dashboard() {
  const router = useRouter()
  const [reservations, setReservations] = useState([])
  const [view, setView] = useState("grille") // "liste" | "grille"

  useEffect(() => {
    fetch("/api/reservation")
      .then((r) => r.json())
      .then(setReservations)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  return (
    <main className="min-h-screen bg-[#f7f6f2] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className={`${California_Paradise.className} text-[#6d111c] text-5xl`}>
              Pépouze
            </h1>
            <p className="text-[#6d111c] opacity-40 text-xs tracking-widest uppercase mt-1">
              Dashboard · {reservations.length} réservation(s)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle vue */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#6d111c]/10">
              <button
                onClick={() => setView("liste")}
                className={`p-2 rounded-full transition-all ${view === "liste" ? "bg-[#6d111c] text-white" : "text-[#6d111c] opacity-40 hover:opacity-70"}`}
                title="Vue liste"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setView("grille")}
                className={`p-2 rounded-full transition-all ${view === "grille" ? "bg-[#6d111c] text-white" : "text-[#6d111c] opacity-40 hover:opacity-70"}`}
                title="Vue grille"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-[#6d111c]/20 rounded-full text-[#6d111c] text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c] hover:text-white transition-all"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* ── VUE LISTE ── */}
        {view === "liste" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-[#6d111c]">
              <thead className="bg-[#6d111c] text-white text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Nom</th>
                  <th className="px-6 py-4 text-left">Personnes</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Heure</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Téléphone</th>
                  <th className="px-6 py-4 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r, i) => (
                  <tr key={r.id}
                    className={`border-t border-[#6d111c]/10 ${i % 2 === 0 ? "bg-white" : "bg-[#f7f6f2]"}`}>
                    <td className="px-6 py-4 font-medium">{r.nom}</td>
                    <td className="px-6 py-4">{r.personnes} pers.</td>
                    <td className="px-6 py-4">{formatDate(r.date)}</td>
                    <td className="px-6 py-4">{r.heure}</td>
                    <td className="px-6 py-4">{r.email}</td>
                    <td className="px-6 py-4">{r.telephone}</td>
                    <td className="px-6 py-4 opacity-60 italic">{r.message || "—"}</td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center opacity-30">
                      Aucune réservation pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── VUE GRILLE ── */}
        {view === "grille" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reservations.map((r) => (
              <div key={r.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5 flex flex-col gap-4 hover:shadow-md transition-shadow">

                {/* Nom + personnes */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#6d111c] text-lg">{r.nom}</h3>
                  <span className="flex items-center gap-1 bg-[#6d111c]/8 text-[#6d111c] text-xs font-bold px-3 py-1 rounded-full">
                    <Users size={12} />
                    {r.personnes} pers.
                  </span>
                </div>

                {/* Date + heure */}
                <div className="flex items-center gap-4 text-sm text-[#6d111c] opacity-60">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(r.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {r.heure}
                  </span>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-[#6d111c]/8" />

                {/* Contact */}
                <div className="flex flex-col gap-1 text-xs text-[#6d111c] opacity-60">
                  <p>{r.email}</p>
                  <p>{r.telephone}</p>
                </div>

                {/* Message */}
                {r.message && (
                  <p className="text-xs italic text-[#6d111c] opacity-40 border-t border-[#6d111c]/8 pt-3">
                    "{r.message}"
                  </p>
                )}
              </div>
            ))}

            {reservations.length === 0 && (
              <p className="col-span-3 text-center text-[#6d111c] opacity-30 py-16">
                Aucune réservation pour le moment.
              </p>
            )}
          </div>
        )}

      </div>
    </main>
  )
}