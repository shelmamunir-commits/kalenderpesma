import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BASE_PATH } from "@/components/LogoImg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pesma Nur Alannur — Pesantren Mahasiswa",
    template: "%s | Pesma Nur Alannur",
  },
  description:
    "Kalender kegiatan, program insidentil, dan profil divisi Pesantren Mahasiswa (Pesma) Nur Alannur periode September–Desember 2026.",
  icons: {
    // Manual prefix karena metadata icons tidak otomatis ikut basePath.
    icon: `${BASE_PATH}/logo.jpeg`,
    apple: `${BASE_PATH}/logo.jpeg`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
