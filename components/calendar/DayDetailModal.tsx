"use client";

import type { AgendaHari } from "@/lib/agenda";
import { X } from "lucide-react";
import { useEffect } from "react";
import { ItemAgenda, formatTanggalID } from "./CalendarList";

interface Props {
  date: Date;
  agenda: AgendaHari[];
  onTutup: () => void;
}

export default function DayDetailModal({ date, agenda, onTutup }: Props) {
  useEffect(() => {
    const tutup = (e: KeyboardEvent) => e.key === "Escape" && onTutup();
    window.addEventListener("keydown", tutup);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tutup);
      document.body.style.overflow = "";
    };
  }, [onTutup]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6"
      onClick={onTutup}
      role="dialog"
      aria-modal="true"
      aria-label={`Agenda ${formatTanggalID(date)}`}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-xl border border-sand bg-white p-5 shadow-xl sm:rounded-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-soft">Detail agenda</p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-ink">{formatTanggalID(date)}</h3>
            <p className="mt-0.5 text-xs text-ink-soft">
              {agenda.length} agenda · {agenda.filter((a) => a.jenis === "rutin").length} rutin ·{" "}
              {agenda.filter((a) => a.jenis === "insidentil").length} insidentil
            </p>
          </div>
          <button
            type="button"
            onClick={onTutup}
            aria-label="Tutup detail"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-soft hover:bg-cream-dark"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {agenda.length === 0 ? (
          <p className="mt-4 rounded-md border border-dashed border-sand bg-white p-4 text-center text-sm text-ink-soft">
            Tidak ada agenda pada tanggal ini.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {agenda.map((a) => (
              <ItemAgenda key={a.key} agenda={a} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
