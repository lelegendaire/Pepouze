import { California_Paradise, HelveticaNeue } from "../font"
import Link from "next/link"

export const metadata = {
  title: "CGU & Mentions légales — Pépouze",
  description: "Conditions générales d'utilisation et mentions légales de la crêperie Pépouze.",
}

const Section = ({ number, title, children }) => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-b border-[#6d111c]/8 last:border-none">
    <div className="md:w-48 shrink-0">
      <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase text-[#6d111c]/30">
        Article {number}
      </span>
      <h2 className="text-lg font-bold text-[#6d111c] mt-1 leading-snug">{title}</h2>
    </div>
    <div className="flex-1 text-sm text-[#6d111c]/70 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
)

export default function CGU() {
  return (
    <main className={`${HelveticaNeue.className} min-h-screen bg-[#f7f6f2]`}>

      {/* ── Header ── */}
      <div className="bg-[#6d111c] text-white px-6 py-16 flex flex-col items-center text-center">
        <Link href="/"
          className={`${California_Paradise.className} text-white text-5xl md:text-7xl mb-4 hover:opacity-80 transition-opacity`}>
          Pépouze
        </Link>
        <p className="text-[0.6rem] tracking-[0.35em] uppercase text-white/30 mb-8">
          Galettes · Crêpes · Chill
        </p>
        <h1 className="text-xl md:text-2xl font-bold">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-white/40 text-xs mt-2">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* ── Contenu ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Intro */}
        <p className="text-sm text-[#6d111c]/60 leading-relaxed mb-12 p-6 bg-white rounded-2xl border border-[#6d111c]/8">
          En accédant et en utilisant le site internet de la crêperie <strong className="text-[#6d111c]">Pépouze — La Crêperie du 12</strong>,
          vous acceptez sans réserve les présentes Conditions Générales d'Utilisation.
          Nous vous invitons à les lire attentivement avant toute utilisation du site.
        </p>

        {/* Articles */}
        <div className="bg-white rounded-2xl px-6 md:px-10 border border-[#6d111c]/8">

          <Section number="1" title="Mentions légales">
            <p><strong className="text-[#6d111c]">Raison sociale :</strong> Pépouze — La Crêperie du 12</p>
            <p><strong className="text-[#6d111c]">Adresse :</strong> 12 Rue du Point du Jour, 35890 Laillé</p>
            <p><strong className="text-[#6d111c]">Téléphone :</strong> 06 16 27 34 22</p>
            <p><strong className="text-[#6d111c]">SIRET :</strong> 50315982400047</p>
            <p><strong className="text-[#6d111c]">Responsable de publication :</strong> Marie Marion</p>
            <p><strong className="text-[#6d111c]">Hébergeur :</strong> Vercel Inc., 340 Pine Street, Suite 1201, San Francisco, CA 94104, États-Unis</p>
          </Section>

          <Section number="2" title="Objet">
            <p>
              Le présent site a pour objet de présenter l'établissement Pépouze, ses activités,
              son menu, ses horaires, ainsi que de permettre la prise de réservation en ligne.
            </p>
            <p>
              Les présentes CGU ont pour objet de définir les conditions d'accès et d'utilisation
              du site par tout utilisateur disposant d'un accès à internet.
            </p>
          </Section>

          <Section number="3" title="Accès au site">
            <p>
              Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet.
              Tous les frais liés à l'accès au service (matériel, logiciels, connexion internet) sont
              à la charge exclusive de l'utilisateur.
            </p>
            <p>
              Pépouze se réserve le droit de modifier, suspendre ou interrompre l'accès au site
              à tout moment, sans préavis ni indemnité.
            </p>
          </Section>

          <Section number="4" title="Collecte de données personnelles">
            <p>
              Dans le cadre du formulaire de réservation en ligne, les données suivantes sont collectées :
            </p>
            <ul className="list-disc list-inside space-y-1 text-[#6d111c]/60">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Date et heure de réservation</li>
              <li>Nombre de convives</li>
              <li>Message libre (optionnel)</li>
            </ul>
            <p>
              Ces données sont collectées dans le seul but de traiter votre réservation et
              de vous contacter si nécessaire. Elles ne sont ni revendues, ni transmises à des tiers.
            </p>
            <p>
              Conformément au <strong className="text-[#6d111c]">Règlement Général sur la Protection des Données (RGPD)</strong>,
              vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression
              de vos données en contactant l'établissement à l'adresse :
              <a href="tel:0616273422" className="text-[#6d111c] underline underline-offset-2 ml-1">06 16 27 34 22</a>.
            </p>
          </Section>

          <Section number="5" title="Cookies">
            <p>
              Le site Pépouze n'utilise pas de cookies à des fins publicitaires ou de suivi
              marketing. Des cookies techniques strictement nécessaires au bon fonctionnement
              du site peuvent être déposés sur votre navigateur.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour refuser les cookies. Toutefois,
              certaines fonctionnalités du site pourraient ne plus être disponibles.
            </p>
          </Section>

          <Section number="6" title="Propriété intellectuelle">
            <p>
              L'ensemble du contenu de ce site (textes, photographies, illustrations, logo, charte graphique)
              est la propriété exclusive de Pépouze — La Crêperie du 12, ou fait l'objet d'une autorisation
              d'utilisation.
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
              sans autorisation écrite préalable est strictement interdite et constituerait une
              contrefaçon sanctionnée par le Code de la propriété intellectuelle.
            </p>
          </Section>

          <Section number="7" title="Réservation en ligne">
            <p>
              La réservation en ligne est un service gratuit mis à disposition des utilisateurs.
              Elle ne constitue pas un contrat ferme et définitif. L'établissement se réserve
              le droit de confirmer ou d'annuler toute réservation par téléphone ou e-mail.
            </p>
            <p>
              En cas d'annulation de votre part, nous vous remercions de nous prévenir
              dans les meilleurs délais au <a href="tel:0616273422" className="text-[#6d111c] underline underline-offset-2">06 16 27 34 22</a>.
            </p>
          </Section>

          <Section number="8" title="Responsabilité">
            <p>
              Pépouze s'efforce de maintenir les informations de ce site à jour (horaires, menu, prix).
              Cependant, l'établissement ne saurait être tenu responsable d'éventuelles erreurs,
              omissions ou indisponibilités temporaires du site.
            </p>
            <p>
              Les liens externes présents sur ce site ne sont pas sous le contrôle de Pépouze,
              qui décline toute responsabilité quant à leur contenu.
            </p>
          </Section>

          <Section number="9" title="Droit applicable">
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur
              interprétation ou exécution sera de la compétence exclusive des tribunaux
              du ressort du siège social de l'établissement.
            </p>
          </Section>

          <Section number="10" title="Contact">
            <p>
              Pour toute question relative aux présentes CGU ou à l'utilisation de vos données
              personnelles, vous pouvez contacter l'établissement :
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <p>📍 12 Rue du Point du Jour, 35890 Laillé</p>
              <p>📞 <a href="tel:0616273422" className="text-[#6d111c] underline underline-offset-2">06 16 27 34 22</a></p>
            </div>
          </Section>

        </div>

        {/* Retour accueil */}
        <div className="text-center mt-12">
          <Link href="/"
            className="inline-block px-8 py-3 border-2 border-[#6d111c] text-[#6d111c] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#6d111c] hover:text-white transition-all duration-300">
            ← Retour à l'accueil
          </Link>
        </div>

      </div>
    </main>
  )
}