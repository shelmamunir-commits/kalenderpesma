"use client";

import { DAFTAR_SIE, getSieColor } from "@/data/sie";
import { Check } from "lucide-react";
import type { JenisAgenda } from "@/lib/agenda";

export type FilterJenis = JenisAgenda | "semua";
export type Tampilan = "grid" | "list";

interface Props {
  sieAktif: string[];
  onToggleSie: (nama: string) => void;
  onSemuaSie: () => void;
  onKosongkanSie: () => void;
  jenis: FilterJenis;
  onJenis: (j: FilterJenis) => void;
  tampilan: Tampilan;
  onTampilan: (t: Tampilan) => void;
}

const OPSI_JENIS: { value: FilterJenis; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "rutin", label: "Rutin" },
  { value: "insidentil", label: "Insidentil" },
];

export default function CalendarFilter({
  sieAktif,
  onToggleSie,
  onSemuaSie,
  onKosongkanSie,
  jenis,
  onJenis,
  tampilan,
  onTampilan,
}: Props) {
  return (
    <div className="space-y-3 rounded-[10px] border border-sand bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink">Filter sie</p>
        <div className="flex gap-2 text-xs">
          <button type="button" onClick={onSemuaSie} className="text-ink-soft underline-offset-2 hover:text-ink hover:underline">
            Pilih semua
          </button>
          <span className="text-sand">·</span>
          <button type="button" onClick={onKosongkanSie} className="text-ink-soft underline-offset-2 hover:text-ink hover:underline">
            Kosongkan
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter sie">
        {DAFTAR_SIE.map((sie) => {
          const aktif = sieAktif.includes(sie.nama);
          const c = getSieColor(sie.nama);
          return (
            <button
              key={sie.slug}
              type="button"
              onClick={() => onToggleSie(sie.nama)}
              aria-pressed={aktif}
              className="inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-1 text-xs font-medium transition-colors"
              style={
                aktif
                  ? { backgroundColor: c.soft, color: c.ink, borderColor: "transparent" }
                  : { backgroundColor: "#fff", color: "#6f6e69", borderColor: "#e9e9e8" }
              }
            >
              <span
                className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border"
                style={{
                  backgroundColor: aktif ? c.accent : "transparent",
                  borderColor: c.accent,
                }}
                aria-hidden
              >
                {aktif && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />}
              </span>
              {sie.singkatan}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-sand pt-3">
        <div className="flex gap-1" role="group" aria-label="Filter jenis agenda">
          {OPSI_JENIS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onJenis(o.value)}
              aria-pressed={jenis === o.value}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                jenis === o.value ? "bg-cream-dark text-ink" : "text-ink-soft hover:bg-cream-dark/60 hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="ms-auto flex gap-1" role="group" aria-label="Tampilan kalender">
          {(["grid", "list"] as Tampilan[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTampilan(t)}
              aria-pressed={tampilan === t}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tampilan === t ? "bg-cream-dark text-ink" : "text-ink-soft hover:bg-cream-dark/60 hover:text-ink"
              }`}
            >
              {t === "grid" ? "Kalender" : "List"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
