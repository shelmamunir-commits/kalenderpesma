// ─────────────────────────────────────────────────────────────
// Helper agregasi agenda: menggabungkan agenda rutin (hasil generate
// recurrence) + agenda insidentil bertanggal per hari / per bulan.
// ─────────────────────────────────────────────────────────────

import { AGENDA_INSIDENTIL, type AgendaInsidentil } from "@/data/agenda-insidentil";
import { AGENDA_RUTIN, type AgendaRutin } from "@/data/agenda-rutin";
import { expandRecurrence, fromISODate, toISODate } from "./recurrence";

export type JenisAgenda = "rutin" | "insidentil";

export interface AgendaHari {
  key: string;
  nama: string;
  jenis: JenisAgenda;
  sie: string;
  waktu?: "pagi" | "malam";
  deskripsi?: string;
  momentum?: string;
  lokasi?: string;
  prioritas?: boolean;
}

function samakanNama(nama: string): string {
  return nama.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Hilangkan agenda rutin yang terduplikasi oleh momentum insidentil
 * di hari yang sama (nama sama → insidentil menang sebagai wujud
 * konkretnya). Urutan akhir: pagi → malam → insidentil.
 */
function tanpaDuplikat(daftar: AgendaHari[]): AgendaHari[] {
  const momentum = new Set(
    daftar.filter((a) => a.jenis === "insidentil").map((a) => samakanNama(a.momentum ?? a.nama)),
  );
  const bobot = (a: AgendaHari): number =>
    a.jenis === "insidentil" ? 3 : a.waktu === "pagi" ? 1 : 2;
  return daftar
    .filter((a) => a.jenis === "insidentil" || !momentum.has(samakanNama(a.nama)))
    .sort((a, b) => bobot(a) - bobot(b) || a.nama.localeCompare(b.nama));
}

/** Semua agenda (rutin + insidentil) pada satu tanggal. */
export function getAgendaForDate(
  date: Date,
  rutin: AgendaRutin[] = AGENDA_RUTIN,
  insidentil: AgendaInsidentil[] = AGENDA_INSIDENTIL,
): AgendaHari[] {
  const hasil: AgendaHari[] = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const tgl = date.getDate();
  const iso = toISODate(date);

  for (const r of rutin) {
    const cocok = expandRecurrence(r.recurrence, year, month);
    if (cocok.includes(tgl)) {
      hasil.push({
        key: `rutin-${r.id}`,
        nama: r.nama,
        jenis: "rutin",
        sie: r.sie,
        waktu: r.waktu,
        deskripsi: r.deskripsi,
        lokasi: r.lokasi,
      });
    }
  }

  for (const ins of insidentil) {
    if (ins.tanggal === iso) {
      hasil.push({
        key: `ins-${ins.id}`,
        nama: ins.program,
        jenis: "insidentil",
        sie: ins.sie,
        waktu: ins.waktu,
        momentum: ins.momentum,
        deskripsi: ins.program,
        lokasi: ins.lokasi,
        prioritas: ins.prioritas,
      });
    }
  }

  return tanpaDuplikat(hasil);
}

/** Peta ISO-date → daftar agenda untuk satu bulan (untuk grid kalender). */
export function getAgendaMapForMonth(
  year: number,
  month: number,
  rutin: AgendaRutin[] = AGENDA_RUTIN,
  insidentil: AgendaInsidentil[] = AGENDA_INSIDENTIL,
): Map<string, AgendaHari[]> {
  const peta = new Map<string, AgendaHari[]>();

  for (const r of rutin) {
    const tanggalCocok = expandRecurrence(r.recurrence, year, month);
    for (const tgl of tanggalCocok) {
      const iso = toISODate(new Date(year, month, tgl));
      const daftar = peta.get(iso) ?? [];
      daftar.push({
        key: `rutin-${r.id}`,
        nama: r.nama,
        jenis: "rutin",
        sie: r.sie,
        waktu: r.waktu,
        deskripsi: r.deskripsi,
        lokasi: r.lokasi,
      });
      peta.set(iso, daftar);
    }
  }

  for (const ins of insidentil) {
    if (ins.tanggal === null) continue;
    const d = fromISODate(ins.tanggal);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const daftar = peta.get(ins.tanggal) ?? [];
      daftar.push({
        key: `ins-${ins.id}`,
        nama: ins.program,
        jenis: "insidentil",
        sie: ins.sie,
        waktu: ins.waktu,
        momentum: ins.momentum,
        deskripsi: ins.program,
        lokasi: ins.lokasi,
        prioritas: ins.prioritas,
      });
      peta.set(ins.tanggal, daftar);
    }
  }

  // Hilangkan duplikat rutin-vs-insidentil per tanggal.
  for (const [iso, daftar] of peta) {
    peta.set(iso, tanpaDuplikat(daftar));
  }

  return peta;
}

/** Daftar kronologis semua agenda dalam satu bulan (untuk tampilan List). */
export function getAgendaListForMonth(
  year: number,
  month: number,
  rutin: AgendaRutin[] = AGENDA_RUTIN,
  insidentil: AgendaInsidentil[] = AGENDA_INSIDENTIL,
): { tanggal: string; date: Date; agenda: AgendaHari[] }[] {
  const peta = getAgendaMapForMonth(year, month, rutin, insidentil);
  return [...peta.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tanggal, agenda]) => ({ tanggal, date: fromISODate(tanggal), agenda }));
}
