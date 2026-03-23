"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, List, CalendarDays, LogOut, Users, Calendar, Clock, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { California_Paradise } from "../font"

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })

const isSameDay = (a, b) => {
  const da = new Date(a), db = new Date(b)
  return da.getDate() === db.getDate() && da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear()
}

export default function Dashboard() {
  const router = useRouter()
  const [reservations, setReservations] = useState([])
  const [view, setView] = useState("liste")
  const [deletingId, setDeletingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  // Planning state
  const today = new Date()
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    fetch("/api/reservations")
      .then((r) => r.json())
      .then(setReservations)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await fetch(`/api/reservations/${id}`, { method: "DELETE" })
      setReservations((prev) => prev.filter((r) => r.id !== id))
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  // ── Calendrier ──
  const getDaysInMonth = () => {
    const year = calMonth.getFullYear()
    const month = calMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const startOffset = firstDay === 0 ? 6 : firstDay - 1
    const days = []
    for (let i = 0; i < startOffset; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
    return days
  }

  const getReservationsForDay = (day) =>
    reservations.filter((r) => isSameDay(r.date, day))

  const selectedDayReservations = selectedDay ? getReservationsForDay(selectedDay) : []

  return (
    <main className="min-h-screen bg-[#f7f6f2] p-4 md:p-10">

      {/* ── Confirm delete modal ── */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-4">
            <h2 className="text-lg font-bold text-[#6d111c]">Supprimer la réservation ?</h2>
            <p className="text-sm text-[#6d111c]/60">Cette action est irréversible.</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 border border-[#6d111c]/20 rounded-full text-[#6d111c] text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c]/5 transition-all">
                Annuler
              </button>
              <button onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                className="flex-1 py-2.5 bg-[#6d111c] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-40">
                {deletingId === confirmId ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className={`${California_Paradise.className} text-[#6d111c] text-5xl`}>Pépouze</h1>
            <p className="text-[#6d111c] opacity-40 text-xs tracking-widest uppercase mt-1">
              Dashboard · {reservations.length} réservation(s)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle vues */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#6d111c]/10">
              {[
                { id: "liste",    Icon: List },
                { id: "grille",   Icon: LayoutGrid },
                { id: "planning", Icon: CalendarDays },
              ].map(({ id, Icon }) => (
                <button key={id} onClick={() => setView(id)} title={id}
                  className={`p-2 rounded-full transition-all ${view === id ? "bg-[#6d111c] text-white" : "text-[#6d111c] opacity-40 hover:opacity-70"}`}>
                  <Icon size={18} />
                </button>
              ))}
            </div>

            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-[#6d111c]/20 rounded-full text-[#6d111c] text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c] hover:text-white transition-all">
              <LogOut size={14} /> Déconnexion
            </button>
          </div>
        </div>

        {/* ══ VUE LISTE ══ */}
        {view === "liste" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-[#6d111c]">
              <thead className="bg-[#6d111c] text-white text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 text-left">Nom</th>
                  <th className="px-6 py-4 text-left">Pers.</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Heure</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Téléphone</th>
                  <th className="px-6 py-4 text-left">Message</th>
                  <th className="px-6 py-4 text-left"></th>
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
                    <td className="px-6 py-4">
                      <button onClick={() => setConfirmId(r.id)}
                        className="p-2 rounded-full text-[#6d111c]/30 hover:text-[#6d111c] hover:bg-[#6d111c]/8 transition-all">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-16 text-center opacity-30">Aucune réservation.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ══ VUE GRILLE ══ */}
        {view === "grille" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reservations.map((r) => (
              <div key={r.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#6d111c] text-lg">{r.nom}</h3>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 bg-[#6d111c]/8 text-[#6d111c] text-xs font-bold px-3 py-1 rounded-full">
                      <Users size={12} /> {r.personnes} pers.
                    </span>
                    <button onClick={() => setConfirmId(r.id)}
                      className="p-1.5 rounded-full text-[#6d111c]/25 hover:text-[#6d111c] hover:bg-[#6d111c]/8 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#6d111c] opacity-60">
                  <span className="flex items-center gap-1"><Calendar size={14} />{formatDate(r.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{r.heure}</span>
                </div>
                <div className="h-px bg-[#6d111c]/8" />
                <div className="flex flex-col gap-1 text-xs text-[#6d111c] opacity-60">
                  <p>{r.email}</p>
                  <p>{r.telephone}</p>
                </div>
                {r.message && (
                  <p className="text-xs italic text-[#6d111c] opacity-40 border-t border-[#6d111c]/8 pt-3">"{r.message}"</p>
                )}
              </div>
            ))}
            {reservations.length === 0 && (
              <p className="col-span-3 text-center text-[#6d111c] opacity-30 py-16">Aucune réservation.</p>
            )}
          </div>
        )}

        {/* ══ VUE PLANNING ══ */}
        {view === "planning" && (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Calendrier gauche */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5 lg:w-96 h-fit">

              {/* Navigation mois */}
              <div className="flex items-center justify-between mb-5">
                <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))}
                  className="p-1.5 rounded-full hover:bg-[#6d111c]/8 text-[#6d111c] transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-bold text-[#6d111c] tracking-wide">
                  {MOIS[calMonth.getMonth()]} {calMonth.getFullYear()}
                </span>
                <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))}
                  className="p-1.5 rounded-full hover:bg-[#6d111c]/8 text-[#6d111c] transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Jours semaine */}
              <div className="grid grid-cols-7 mb-2">
                {JOURS.map(j => (
                  <div key={j} className="text-center text-[0.6rem] uppercase tracking-widest text-[#6d111c]/30 py-1">{j}</div>
                ))}
              </div>

              {/* Cases */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((day, i) => {
                  if (!day) return <div key={`e-${i}`} />
                  const resa = getReservationsForDay(day)
                  const isToday = isSameDay(day, today)
                  const isSelected = selectedDay && isSameDay(day, selectedDay)
                  return (
                    <button key={i} onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-xl text-xs font-medium transition-all flex flex-col items-center justify-center relative
                        ${isSelected ? "bg-[#6d111c] text-white" : "hover:bg-[#6d111c]/8 text-[#6d111c]"}
                        ${isToday && !isSelected ? "border border-[#6d111c]/30" : ""}
                      `}>
                      {day.getDate()}
                      {resa.length > 0 && (
                        <span className={`absolute bottom-1 flex gap-0.5`}>
                          {resa.slice(0, 3).map((_, idx) => (
                            <span key={idx}
                              className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/60" : "bg-[#6d111c]"}`} />
                          ))}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Légende */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#6d111c]/8">
                <span className="w-2 h-2 rounded-full bg-[#6d111c]" />
                <span className="text-[0.65rem] text-[#6d111c]/40">= réservation(s) ce jour</span>
              </div>
            </div>

            {/* Détail jour droite */}
            <div className="flex-1">
              {!selectedDay ? (
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#6d111c]/5 flex items-center justify-center h-full">
                  <p className="text-[#6d111c]/30 text-sm">Sélectionne un jour pour voir les réservations</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5">

                  {/* Titre du jour */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#6d111c]/8">
                    <div>
                      <h2 className="font-bold text-[#6d111c] text-lg capitalize">
                        {selectedDay.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                      </h2>
                      <p className="text-xs text-[#6d111c]/40 mt-0.5">
                        {selectedDayReservations.length} réservation(s)
                      </p>
                    </div>
                  </div>

                  {selectedDayReservations.length === 0 ? (
                    <p className="text-center text-[#6d111c]/25 py-10 text-sm">Aucune réservation ce jour.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedDayReservations
                        .sort((a, b) => a.heure.localeCompare(b.heure))
                        .map((r) => (
                          <div key={r.id}
                            className="flex items-center gap-4 p-4 rounded-xl border border-[#6d111c]/8 hover:border-[#6d111c]/20 transition-colors group">

                            {/* Heure */}
                            <div className="text-center min-w-12">
                              <p className="text-lg font-bold text-[#6d111c]">{r.heure}</p>
                            </div>

                            <div className="w-px h-10 bg-[#6d111c]/10" />

                            {/* Infos */}
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#6d111c] text-sm">{r.nom}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-[#6d111c]/50">
                                <span className="flex items-center gap-1"><Users size={11} />{r.personnes} pers.</span>
                                <span>{r.email}</span>
                                <span>{r.telephone}</span>
                              </div>
                              {r.message && (
                                <p className="text-xs italic text-[#6d111c]/35 mt-1 truncate">"{r.message}"</p>
                              )}
                            </div>

                            {/* Supprimer */}
                            <button onClick={() => setConfirmId(r.id)}
                              className="opacity-0 group-hover:opacity-100 p-2 rounded-full text-[#6d111c]/30 hover:text-[#6d111c] hover:bg-[#6d111c]/8 transition-all">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}