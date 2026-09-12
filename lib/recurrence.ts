// ─────────────────────────────────────────────────────────────
// Inti logika kalender: generate tanggal dari aturan Recurrence.
// Semua komputasi memakai zona waktu lokal (getDay/getDate) agar
// konsisten dengan tampilan kalender di browser.
// ─────────────────────────────────────────────────────────────

import type { Recurrence } from "@/data/agenda-rutin";

/** Jumlah hari dalam bulan tertentu (month: 0=Jan .. 11=Des). */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Kembalikan array tanggal (1-based) dalam satu bulan yang cocok
 * dengan aturan recurrence. Terurut menaik.
 */
export function expandRecurrence(
  recurrence: Recurrence,
  year: number,
  month: number,
): number[] {
  const total = daysInMonth(year, month);
  const hasil: number[] = [];

  switch (recurrence.type) {
    case "daily-except": {
      for (let tgl = 1; tgl <= total; tgl++) {
        const dow = new Date(year, month, tgl).getDay();
        if (!recurrence.exceptDays.includes(dow)) hasil.push(tgl);
      }
      return hasil;
    }

    case "weekly": {
      for (let tgl = 1; tgl <= total; tgl++) {
        if (new Date(year, month, tgl).getDay() === recurrence.dayOfWeek) {
          hasil.push(tgl);
        }
      }
      return hasil;
    }

    case "monthly-nth-weekday": {
      // Kumpulkan semua tanggal dengan dayOfWeek yang cocok, ambil urutan ke-nth.
      const cocok: number[] = [];
      for (let tgl = 1; tgl <= total; tgl++) {
        if (new Date(year, month, tgl).getDay() === recurrence.dayOfWeek) {
          cocok.push(tgl);
        }
      }
      const target = cocok[recurrence.nthInMonth - 1];
      return target === undefined ? [] : [target];
    }

    case "monthly-last-weekday": {
      // Mundur dari akhir bulan sampai ketemu dayOfWeek yang cocok.
      for (let tgl = total; tgl >= 1; tgl--) {
        if (new Date(year, month, tgl).getDay() === recurrence.dayOfWeek) {
          return [tgl];
        }
      }
      return [];
    }

    case "monthly-dates": {
      // Abaikan tanggal yang tidak ada di bulan ini (mis. tgl 30 di Februari).
      return recurrence.dates.filter((tgl) => tgl >= 1 && tgl <= total).sort((a, b) => a - b);
    }
  }
}

/** Format Date → "YYYY-MM-DD" (zona lokal). */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${t}`;
}

/** Parse "YYYY-MM-DD" → Date lokal (tanpa geser timezone UTC). */
export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
