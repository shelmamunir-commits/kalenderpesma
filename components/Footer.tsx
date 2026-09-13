import Link from "next/link";
import { LogoImg } from "./LogoImg";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-sand bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
            <LogoImg size={24} className="h-6 w-6 rounded-md object-cover" />
            Pesma Nur Alannur
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
            Pesantren Mahasiswa Nur Alannur Surabaya — merawat ilmu, ibadah, dan ukhuwah santri.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Jelajahi</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-ink-soft hover:text-ink" href="/">Beranda</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" href="/kalender">Kalender Kegiatan</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" href="/program-insidentil">Program Insidentil</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" href="/divisi">Divisi / Sie</Link></li>
            <li><Link className="text-ink-soft hover:text-ink" href="/struktur">Struktur & Tupoksi</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">Kontak</p>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            Tautan media sosial & narahubung akan ditambahkan di sini.
          </p>
        </div>
      </div>
      <div className="border-t border-sand">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-ink-soft sm:px-6">
          © 2026 Pesma Nur Alannur · Periode September–Desember 2026
        </p>
      </div>
    </footer>
  );
}
