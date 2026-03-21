import { prisma } from "@/lib/prisma.config"  // ← import depuis lib/prisma

export default async function Dashboard() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: 'asc' },
  })

  return (
    <main className="min-h-screen bg-[#f7f6f2] p-10 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#6d111c]">Dashboard Réservations</h1>
          <p className="text-[#6d111c] opacity-50 mt-1">{reservations.length} réservation(s) au total</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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
                  className={`border-t border-[#6d111c]/10 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f7f6f2]'}`}>
                  <td className="px-6 py-4 font-medium">{r.nom}</td>
                  <td className="px-6 py-4">{r.personnes} pers.</td>
                  <td className="px-6 py-4">
                    {new Date(r.date).toLocaleDateString('fr-FR', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">{r.heure}</td>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4">{r.telephone}</td>
                  <td className="px-6 py-4 opacity-60 italic">{r.message || '—'}</td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center opacity-40">
                    Aucune réservation pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}