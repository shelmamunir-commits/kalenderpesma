// ─────────────────────────────────────────────────────────────
// Data agenda rutin Pesma Nur Alannur.
// Pola bersifat ATURAN BERULANG (bukan tanggal tetap) — kalender
// meng-generate tanggal otomatis via expandRecurrence() di
// /lib/recurrence.ts, sehingga berlaku untuk bulan/tahun apa pun.
//
// dayOfWeek: 0=Minggu, 1=Senin, 2=Selasa, 3=Rabu, 4=Kamis,
//            5=Jumat, 6=Sabtu
// ─────────────────────────────────────────────────────────────

export type Recurrence =
  | { type: "daily-except"; exceptDays: number[] } // tiap hari kecuali hari tertentu
  | { type: "weekly"; dayOfWeek: number } // tiap pekan di hari tertentu
  | { type: "monthly-nth-weekday"; nthInMonth: number; dayOfWeek: number } // mis. Senin minggu ke-2
  | { type: "monthly-last-weekday"; dayOfWeek: number } // hari tertentu di pekan terakhir bulan
  | { type: "monthly-dates"; dates: number[] }; // tanggal tetap tiap bulan, mis. [15, 30]

export interface AgendaRutin {
  id: string;
  nama: string;
  waktu: "pagi" | "malam";
  recurrence: Recurrence;
  sie: string; // penanggung jawab (nama sie, mis. "Pendidikan")
  deskripsi?: string;
}

export const AGENDA_RUTIN: AgendaRutin[] = [
  {
    id: "kitaban-pagi",
    nama: "Kitaban Pagi",
    waktu: "pagi",
    recurrence: { type: "daily-except", exceptDays: [0, 6] }, // setiap pagi kecuali Sabtu & Minggu
    sie: "Pendidikan",
    deskripsi: "Kajian kitab kuning setiap pagi bersama.",
  },
  {
    id: "diskusi",
    nama: "Diskusi",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 1 }, // setiap Senin malam (default mingguan)
    sie: "Pendidikan",
    deskripsi:
      "Diskusi kontemporer rutin Senin malam. Pada minggu ke-2 digantikan Sharing Bersama Teman Sharing, dan pada pekan terakhir digantikan Pelatihan TEP.",
  },
  {
    id: "tahfidz-selasa",
    nama: "Tahfidz",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 2 }, // setiap Selasa malam
    sie: "Pendidikan",
    deskripsi: "Setoran dan murajaah hafalan Al-Qur'an setiap Selasa malam.",
  },
  {
    id: "tahsin",
    nama: "Tahsin",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 3 }, // setiap Rabu malam
    sie: "Pendidikan",
    deskripsi: "Perbaikan bacaan Al-Qur'an setiap Rabu malam.",
  },
  {
    id: "tahlil-diba",
    nama: "Tahlil / Diba'",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 4 }, // setiap Kamis malam
    sie: "Pendidikan",
    deskripsi: "Tahlil dan pembacaan Diba' setiap Kamis malam.",
  },
  {
    id: "infaq",
    nama: "Infaq",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 4 }, // setiap Kamis malam, bersamaan Tahlil/Diba'
    sie: "Ibadah",
    deskripsi: "Pengumpulan infaq rutin bersamaan dengan Tahlil/Diba'.",
  },
  {
    // "1x/bulan" tanpa minggu spesifik — default: Kamis malam minggu PERTAMA.
    // Kalau pengurus memutuskan minggu lain, cukup ubah nthInMonth di bawah ini.
    id: "sholat-hajat-taubat",
    nama: "Sholat Hajat + Taubat",
    waktu: "malam",
    recurrence: { type: "monthly-nth-weekday", nthInMonth: 1, dayOfWeek: 4 },
    sie: "Ibadah",
    deskripsi: "Sholat hajat dan taubat bersama, 1x sebulan (Kamis malam minggu pertama).",
  },
  {
    id: "pelatihan-tep",
    nama: "Pelatihan TEP",
    waktu: "malam",
    recurrence: { type: "monthly-last-weekday", dayOfWeek: 1 }, // Senin malam pekan terakhir (1x/bulan)
    sie: "Pendidikan",
    deskripsi: "Pelatihan TEP setiap Senin malam di akhir bulan.",
  },
  {
    id: "sharing-teman",
    nama: "Sharing Bersama Teman Sharing",
    waktu: "malam",
    recurrence: { type: "monthly-nth-weekday", nthInMonth: 2, dayOfWeek: 1 }, // Senin malam minggu ke-2 (1x/bulan)
    sie: "Pendidikan",
    deskripsi: "Sharing santai bersama teman sharing setiap Senin malam minggu ke-2.",
  },
  {
    id: "roan-lantai",
    nama: "Roan per Lantai",
    waktu: "pagi",
    recurrence: { type: "monthly-dates", dates: [15, 30] }, // tanggal 15 & 30 tiap bulan
    sie: "Kebersihan",
    deskripsi: "Kerja bakti membersihkan area per lantai setiap tanggal 15 dan 30.",
  },
  // Khotmil Qur'an: setiap Jumat, Sabtu, dan Minggu malam (3 entri mingguan).
  {
    id: "khotmil-jumat",
    nama: "Khotmil Qur'an",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 5 },
    sie: "Ibadah",
    deskripsi: "Khotmil Qur'an setiap Jumat malam.",
  },
  {
    id: "khotmil-sabtu",
    nama: "Khotmil Qur'an",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 6 },
    sie: "Ibadah",
    deskripsi: "Khotmil Qur'an setiap Sabtu malam.",
  },
  {
    id: "khotmil-minggu",
    nama: "Khotmil Qur'an",
    waktu: "malam",
    recurrence: { type: "weekly", dayOfWeek: 0 },
    sie: "Ibadah",
    deskripsi: "Khotmil Qur'an setiap Minggu malam.",
  },
];
