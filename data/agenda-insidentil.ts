// ─────────────────────────────────────────────────────────────
// Data agenda insidentil Pesma Nur Alannur periode Sep–Des 2026.
//
// - Item bertanggal (id ins-*): masuk kalender + halaman
//   Program Insidentil (urut kronologis).
// - Item kondisional (id kon-*, tanggal: null): TANPA tanggal
//   pasti — TIDAK masuk kalender, hanya tampil di halaman
//   Program Insidentil pada section "Program Kondisional".
//
// Catatan: bila sebuah momentum bertanggal memiliki nama yang sama
// dengan agenda rutin di hari itu (mis. Pelatihan TEP pada Senin
// akhir bulan), kalender menampilkan SATU badge — momentum
// insidentil dianggap sebagai wujud konkret agenda rutin tersebut.
// Lihat tanpaDuplikat() di /lib/agenda.ts.
// ─────────────────────────────────────────────────────────────

export interface AgendaInsidentil {
  id: string;
  /** ISO date "YYYY-MM-DD", atau null untuk program kondisional tanpa tanggal pasti. */
  tanggal: string | null;
  momentum: string;
  program: string;
  /** Penanggung jawab; bisa lebih dari satu sie, pisahkan dengan " & ". */
  sie: string;
  /** Waktu pelaksanaan (umumnya malam hari). */
  waktu?: "pagi" | "malam";
  lokasi?: string;
  /** Agenda prioritas — menggantikan kegiatan rutin di slot waktunya. */
  prioritas?: boolean;
}

export const AGENDA_INSIDENTIL: AgendaInsidentil[] = [
  {
    id: "ins-00",
    tanggal: "2026-09-21",
    momentum: "Sharing Session bersama Tim Sharing",
    program:
      "Sharing session bersama Tim Sharing Pesma — membahas perkembangan santriwati dan evaluasi kegiatan. Menggantikan Diskusi Kontemporer pada minggu ini.",
    sie: "Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
    prioritas: true,
  },
  {
    id: "ins-00b",
    tanggal: "2026-09-28",
    momentum: "Pelatihan TEP",
    program:
      "Pelatihan pengembangan kemampuan santriwati (TEP) — diadakan berkala, menggantikan Diskusi Kontemporer pada minggu ini.",
    sie: "Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
    prioritas: true,
  },
  {
    id: "ins-01",
    tanggal: "2026-10-01",
    momentum: "Hari Kesaktian Pancasila",
    program: "Kajian/refleksi nilai Pancasila dalam perspektif Islam",
    sie: "Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
  },
  {
    id: "ins-02",
    tanggal: "2026-10-22",
    momentum: "Hari Santri Nasional",
    program:
      "Kegiatan utama Pesma memperingati Hari Santri Nasional — kajian santri, lomba islami, festival santri, dan malam apresiasi santri",
    sie: "Pendidikan & Ibadah",
    waktu: "malam",
    lokasi: "Lingkungan Pesma",
  },
  {
    id: "ins-03",
    tanggal: "2026-10-28",
    momentum: "Hari Sumpah Pemuda",
    program:
      "Sharing dan upgrading kepemudaan — diskusi peran mahasiswa muslimah dan deklarasi komitmen santri",
    sie: "Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
  },
  {
    id: "ins-04",
    tanggal: "2026-11-10",
    momentum: "Hari Pahlawan",
    program:
      "Kajian dan refleksi keteladanan pahlawan, sharing inspiratif, pemutaran film edukatif",
    sie: "Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
  },
  {
    id: "ins-05",
    tanggal: "2026-11-25",
    momentum: "Hari Guru Nasional",
    program: "Apresiasi untuk ustadzah, ustadz, dan pembina Pesma — kartu ucapan dan video penghargaan",
    sie: "Pendidikan & Medkom",
    waktu: "malam",
    lokasi: "Aula Pesma",
  },
  {
    id: "ins-06",
    tanggal: "2026-12-22",
    momentum: "Hari Ibu",
    program:
      'Kegiatan spesial menulis "Surat untuk Ibu", sharing tentang sosok ibu, dan campaign apresiasi ibu',
    sie: "Medkom & Pendidikan",
    waktu: "malam",
    lokasi: "Aula Pesma",
  },
  {
    id: "ins-07",
    tanggal: "2026-12-23",
    momentum: "Milad Pesma Nur Alannur",
    program:
      "Perayaan Milad Pesantren Mahasiswa Nur Alannur — khataman/doa bersama, tasyakuran, lomba, games, pentas seni, malam keakraban",
    sie: "Seluruh Sie",
    waktu: "malam",
    lokasi: "Halaman Pesma",
    prioritas: true,
  },
  // ── Program kondisional (tanpa tanggal pasti) ──
  {
    id: "kon-01",
    tanggal: null,
    momentum: "Menjelang Kegiatan Besar",
    program: "Kerja bakti, penataan, dekorasi, persiapan kebersihan lingkungan",
    sie: "Kebersihan",
  },
  {
    id: "kon-02",
    tanggal: null,
    momentum: "Saat Terjadi Musibah / Bencana",
    program: "Penggalangan dana dan penyaluran bantuan kemanusiaan",
    sie: "Medkom",
  },
  {
    id: "kon-03",
    tanggal: null,
    momentum: "Sesuai Kebutuhan",
    program: "Kajian/sharing tematik berdasarkan isu dan kebutuhan santri",
    sie: "Pendidikan & Ibadah",
  },
];

/** Momentum bertanggal, urut kronologis. */
export const INSIDENTIL_BERTANGGAL: (AgendaInsidentil & { tanggal: string })[] =
  AGENDA_INSIDENTIL.filter(
    (a): a is AgendaInsidentil & { tanggal: string } => a.tanggal !== null,
  ).sort((a, b) => a.tanggal.localeCompare(b.tanggal));

/** Program kondisional tanpa tanggal pasti. */
export const INSIDENTIL_KONDISIONAL: AgendaInsidentil[] = AGENDA_INSIDENTIL.filter(
  (a) => a.tanggal === null,
);
