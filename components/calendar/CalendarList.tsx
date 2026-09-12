"use client";

import { SieBadge, WaktuLabel } from "@/components/badges";
import type { AgendaHari } from "@/lib/agenda";
import { formatTanggalID } from "@/lib/format";
import { MapPin, Sparkles, Star } from "lucide-react";

export { formatTanggalID };

export function ItemAgenda({ agenda }: { agenda: AgendaHari }) {
  const judul = agenda.jenis === "insidentil" && agenda.momentum ? agenda.momentum : agenda.nama;
  return (
    <li className="rounded-md border border-sand bg-white px-3 py-2.5">
      <span className="mt-0.5 block flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="block text-sm font-medium text-ink">{judul}</span>
          {agenda.prioritas && (
            <span className="inline-flex items-center gap-1 rounded-[4px] bg-pesma-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              <Star className="h-3 w-3" aria-hidden />
              Prioritas
            </span>
          )}
        </span>
        {agenda.jenis === "insidentil" && (
          <span className="mt-0.5 flex items-start gap-1 text-xs leading-relaxed text-ink-soft">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
            {agenda.nama}
          </span>
        )}
        {agenda.jenis === "rutin" && agenda.deskripsi && (
          <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{agenda.deskripsi}</span>
        )}
        {agenda.lokasi && (
          <span className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {agenda.lokasi}
          </span>
        )}
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {agenda.waktu && <WaktuLabel waktu={agenda.waktu} />}
          <SieBadge sie={agenda.sie} />
        </span>
      </span>
    </li>
  );
}

export default function CalendarList({
  daftar,
}: {
  daftar: { tanggal: string; date: Date; agenda: AgendaHari[] }[];
}) {
  if (daftar.length === 0) {
    return (
      <div className="rounded-[10px] border border-dashed border-sand bg-white p-8 text-center text-sm text-ink-soft">
        Tidak ada agenda pada bulan ini untuk filter yang dipilih.
      </div>
    );
  }
  return (
    <ol className="space-y-3">
      {daftar.map(({ tanggal, date, agenda }) => (
        <li key={tanggal} className="rounded-[10px] border border-sand bg-white p-4">
          <p className="text-sm font-semibold text-ink">{formatTanggalID(date)}</p>
          <ul className="mt-2 space-y-2">
            {agenda.map((a) => (
              <ItemAgenda key={a.key} agenda={a} />
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
