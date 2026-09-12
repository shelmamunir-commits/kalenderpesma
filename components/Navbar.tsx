"use client";

import { BookOpenText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoImg } from "./LogoImg";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/kalender", label: "Kalender" },
  { href: "/program-insidentil", label: "Program Insidentil" },
  { href: "/divisi", label: "Divisi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [buka, setBuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setBuka(false)}>
          <LogoImg size={28} eager className="h-7 w-7 rounded-md object-cover" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            Pesma Nur Alannur
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const aktif =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    aktif
                      ? "font-semibold text-ink"
                      : "text-ink-soft hover:bg-cream-dark hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/kalender"
          className="hidden items-center gap-2 rounded-lg bg-pesma-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pesma-900 md:inline-flex"
        >
          <BookOpenText className="h-4 w-4" aria-hidden />
          Lihat Kalender
        </Link>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-soft hover:bg-cream-dark md:hidden"
          onClick={() => setBuka((v) => !v)}
          aria-label={buka ? "Tutup menu" : "Buka menu"}
          aria-expanded={buka}
        >
          {buka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {buka && (
        <ul className="space-y-0.5 border-t border-sand bg-cream px-4 py-2 md:hidden">
          {NAV.map((item) => {
            const aktif =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setBuka(false)}
                  className={`block rounded-md px-3 py-2 text-sm ${
                    aktif ? "font-semibold text-ink" : "text-ink-soft hover:bg-cream-dark"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
