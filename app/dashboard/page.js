"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, List, CalendarDays, LogOut, Users, Calendar, Clock, Trash2, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { California_Paradise } from "../font"

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })

const isSameDay = (a, b) => {
  const da = new Date(a), db = new Date(b)
  return da.getDate() === db.getDate() && da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear()
}
const toLocalDateString = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}
// ── Créneaux selon le jour ──
const getCreneaux = (dateStr) => {
  if (!dateStr) return []
  const j = new Date(dateStr).getDay()
  if ([0, 1, 2].includes(j)) return []
  if ([3, 4].includes(j)) return ["12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45"]
  if ([5, 6].includes(j)) return [
    "12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45",
    "19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45",
  ]
  return []
}

// ── Modale ajout réservation ──
function ModalAjout({ onClose, onAdded, defaultDate = ""  }) {
  const [form, setForm] = useState({ nom: "", personnes: "2", email: "", telephone: "", date: defaultDate, heure: "", message: "" })
  const [status, setStatus] = useState(null)
  const creneaux = getCreneaux(form.date)
  const midiCreneaux = creneaux.filter(h => h.startsWith("12") || h.startsWith("13"))
  const soirCreneaux = creneaux.filter(h => h.startsWith("19") || h.startsWith("20"))

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          personnes: parseInt(form.personnes),
          date: new Date(form.date).toISOString(),
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      onAdded(data.reservation)
      onClose()
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

        {/* Header modale */}
        <div className="flex items-center justify-between p-6 border-b border-[#6d111c]/8">
          <div>
            <h2 className="font-bold text-[#6d111c] text-lg">Nouvelle réservation</h2>
            <p className="text-xs text-[#6d111c]/40 mt-0.5">Ajout manuel par l'équipe</p>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-full hover:bg-[#6d111c]/8 text-[#6d111c]/40 hover:text-[#6d111c] transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-5">

          {/* Nom */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[#6d111c]/40">
              Nom du client <span className="text-red-400">*</span>
            </label>
            <input name="nom" value={form.nom} onChange={handleChange} required
              placeholder="Marie Dupont"
              className="border-b border-[#6d111c]/20 focus:border-[#6d111c] focus:outline-none py-2 text-sm text-[#6d111c] placeholder:text-[#6d111c]/20 transition-colors" />
          </div>

          {/* Personnes */}
          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] font-bold tracking-widest uppercase text-[#6d111c]/40">
              Nombre de personnes <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[1,2,3,4,5,6,7,8].map(n => (
                <button key={n} type="button"
                  onClick={() => setForm(p => ({ ...p, personnes: String(n) }))}
                  className={`w-9 h-9 rounded-full text-sm font-bold border transition-all
                    ${form.personnes === String(n)
                      ? "bg-[#6d111c] text-white border-[#6d111c]"
                      : "border-[#6d111c]/20 text-[#6d111c]/60 hover:border-[#6d111c]/50"}`}>
                  {n}
                </button>
              ))}
              <button type="button"
                onClick={() => setForm(p => ({ ...p, personnes: "9" }))}
                className={`px-3 h-9 rounded-full text-xs font-bold border transition-all
                  ${parseInt(form.personnes) >= 9
                    ? "bg-[#6d111c] text-white border-[#6d111c]"
                    : "border-[#6d111c]/20 text-[#6d111c]/60 hover:border-[#6d111c]/50"}`}>
                9+
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.65rem] font-bold tracking-widests uppercase text-[#6d111c]/40">
              Date <span className="text-red-400">*</span>
            </label>
            <input name="date" type="date" value={form.date}
              onChange={(e) => { handleChange(e); setForm(p => ({ ...p, heure: "" })) }}
              required min={toLocalDateString(new Date())}
              className="border-b border-[#6d111c]/20 focus:border-[#6d111c] focus:outline-none py-2 text-sm text-[#6d111c] transition-colors" />
          </div>

          {/* Créneaux */}
          {form.date && (
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-bold tracking-widests uppercase text-[#6d111c]/40">
                Créneau <span className="text-red-400">*</span>
              </label>
              {creneaux.length === 0 ? (
                <p className="text-xs text-orange-500 bg-orange-50 rounded-xl px-3 py-2">
                  😴 Fermé ce jour (dim, lun, mar)
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {midiCreneaux.length > 0 && (
                    <div>
                      <p className="text-[0.6rem] tracking-widest uppercase text-[#6d111c]/30 mb-2">Midi</p>
                      <div className="flex flex-wrap gap-1.5">
                        {midiCreneaux.map(h => (
                          <button key={h} type="button" onClick={() => setForm(p => ({ ...p, heure: h }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                              ${form.heure === h
                                ? "bg-[#6d111c] text-white border-[#6d111c]"
                                : "border-[#6d111c]/20 text-[#6d111c]/60 hover:border-[#6d111c]/50"}`}>
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {soirCreneaux.length > 0 && (
                    <div>
                      <p className="text-[0.6rem] tracking-widest uppercase text-[#6d111c]/30 mb-2">Soir</p>
                      <div className="flex flex-wrap gap-1.5">
                        {soirCreneaux.map(h => (
                          <button key={h} type="button" onClick={() => setForm(p => ({ ...p, heure: h }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                              ${form.heure === h
                                ? "bg-[#6d111c] text-white border-[#6d111c]"
                                : "border-[#6d111c]/20 text-[#6d111c]/60 hover:border-[#6d111c]/50"}`}>
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Email + Tel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-bold tracking-widests uppercase text-[#6d111c]/40">
                Email <span className="text-red-400">*</span>
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="marie@email.fr"
                className="border-b border-[#6d111c]/20 focus:border-[#6d111c] focus:outline-none py-2 text-sm text-[#6d111c] placeholder:text-[#6d111c]/20 transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-bold tracking-widests uppercase text-[#6d111c]/40">Téléphone</label>
              <input name="telephone" type="tel" value={form.telephone} onChange={handleChange}
                placeholder="06 00 00 00 00"
                className="border-b border-[#6d111c]/20 focus:border-[#6d111c] focus:outline-none py-2 text-sm text-[#6d111c] placeholder:text-[#6d111c]/20 transition-colors" />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.65rem] font-bold tracking-widests uppercase text-[#6d111c]/40">
              Note interne (optionnel)
            </label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={2}
              placeholder="Allergie, occasion spéciale, table préférée..."
              className="border-b border-[#6d111c]/20 focus:border-[#6d111c] focus:outline-none py-2 text-sm text-[#6d111c] placeholder:text-[#6d111c]/20 transition-colors resize-none" />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-xs text-center bg-red-50 rounded-xl px-3 py-2">
              ❌ Une erreur s'est produite, réessayez.
            </p>
          )}

          {/* Boutons */}
          <div className="flex gap-3 pt-2 border-t border-[#6d111c]/8">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-[#6d111c]/20 rounded-full text-[#6d111c] text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c]/5 transition-all">
              Annuler
            </button>
            <button type="submit"
              disabled={status === "loading" || !form.heure}
              className="flex-1 py-2.5 bg-[#6d111c] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-40">
              {status === "loading" ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Dashboard ──
export default function Dashboard() {
  const router = useRouter()
  const [reservations, setReservations] = useState([])
  const [view, setView] = useState("liste")
  const [deletingId, setDeletingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
const [showAjout, setShowAjout] = useState(null) // null = fermé, string = date pré-remplie ou ""
  const today = new Date()
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    fetch("/api/reservations").then(r => r.json()).then(setReservations)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await fetch(`/api/reservations/${id}`, { method: "DELETE" })
      setReservations(prev => prev.filter(r => r.id !== id))
    } catch (e) { console.error(e) }
    finally { setDeletingId(null); setConfirmId(null) }
  }

  const handleAdded = (newResa) => {
    setReservations(prev => [...prev, newResa].sort((a, b) => new Date(a.date) - new Date(b.date)))
  }

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

  const getReservationsForDay = (day) => reservations.filter(r => isSameDay(r.date, day))
  const selectedDayReservations = selectedDay ? getReservationsForDay(selectedDay) : []

  return (
    <main className="min-h-screen bg-[#f7f6f2] p-4 md:p-10">

      {/* Modales */}
      {showAjout !== null && <ModalAjout onClose={() => setShowAjout(null)} onAdded={handleAdded} defaultDate={showAjout} />}

      {confirmId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl flex flex-col gap-4">
            <h2 className="font-bold text-[#6d111c] text-lg">Supprimer la réservation ?</h2>
            <p className="text-sm text-[#6d111c]/60">Cette action est irréversible.</p>
            <div className="flex gap-3 mt-2">
              <button onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 border border-[#6d111c]/20 rounded-full text-[#6d111c] text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c]/5 transition-all">
                Annuler
              </button>
              <button onClick={() => handleDelete(confirmId)} disabled={deletingId === confirmId}
                className="flex-1 py-2.5 bg-[#6d111c] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 disabled:opacity-40 transition-all">
                {deletingId === confirmId ? "Suppression..." : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className={`${California_Paradise.className} text-[#6d111c] text-5xl`}>Pépouze</h1>
            <p className="text-[#6d111c] opacity-40 text-xs tracking-widest uppercase mt-1">
              Dashboard · {reservations.length} réservation(s)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Bouton ajouter */}
            <button onClick={() => setShowAjout("")}
              className="flex items-center gap-2 px-4 py-2 bg-[#6d111c] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-all">
              <Plus size={14} /> Ajouter
            </button>

            {/* Toggle vues */}
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-[#6d111c]/10">
              {[{ id: "liste", Icon: List }, { id: "grille", Icon: LayoutGrid }, { id: "planning", Icon: CalendarDays }].map(({ id, Icon }) => (
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
                  <tr key={r.id} className={`border-t border-[#6d111c]/10 ${i % 2 === 0 ? "bg-white" : "bg-[#f7f6f2]"}`}>
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
              <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5 flex flex-col gap-4 hover:shadow-md transition-shadow">
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
                {r.message && <p className="text-xs italic text-[#6d111c] opacity-40 border-t border-[#6d111c]/8 pt-3">"{r.message}"</p>}
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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5 lg:w-96 h-fit">
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
              <div className="grid grid-cols-7 mb-2">
                {JOURS.map(j => <div key={j} className="text-center text-[0.6rem] uppercase tracking-widest text-[#6d111c]/30 py-1">{j}</div>)}
              </div>
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
                        ${isToday && !isSelected ? "border border-[#6d111c]/30" : ""}`}>
                      {day.getDate()}
                      {resa.length > 0 && (
                        <span className="absolute bottom-1 flex gap-0.5">
                          {resa.slice(0, 3).map((_, idx) => (
                            <span key={idx} className={`w-1 h-1 rounded-full ${isSelected ? "bg-white/60" : "bg-[#6d111c]"}`} />
                          ))}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#6d111c]/8">
                <span className="w-2 h-2 rounded-full bg-[#6d111c]" />
                <span className="text-[0.65rem] text-[#6d111c]/40">= réservation(s) ce jour</span>
              </div>
            </div>

            <div className="flex-1">
              {!selectedDay ? (
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#6d111c]/5 flex items-center justify-center h-full">
                  <p className="text-[#6d111c]/30 text-sm">Sélectionne un jour pour voir les réservations</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#6d111c]/5">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#6d111c]/8">
                    <div>
                      <h2 className="font-bold text-[#6d111c] text-lg capitalize">
                        {selectedDay.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                      </h2>
                      <p className="text-xs text-[#6d111c]/40 mt-0.5">{selectedDayReservations.length} réservation(s)</p>
                    </div>
                    {/* Ajouter directement depuis le planning */}
                    <button onClick={() => setShowAjout(toLocalDateString(selectedDay))}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6d111c]/8 text-[#6d111c] rounded-full text-xs font-bold hover:bg-[#6d111c] hover:text-white transition-all">
                      <Plus size={13} /> Ajouter
                    </button>
                  </div>
                  {selectedDayReservations.length === 0 ? (
                    <p className="text-center text-[#6d111c]/25 py-10 text-sm">Aucune réservation ce jour.</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedDayReservations.sort((a, b) => a.heure.localeCompare(b.heure)).map((r) => (
                        <div key={r.id}
                          className="flex items-center gap-4 p-4 rounded-xl border border-[#6d111c]/8 hover:border-[#6d111c]/20 transition-colors group">
                          <div className="text-center min-w-12">
                            <p className="text-lg font-bold text-[#6d111c]">{r.heure}</p>
                          </div>
                          <div className="w-px h-10 bg-[#6d111c]/10" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#6d111c] text-sm">{r.nom}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#6d111c]/50">
                              <span className="flex items-center gap-1"><Users size={11} />{r.personnes} pers.</span>
                              <span>{r.email}</span>
                              <span>{r.telephone}</span>
                            </div>
                            {r.message && <p className="text-xs italic text-[#6d111c]/35 mt-1 truncate">"{r.message}"</p>}
                          </div>
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