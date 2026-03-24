import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pépouze la crêperie du 12",
  description: "Nous sommes une crêperie situé à Laillé, au 12 rue du point du jour. Ici c'est cuisine maison 🤗 et ambiance chaleureuse et conviviale ! Réservez au 06 16 27 34 22 ou sur notre site.",
  openGraph: {
    title: "Pépouze la crêperie du 12",
    description:
      "« Galettes, Crêpes & Chill* » : bienvenue chez Pépouze, la Crêperiedu 12",
    url: "https://pepouze-la-creperie-du-12.vercel.app",
    siteName: "Pépouze la crêperie du 12",
    images: [
      {
        url: "https://pepouze-la-creperie-du-12.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pépouze la crêperie du 12",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </body>
    </html>
  );
}
