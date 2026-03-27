"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, Calendar, Clock, User } from "lucide-react"

// ── Horaires selon le jour ──
const getCreneaux = (date) => {
  if (!date) return []
  const jour = new Date(date).getDay() // 0=dim, 1=lun, 2=mar, 3=mer, 4=jeu, 5=ven, 6=sam
  if ([0, 1, 2].includes(jour)) return [] // Fermé
  if ([3, 4].includes(jour)) return ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45"]
  if ([5, 6].includes(jour)) return [
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
    "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45",
  ]
  return []
}

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]

const isOuvert = (date) => {
  const j = date.getDay()
  return ![0, 1, 2].includes(j)
}

const isSameDay = (a, b) =>
  a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()

const isPast = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export default function ReservationSection() {
  const today = new Date()
  const [form, setForm] = useState({ nom: "", personnes: "2", email: "", telephone: "", message: "" })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedHeure, setSelectedHeure] = useState(null)
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState(1) // 1: date+heure, 2: infos

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // Générer les jours du calendrier
  const getDaysInMonth = () => {
    const year = calMonth.getFullYear()
    const month = calMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    // Décale pour commencer lundi
    const startOffset = firstDay === 0 ? 6 : firstDay - 1
    const days = []
    for (let i = 0; i < startOffset; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
    return days
  }

  const creneaux = getCreneaux(selectedDate)
  const midiCreneaux = creneaux.filter(h => h.startsWith("12") || h.startsWith("13"))
  const soirCreneaux = creneaux.filter(h => h.startsWith("19") || h.startsWith("20"))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedHeure) return
    setStatus("loading")
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: selectedDate.toISOString(),
          heure: selectedHeure,
          personnes: parseInt(form.personnes),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section
      className="relative pt-16 pb-16 text-white flex flex-col justify-center items-center bg-[url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center min-h-screen"
      id="reservation"
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-2xl px-4 flex flex-col items-center gap-6">

        {/* ── Titre ── */}
        <div className="text-center">
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-white/40 mb-2">Table pour vous</p>
          <h1 className="text-3xl lg:text-4xl font-bold">Réservation</h1>
        </div>

        {/* ── Steps indicator ── */}
        <div className="flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-white text-black" : "bg-white/10 text-white/40"}`}>
                {s}
              </div>
              {s < 2 && <div className={`w-12 h-px transition-all ${step > s ? "bg-white" : "bg-white/20"}`} />}
            </div>
          ))}
        </div>

        {status === "success" ? (
          /* ── Succès ── */
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-green-400/20 flex items-center justify-center text-2xl">✅</div>
            <h2 className="text-xl font-bold">Réservation confirmée !</h2>
            <p className="text-white/60 text-sm">
              {selectedDate?.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à {selectedHeure} · {form.personnes} pers.
            </p>
            <p className="text-white/40 text-xs">Un email de confirmation a été envoyé à {form.email}</p>
            <button onClick={() => { setStatus(null); setStep(1); setSelectedDate(null); setSelectedHeure(null) }}
              className="mt-2 text-xs text-white/40 hover:text-white underline transition-colors">
              Faire une autre réservation
            </button>
          </div>
        ) : (
          <div className="w-full bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl overflow-hidden">

            {/* ═══ STEP 1 : Date + Heure ═══ */}
            {step === 1 && (
              <div className="p-6 lg:p-8 flex flex-col gap-6">

                {/* Calendrier */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                      <Calendar size={16} className="opacity-60" />
                      Choisissez une date
                    </h2>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs font-bold tracking-wide min-w-32 text-center">
                        {MOIS[calMonth.getMonth()]} {calMonth.getFullYear()}
                      </span>
                      <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Jours de la semaine */}
                  <div className="grid grid-cols-7 mb-2">
                    {JOURS.map(j => (
                      <div key={j} className="text-center text-[0.6rem] uppercase tracking-widest text-white/30 py-1">{j}</div>
                    ))}
                  </div>

                  {/* Cases jours */}
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth().map((day, i) => {
                      if (!day) return <div key={`empty-${i}`} />
                      const ouvert = isOuvert(day)
                      const passe = isPast(day)
                      const selected = selectedDate && isSameDay(day, selectedDate)
                      const isToday = isSameDay(day, today)
                      return (
                        <button
                          key={i}
                          disabled={!ouvert || passe}
                          onClick={() => { setSelectedDate(day); setSelectedHeure(null) }}
                          className={`
                            aspect-square rounded-xl text-xs font-medium transition-all flex items-center justify-center relative
                            ${selected ? "bg-white text-black font-bold scale-105" : ""}
                            ${!selected && ouvert && !passe ? "hover:bg-white/20 text-white cursor-pointer" : ""}
                            ${!ouvert || passe ? "text-white/15 cursor-not-allowed" : ""}
                            ${isToday && !selected ? "border border-white/30" : ""}
                          `}
                        >
                          {day.getDate()}
                          {ouvert && !passe && !selected && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/40" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <p className="text-[0.6rem] text-white/25 mt-3 text-center">
                    ● Disponible · Grisé = fermé ou passé
                  </p>
                </div>

                {/* Créneaux horaires */}
                {selectedDate && (
                  <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                      <Clock size={16} className="opacity-60" />
                      Choisissez un créneau
                      <span className="text-white/40 font-normal text-xs">
                        — {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                      </span>
                    </h2>

                    {creneaux.length === 0 ? (
                      <p className="text-white/40 text-sm text-center py-4">😴 Fermé ce jour-là</p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {midiCreneaux.length > 0 && (
                          <div>
                            <p className="text-[0.6rem] tracking-widest uppercase text-white/30 mb-2">Service du midi</p>
                            <div className="flex flex-wrap gap-2">
                              {midiCreneaux.map(h => (
                                <button key={h} onClick={() => setSelectedHeure(h)}
                                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedHeure === h ? "bg-white text-black border-white" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}>
                                  {h}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {soirCreneaux.length > 0 && (
                          <div>
                            <p className="text-[0.6rem] tracking-widest uppercase text-white/30 mb-2">Service du soir</p>
                            <div className="flex flex-wrap gap-2">
                              {soirCreneaux.map(h => (
                                <button key={h} onClick={() => setSelectedHeure(h)}
                                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${selectedHeure === h ? "bg-white text-black border-white" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}>
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

                {/* Nombre de personnes */}
                {selectedHeure && (
                  <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
                    <h2 className="text-sm font-bold flex items-center gap-2">
                      <Users size={16} className="opacity-60" />
                      Nombre de personnes
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <button key={n} onClick={() => setForm(p => ({ ...p, personnes: String(n) }))}
                          className={`w-10 h-10 rounded-full text-sm font-bold border transition-all ${form.personnes === String(n) ? "bg-white text-black border-white" : "border-white/20 text-white/70 hover:border-white/50"}`}>
                          {n}
                        </button>
                      ))}
                      <button onClick={() => setForm(p => ({ ...p, personnes: "9" }))}
                        className={`px-4 h-10 rounded-full text-xs font-bold border transition-all ${parseInt(form.personnes) >= 9 ? "bg-white text-black border-white" : "border-white/20 text-white/70 hover:border-white/50"}`}>
                        9+
                      </button>
                    </div>
                  </div>
                )}

                {/* Bouton suivant */}
                {selectedDate && selectedHeure && (
                  <button onClick={() => setStep(2)}
                    className="mt-2 w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all">
                    Continuer →
                  </button>
                )}
              </div>
            )}

            {/* ═══ STEP 2 : Infos personnelles ═══ */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="p-6 lg:p-8 flex flex-col gap-5">

                {/* Récap */}
                <div className="flex items-center justify-between bg-white/8 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <Calendar size={14} />
                    {selectedDate?.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                    <Clock size={14} />
                    {selectedHeure}
                    <Users size={14} />
                    {form.personnes} pers.
                  </div>
                  <button type="button" onClick={() => setStep(1)}
                    className="text-[0.6rem] text-white/40 hover:text-white underline transition-colors">
                    Modifier
                  </button>
                </div>

                <h2 className="text-sm font-bold flex items-center gap-2">
                  <User size={16} className="opacity-60" />
                  Vos coordonnées
                </h2>

                {/* Champs */}
                {[
                  { name: "nom", label: "Votre nom", type: "text", required: true },
                  { name: "email", label: "Votre email", type: "email", required: true },
                  { name: "telephone", label: "Téléphone", type: "tel", required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name} className="flex flex-col gap-1">
                    <label className="text-[0.65rem] tracking-widest uppercase text-white/40">{label}</label>
                    <input
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      required={required}
                      className="bg-transparent border-b border-white/20 focus:border-white/60 focus:outline-none py-2 text-sm text-white placeholder:text-white/20 transition-colors"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] tracking-widest uppercase text-white/40">Message (optionnel)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Allergie, occasion spéciale..."
                    className="bg-transparent border-b border-white/20 focus:border-white/60 focus:outline-none py-2 text-sm text-white placeholder:text-white/20 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs text-center">❌ Une erreur s'est produite, réessayez.</p>
                )}

                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-white/20 text-white/60 text-xs font-bold uppercase tracking-widest rounded-full hover:border-white/40 hover:text-white transition-all">
                    ← Retour
                  </button>
                  <button type="submit" disabled={status === "loading"}
                    className=" flex-1 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all disabled:opacity-40">
                    {status === "loading" ? "Envoi..." : "Confirmer"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}