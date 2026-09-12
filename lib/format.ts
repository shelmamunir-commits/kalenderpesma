// ─────────────────────────────────────────────────────────────
// Format tanggal Indonesia. Modul server-safe (tanpa "use client")
// sehingga bisa dipakai di Server Component maupun Client Component.
// ─────────────────────────────────────────────────────────────

export const NAMA_HARI_PANJANG = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** "Senin, 12 Oktober 2026". */
export function formatTanggalID(date: Date): string {
  return `${NAMA_HARI_PANJANG[date.getDay()]}, ${date.getDate()} ${NAMA_BULAN[date.getMonth()]} ${date.getFullYear()}`;
}
