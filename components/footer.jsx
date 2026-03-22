"use client"
import { FaInstagram,FaFacebookSquare  } from "react-icons/fa";
import { California_Paradise, HelveticaNeue, StardomRegular } from "../app/font";
import { Phone, Star } from "lucide-react";
export default function Footer() {
    return(
        <footer className={`${HelveticaNeue.className} pt-16 pb-8 w-full bg-(--bg-secondery-color) flex flex-col items-center text-white relative overflow-hidden`}>

  {/* Texture de fond subtile */}
  <div className="absolute inset-0 opacity-5 pointer-events-none"
    style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

  {/* ── BLOC LOGO + NAV ── */}
  <div className="flex flex-col items-center w-full mb-12 px-6 z-10">
    <h1 className={`${California_Paradise.className} text-white text-5xl lg:text-8xl text-center leading-none tracking-tight`}>
      Pépouze
    </h1>
    <p className="text-white/30 text-[0.65rem] tracking-[0.35em] uppercase mt-3 mb-8">
      Galettes · Crêpes · Chill
    </p>

    <nav>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-12">
        {[
          { label: "Maison", href: "#" },
          { label: "Notre histoire", href: "#notre-histoire" },
          { label: "Menu", href: "#menu" },
          { label: "Réservation", href: "#reservation" },
          { label: "Lieu", href: "#localisation" },
        ].map(({ label, href }) => (
          <li key={label}>
            <a href={href}
              className="text-white/50 hover:text-white text-xs lg:text-sm tracking-widest uppercase transition-colors duration-200">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  {/* ── SÉPARATEUR DÉCORATIF ── */}
  <div className="w-[90%] flex items-center gap-4 mb-12 opacity-20">
    <div className="flex-1 h-px bg-white" />
    <div className="w-1.5 h-1.5 rounded-full bg-white" />
    <div className="flex-1 h-px bg-white" />
  </div>

  {/* ── INFOS : ADRESSE / CONTACT / HORAIRES ── */}
  <div className="flex flex-col lg:flex-row justify-center items-start lg:items-start w-[90%] max-w-5xl gap-10 lg:gap-0 mb-12 z-10">

    {/* Adresse */}
    <div className="flex flex-col w-full lg:w-1/3 gap-4 lg:px-8">
      <h2 className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-white/30">Adresse</h2>
      <p className="text-white text-sm leading-relaxed">
        12 rue du Point du Jour<br />
        Laillé, 35890
      </p>
      <div className="flex gap-2 mt-1">
        <a href="#" aria-label="Instagram"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
          <FaInstagram size={14} />
        </a>
        <a href="#" aria-label="Facebook"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
          <FaFacebookSquare size={14} />
        </a>
      </div>
    </div>

    {/* Séparateur vertical desktop */}
    <div className="hidden lg:block w-px self-stretch bg-white/10" />

    {/* Contact */}
    <div className="flex flex-col w-full lg:w-1/3 gap-4 lg:px-8">
      <h2 className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-white/30">Contact</h2>
      <a href="tel:0616273422"
        className="flex items-center gap-2 text-white text-sm hover:text-white/70 transition-colors group">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <Phone size={13} />
        </span>
        06.16.27.34.22
      </a>
    </div>

    {/* Séparateur vertical desktop */}
    <div className="hidden lg:block w-px self-stretch bg-white/10" />

    {/* Horaires */}
    <div className="flex flex-col w-full lg:w-1/3 gap-4 lg:px-8">
      <h2 className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-white/30">Horaires</h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-white/50">Dim · Lun · Mar</span>
          <span className="text-white/30 text-xs italic">Fermé</span>
        </div>
        <div className="h-px bg-white/8" />
        <div className="flex justify-between items-center">
          <span className="text-white/50">Mer · Jeu</span>
          <span className="text-white text-xs">12h – 14h</span>
        </div>
        <div className="h-px bg-white/8" />
        <div className="flex justify-between items-center">
          <span className="text-white/50">Ven · Sam</span>
          <span className="text-white text-xs">12h–14h / 19h–21h</span>
        </div>
      </div>
    </div>
  </div>

  {/* ── SÉPARATEUR BAS ── */}
  <div className="w-[90%] h-px bg-white/10 mb-6" />

  {/* ── COPYRIGHT ── */}
  <div className="flex flex-col md:flex-row justify-between items-center w-[90%] gap-2">
    <p className="text-white/25 text-[0.65rem] tracking-wide">
      © 2026 Pépouze la crêperie du 12. Tous droits réservés
    </p>
    <a href="#" className="text-white/25 hover:text-white/50 text-[0.65rem] tracking-wide transition-colors">
      Conditions générales & Politique de confidentialité
    </a>
  </div>

</footer>
    )
}
