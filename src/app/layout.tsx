// app/layout.tsx (oder .js)
import type { Metadata } from "next";
import { Geist, Geist_Mono, Comic_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const comicNeue = Comic_Neue({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ["400", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reeda",
  description: "Reeda is a reader app for eBusiness",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable}`}>
      <head>
        <script
          defer
          data-domain="ebusiness.helixhub.info"
          src="https://plausible.forgeodyssey.com/js/script.js"
        ></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
