// ─────────────────────────────────────────────────────────────
// Referensi hari besar 2026 (PHBI & Hari Nasional).
// Berfungsi sebagai pengingat — pengurus dapat menambahkan agenda
// khusus pada tanggal-tanggal ini lewat file agenda-insidentil.ts.
// Tanggal PHBI mengikuti penetapan Kemenag.
// ─────────────────────────────────────────────────────────────

export interface HariBesar {
  nama: string;
  /** ISO date "YYYY-MM-DD". */
  tanggal: string;
}

export const PHBI_2026: HariBesar[] = [
  { nama: "Isra Mikraj Nabi Muhammad SAW", tanggal: "2026-01-16" },
  { nama: "Awal Ramadan", tanggal: "2026-02-19" },
  { nama: "Nuzulul Qur'an (perkiraan 17 Ramadan)", tanggal: "2026-03-07" },
  { nama: "Idulfitri 1447 H", tanggal: "2026-03-21" },
  { nama: "Iduladha 1447 H", tanggal: "2026-05-27" },
  { nama: "Tahun Baru Islam 1448 H", tanggal: "2026-06-16" },
  { nama: "Maulid Nabi Muhammad SAW", tanggal: "2026-08-25" },
];

export const HARI_NASIONAL_2026: HariBesar[] = [
  { nama: "Hari Kartini", tanggal: "2026-04-21" },
  { nama: "Hari Pendidikan Nasional", tanggal: "2026-05-02" },
  { nama: "Hari Lahir Pancasila", tanggal: "2026-06-01" },
  { nama: "Hari Kemerdekaan Indonesia", tanggal: "2026-08-17" },
  { nama: "Hari Maritim Nasional", tanggal: "2026-09-23" },
  { nama: "Hari Kesaktian Pancasila", tanggal: "2026-10-01" },
  { nama: "Hari Santri Nasional", tanggal: "2026-10-22" },
  { nama: "Hari Sumpah Pemuda", tanggal: "2026-10-28" },
  { nama: "Hari Pahlawan", tanggal: "2026-11-10" },
  { nama: "Hari Guru Nasional", tanggal: "2026-11-25" },
  { nama: "Hari Ibu", tanggal: "2026-12-22" },
];
