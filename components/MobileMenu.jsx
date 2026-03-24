"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import AnimatedLink from "@/components/AnimatedLink"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: "Maison", href: "#" },
    { label: "Notre histoire", href: "#histoire" },
    { label: "Menu", href: "#menu" },
    { label: "Réservation", href: "#reservation" },
    { label: "Lieu", href: "#lieu" },
  ]

  return (
    <>
      {/* Bouton burger */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white p-2 z-50 scale-75 "
        aria-label="Ouvrir le menu"
      >
        <Menu size={28} />
      </button>

      {/* Overlay sombre */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panneau latéral */}
      <div className={`
        fixed top-0 right-0 h-full w-72 bg-[#6d111c] z-50
        flex flex-col justify-center items-center gap-8
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>

        {/* Bouton fermer */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white"
          aria-label="Fermer le menu"
        >
          <X size={28} />
        </button>

        {/* Logo */}
        <p className="text-white text-4xl" style={{ fontFamily: "California Paradise" }}>
          Pépouze
        </p>

        {/* Liens */}
        <nav className="flex flex-col items-center gap-6">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-light tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Infos bas */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-white/40 text-xs">
          <p>06.16.27.34.22</p>
          <p>12 rue du Point du Jour, Laillé</p>
        </div>
      </div>
    </>
  )
}