"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { California_Paradise, HelveticaNeue } from "../font"

export default function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      setError("Identifiants incorrects.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className={`${California_Paradise.className} text-[#6d111c] text-6xl`}>
            Pépouze
          </h1>
          <p className={`${HelveticaNeue.className} text-[#6d111c] opacity-40 text-xs tracking-widest uppercase mt-2`}>
            Espace administrateur
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-10 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold tracking-widest uppercase text-[#6d111c] opacity-50">
              Utilisateur
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border-b border-[#6d111c]/20 focus:outline-none focus:border-[#6d111c] py-2 text-[#6d111c] bg-transparent transition-colors"
              placeholder="user"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold tracking-widest uppercase text-[#6d111c] opacity-50">
              Mot de passe
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border-b border-[#6d111c]/20 focus:outline-none focus:border-[#6d111c] py-2 text-[#6d111c] bg-transparent transition-colors"
              placeholder="••••••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 p-[10px_22px] bg-[#6d111c] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  )
}