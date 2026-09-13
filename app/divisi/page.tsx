import { Card, SectionHeading } from "@/components/ui";
import { DAFTAR_SIE } from "@/data/sie";
import {
  ArrowRight,
  BookOpenText,
  HeartPulse,
  Megaphone,
  Mic,
  MoonStar,
  Shield,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Divisi",
  description: "Profil singkat tujuh divisi Pesma Nur Alannur beserta program kerja masing-masing — selaras struktur 2025/2026.",
};

const IKON: Record<string, typeof BookOpenText> = {
  pendidikan: BookOpenText,
  "ibadah-phbi": MoonStar,
  kebersihan: Sparkles,
  medkom: Mic,
  "keamanan-sarpras": Shield,
  konsumsi: UtensilsCrossed,
  "kwu-kesehatan": HeartPulse,
  // alias lama tetap didukung
  ibadah: MoonStar,
  humas: Megaphone,
  kreatif: HeartPulse,
};

export default function HalamanDivisi() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading
        kicker="Tujuh divisi · Periode 2025/2026"
        title="Divisi"
        desc="Setiap divisi menaungi sekelompok program rutin dan insidentil. Klik kartu untuk melihat daftar program kerja, anggota, dan tupoksi masing-masing divisi."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DAFTAR_SIE.map((sie) => {
          const Ikon = IKON[sie.slug] ?? Sparkles;
          return (
            <Link key={sie.slug} href={`/divisi/${sie.slug}`} className="group">
              <Card className="flex h-full flex-col transition-shadow group-hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md"
                  style={{ backgroundColor: sie.soft, color: sie.accent }}
                >
                  <Ikon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{sie.nama}</h3>
                <p className="mt-1 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {sie.deskripsi}
                </p>
                <span className="mt-3 text-xs text-ink-soft">
                  {sie.programUmum.length} program umum
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ink">
                  Lihat program kerja
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
