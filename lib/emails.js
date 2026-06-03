export const emailClient = (reservation) => ({
  subject: `✅ Réservation confirmée — Pépouze`,
  html: `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
      
      <!-- Header -->
      <div style="background: #6d111c; padding: 32px; text-align: center; border-radius: 16px 16px 0 0;">
        <h1 style="color: white; font-size: 32px; margin: 0; font-style: italic;">Pépouze</h1>
        <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 6px 0 0; letter-spacing: 0.2em; text-transform: uppercase;">
          Galettes · Crêpes · Chill
        </p>
      </div>

      <!-- Corps -->
      <div style="background: #f7f6f2; padding: 32px; border-radius: 0 0 16px 16px;">
        <p style="font-size: 15px; margin: 0 0 24px;">Bonjour <strong>${reservation.nom}</strong>,</p>
        <p style="font-size: 15px; margin: 0 0 24px;">
          Votre réservation a bien été enregistrée. Nous avons hâte de vous accueillir !
        </p>

        <!-- Récap -->
        <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #6d111c; opacity: 0.5; margin: 0 0 16px;">
            Votre réservation
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0ece4; font-size: 13px; color: #888;">📅 Date</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0ece4; font-size: 13px; font-weight: 600; text-align: right;">
                ${new Date(reservation.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0ece4; font-size: 13px; color: #888;">🕐 Heure</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f0ece4; font-size: 13px; font-weight: 600; text-align: right;">
                ${reservation.heure}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #888;">👥 Personnes</td>
              <td style="padding: 8px 0; font-size: 13px; font-weight: 600; text-align: right;">
                ${reservation.personnes} personne(s)
              </td>
            </tr>
          </table>
        </div>

        <!-- Annulation -->
        <div style="background: #fff3f3; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="font-size: 13px; margin: 0; color: #6d111c;">
            Pour annuler ou modifier votre réservation, appelez-nous au
            <strong><a href="tel:0616273422" style="color: #6d111c;">06 16 27 34 22</a></strong>
          </p>
        </div>

        <!-- Adresse -->
        <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e8e2d8;">
          <p style="font-size: 12px; color: #aaa; margin: 0;">📍 12 Rue du Point du Jour, 35890 Laillé</p>
          <p style="font-size: 11px; color: #ccc; margin: 6px 0 0;">© 2026 Pépouze — La Crêperie du 12</p>
        </div>
      </div>
    </div>
  `,
})

export const emailRestaurateur = (reservation) => ({
  subject: `🔔 Nouvelle réservation — ${reservation.nom}`,
  html: `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #6d111c; padding: 24px; border-radius: 16px 16px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px;">Nouvelle réservation reçue</h2>
      </div>
      <div style="background: #f7f6f2; padding: 24px; border-radius: 0 0 16px 16px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["Nom", reservation.nom],
            ["Date", new Date(reservation.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })],
            ["Heure", reservation.heure],
            ["Personnes", reservation.personnes],
            ["Email", reservation.email],
            ["Téléphone", reservation.telephone || "—"],
            ["Message", reservation.message || "—"],
          ].map(([label, value]) => `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; font-size: 13px; color: #888; width: 35%;">${label}</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; font-size: 13px; font-weight: 600;">${value}</td>
            </tr>
          `).join("")}
        </table>
      </div>
    </div>
  `,
})