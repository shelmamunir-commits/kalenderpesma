"use client";

import { getSieColor } from "@/data/sie";
import type { AgendaHari } from "@/lib/agenda";
import { toISODate } from "@/lib/recurrence";

const NAMA_HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

interface Props {
  year: number;
  month: number; // 0-based
  agendaMap: Map<string, AgendaHari[]>;
  onPilihTanggal: (date: Date) => void;
  tanggalTerpilih: string | null;
}

/** Offset kolom awal (Senin = kolom 0). */
function offsetAwal(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

/** Bar agenda full-width ala Notion Calendar: tint pastel + judul. */
function AgendaBar({ agenda }: { agenda: AgendaHari }) {
  const c = getSieColor(agenda.sie);
  const judul = agenda.jenis === "insidentil" && agenda.momentum ? agenda.momentum : agenda.nama;
  return (
    <span
      className="block truncate rounded-[4px] px-1.5 py-px text-[11px] leading-5 font-medium"
      style={{ backgroundColor: c.soft, color: c.ink }}
      title={`${judul} · ${agenda.sie}${agenda.waktu ? ` · ${agenda.waktu}` : ""}`}
    >
      {judul}
    </span>
  );
}

export default function CalendarGrid({ year, month, agendaMap, onPilihTanggal, tanggalTerpilih }: Props) {
  const total = new Date(year, month + 1, 0).getDate();
  const offset = offsetAwal(year, month);
  const totalPrev = new Date(year, month, 0).getDate();
  const hariIni = toISODate(new Date());

  const sel: { date: Date; dalamBulan: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--) sel.push({ date: new Date(year, month - 1, totalPrev - i), dalamBulan: false });
  for (let t = 1; t <= total; t++) sel.push({ date: new Date(year, month, t), dalamBulan: true });
  while (sel.length % 7 !== 0) {
    const n = sel.length - offset - total + 1;
    sel.push({ date: new Date(year, month + 1, n), dalamBulan: false });
  }

  return (
    <div className="overflow-x-auto rounded-[10px] border border-sand bg-white">
      <div className="min-w-[640px]">
        <div className="grid grid-cols-7 border-b border-sand">
          {NAMA_HARI.map((h) => (
            <div key={h} className="px-2 py-2 text-center text-xs font-medium text-ink-soft">
              {h}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {sel.map(({ date, dalamBulan }, i) => {
            const iso = toISODate(date);
            const daftar = agendaMap.get(iso) ?? [];
            const adalahHariIni = iso === hariIni;
            const terpilih = iso === tanggalTerpilih;
            const tampil = daftar.slice(0, 3);
            const sisa = daftar.length - tampil.length;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onPilihTanggal(date)}
                className={`flex min-h-[92px] flex-col gap-1 border-b border-r border-sand p-1.5 text-left align-top transition-colors last:[&:nth-child(7n)]:border-r-0 hover:bg-cream-dark/60 focus-visible:outline-2 focus-visible:outline-ink sm:min-h-[108px] ${
                  dalamBulan ? "" : "bg-cream-dark/40"
                } ${terpilih ? "bg-cream-dark ring-2 ring-inset ring-ink" : ""}`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    adalahHariIni
                      ? "bg-pesma-800 font-semibold text-white"
                      : dalamBulan
                        ? "text-ink-soft"
                        : "text-ink-soft/40"
                  }`}
                >
                  {date.getDate()}
                </span>
                <span className="flex flex-col gap-1">
                  {tampil.map((a) => (
                    <AgendaBar key={a.key} agenda={a} />
                  ))}
                  {sisa > 0 && (
                    <span className="px-1 text-[11px] text-ink-soft">+{sisa} lainnya</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
