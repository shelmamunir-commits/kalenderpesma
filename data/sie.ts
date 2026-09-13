// ─────────────────────────────────────────────────────────────
// Data divisi Pesma Nur Alannur — periode 2025/2026.
// Diselaraskan dengan struktur resmi (7 divisi) di data/struktur.ts.
// Setiap divisi punya 1 warna aksen konsisten untuk badge, kalender,
// dan halaman divisi. Palet pastel Notion, kontras WCAG AA.
// ─────────────────────────────────────────────────────────────

export interface Sie {
  slug: string;
  nama: string;
  /** Nama singkat untuk badge kalender. */
  singkatan: string;
  deskripsi: string;
  /** Warna aksen (garis/dot/badge solid). */
  accent: string;
  /** Background lembut untuk badge. */
  soft: string;
  /** Warna teks di atas background lembut. */
  ink: string;
  programUmum: string[];
}

/* Palet pastel kalem ala tag Notion — tetap khas per divisi. */
export const DAFTAR_SIE: Sie[] = [
  {
    slug: "ibadah-phbi",
    nama: "Ibadah & PHBI",
    singkatan: "Ibadah & PHBI",
    deskripsi:
      "Menjaga denyut ibadah santri — mengontrol jamaah shalat, mengoordinir PHBI, jadwal imam, zikir & tahlil, Two Week One Juz, hingga kegiatan Ramadhan.",
    accent: "#6B5A1F",
    soft: "#F6F1DE",
    ink: "#66591F",
    programUmum: [
      "Kontrol jamaah shalat (Subuh, Maghrib, Isya')",
      "Perencanaan & koordinasi PHBI",
      "Jadwal imam",
      "Zikir, yasin & tahlil",
      "Two Week One Juz",
      "Shalat sunnah berjamaah (taubat, hajat, witir)",
      "Kegiatan Ramadhan (imam, bilal, kultum, i'tikaf, takjil)",
      "Punishment kegiatan wajib",
    ],
  },
  {
    slug: "pendidikan",
    nama: "Pendidikan",
    singkatan: "Pendidikan",
    deskripsi:
      "Mengawal seluruh kegiatan keilmuan dan pembinaan intelektual santri — dari kitaban harian, tahsin-tahfidz, khotmil, malam Jumat, Syar'i Day, hingga pengembangan minat & bakat.",
    accent: "#3F5A3C",
    soft: "#EDF3EC",
    ink: "#3A5437",
    programUmum: [
      "Kontrol ngaji Al-Qur'an & kitab",
      "Kegiatan malam Jumat",
      "Tahsin & tahfidz Qur'an",
      "Khotmil Qur'an (Jumat–Minggu)",
      "Kegiatan Ramadhan",
      "Syar'i Day (Selasa)",
      "Notulen ngaji kitab",
      "Pengembangan seni & budaya",
      "Pelatihan minat & bakat",
      "Punishment pelanggar",
    ],
  },
  {
    slug: "medkom",
    nama: "Media & Komunikasi (Medkom)",
    singkatan: "Medkom",
    deskripsi:
      "Wajah Pesma ke luar — mengelola Instagram, dokumentasi, publikasi visual, konten media sosial, dan Podcast Pesma di Palm Spring.",
    accent: "#3B5A7C",
    soft: "#E9EFF5",
    ink: "#375471",
    programUmum: [
      "Pengelolaan akun Instagram Pesma Nur Alannur",
      "Kontrol postingan Instagram",
      "Dokumentasi setiap kegiatan",
      "Publikasi desain visual (pamflet, banner, sertifikat, poster)",
      "Konten media sosial",
      "Podcast Pesma — Sabtu malam pekan terakhir di Palm Spring",
    ],
  },
  {
    slug: "keamanan-sarpras",
    nama: "Keamanan & Sarana Prasarana",
    singkatan: "Keamanan & Sarpras",
    deskripsi:
      "Menjaga ketertiban dan sarana — dari gerbang malam & parkir hingga perizinan pulang santri dan kondusifitas aula.",
    accent: "#4B5A6A",
    soft: "#EBEEF2",
    ink: "#3A4756",
    programUmum: [
      "Kunci gerbang jam malam (22.00)",
      "Pengawasan parkir & peraturan parkir",
      "Pintu garasi terkunci malam hari",
      "Perizinan pulang santri",
      "Peneguran santri gaduh lewat jam malam",
      "Aula kondusif & santri di kamar 22.30 WIB",
      "Kontrol & laporan sarana-prasarana",
      "Punishment pelanggar",
    ],
  },
  {
    slug: "kebersihan",
    nama: "Kebersihan",
    singkatan: "Kebersihan",
    deskripsi:
      "Menjaga kebersihan dan kerapian lingkungan Pesma — dari roan rutin per lantai hingga kerja bakti besar menjelang dan pasca acara.",
    accent: "#2F5D58",
    soft: "#E6F2F0",
    ink: "#2C5954",
    programUmum: [
      "Tanggung jawab kebersihan seluruh Pesma",
      "Jadwal piket & ro'an",
      "Pengingat petugas piket",
      "Tata tertib kebersihan",
      "Pengadaan perlengkapan kebersihan",
      "Lomba kebersihan kamar",
      "Punishment pelanggar",
    ],
  },
  {
    slug: "konsumsi",
    nama: "Konsumsi",
    singkatan: "Konsumsi",
    deskripsi:
      "Mengelola dapur dan pangan santri — dari piket masak, kas makan, hingga kebersihan dapur & alat masak.",
    accent: "#8A5A2B",
    soft: "#FDF0E6",
    ink: "#7A4F25",
    programUmum: [
      "Jadwal piket masak",
      "Pengelolaan kas makan",
      "Penyediaan beras, minyak, gula & kebutuhan pokok",
      "Kebersihan dapur, area makan & kulkas",
      "Tata tertib & sanksi dapur",
      "Alat masak & jadwal roan dapur",
    ],
  },
  {
    slug: "kwu-kesehatan",
    nama: "KWU & Kesehatan",
    singkatan: "KWU & Kesehatan",
    deskripsi:
      "Menggerakkan kewirausahaan dan kesehatan — dari jual-beli kebutuhan santri & Wi-Fi hingga obat-obatan, penghijauan balkon, dan senam Jumat.",
    accent: "#2F6B55",
    soft: "#E6F2EC",
    ink: "#2A5C4A",
    programUmum: [
      "Penjualan kebutuhan santri & kontrol jual-beli",
      "Pencatatan laba (untuk Wi-Fi Pesma)",
      "Pemantauan kesehatan & obat-obatan pokok",
      "Perawatan santri sakit",
      "Penghijauan balkon & tanaman",
      "Senam tiap Jumat",
      "Punishment pelanggar",
    ],
  },
];

// Alias untuk backward-compat URL lama (/divisi/humas, /divisi/kreatif, /divisi/ibadah)
export const ALIAS_SLUG: Record<string, string> = {
  ibadah: "ibadah-phbi",
  humas: "medkom",
  kreatif: "kwu-kesehatan",
};

/** Warna netral untuk agenda lintas-sie ("Seluruh Sie / Kepanitiaan"). */
export const SIE_BERSAMA = {
  nama: "Seluruh Sie",
  singkatan: "Bersama",
  accent: "#5A5A55",
  soft: "#EFEFED",
  ink: "#3F3E3A",
};

export function getSieBySlug(slug: string): Sie | undefined {
  const normalized = ALIAS_SLUG[slug] ?? slug;
  return DAFTAR_SIE.find((s) => s.slug === normalized);
}

/** Warna badge untuk sebuah nama sie (mendukung "A & B" dan "Seluruh Sie"). */
export function getSieColor(namaSie: string): { accent: string; soft: string; ink: string } {
  // Cocok langsung via nama/singkatan/alias
  const sie = DAFTAR_SIE.find((s) => s.nama === namaSie || s.singkatan === namaSie);
  if (sie) return { accent: sie.accent, soft: sie.soft, ink: sie.ink };
  // Alias nama lama -> warna baru
  if (/^humas$/i.test(namaSie)) {
    const medkom = DAFTAR_SIE.find((s) => s.slug === "medkom")!;
    return { accent: medkom.accent, soft: medkom.soft, ink: medkom.ink };
  }
  if (/^(kreatif|kesenian)/i.test(namaSie)) {
    const kwu = DAFTAR_SIE.find((s) => s.slug === "kwu-kesehatan")!;
    return { accent: kwu.accent, soft: kwu.soft, ink: kwu.ink };
  }
  if (/^ibadah$/i.test(namaSie) && !/phbi/i.test(namaSie)) {
    const ib = DAFTAR_SIE.find((s) => s.slug === "ibadah-phbi")!;
    return { accent: ib.accent, soft: ib.soft, ink: ib.ink };
  }
  if (/seluruh/i.test(namaSie)) return SIE_BERSAMA;
  // Gabungan beberapa sie ("Pendidikan & Ibadah") → pakai warna sie pertama.
  const pertama = namaSie.split("&")[0]?.trim() ?? "";
  const cocok = DAFTAR_SIE.find((s) => s.nama === pertama || s.singkatan === pertama);
  if (cocok) return { accent: cocok.accent, soft: cocok.soft, ink: cocok.ink };
  return SIE_BERSAMA;
}

/** Pecah string sie "A & B" menjadi daftar nama sie. */
export function splitSie(namaSie: string): string[] {
  if (/seluruh/i.test(namaSie)) return DAFTAR_SIE.map((s) => s.nama);
  return namaSie
    .split("&")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Apakah sebuah nilai sie agenda (mis. "Pendidikan" atau
 * "Pendidikan & Ibadah") lolos daftar sie yang aktif di filter
 * (yang berisi nama lengkap seperti "Sie Pendidikan")?
 * Perbandingan toleran terhadap awalan "Sie " dan alias lama.
 */
export function cocokFilterSie(nilaiAgenda: string, sieAktif: string[]): boolean {
  const diterima = new Set<string>();
  for (const aktif of sieAktif) {
    diterima.add(aktif);
    const sie = DAFTAR_SIE.find((s) => s.nama === aktif || s.singkatan === aktif);
    if (sie) {
      diterima.add(sie.nama);
      diterima.add(sie.singkatan);
      // Alias lama juga diterima
      if (sie.slug === "medkom") { diterima.add("Humas"); diterima.add("Media"); }
      if (sie.slug === "ibadah-phbi") diterima.add("Ibadah");
    } else {
      diterima.add(aktif.replace(/^Sie\s+/i, ""));
    }
    // Terima alias lama di filter
    if (/^humas$/i.test(aktif)) diterima.add("Medkom");
    if (/^media$/i.test(aktif)) diterima.add("Medkom");
  }
  // Normalisasi nilai agenda: Humas/Media -> Medkom, Ibadah -> Ibadah & PHBI
  const normalisasi = (s: string) => {
    if (/^humas$/i.test(s) || /^media$/i.test(s)) return "Medkom";
    if (/^ibadah$/i.test(s)) return "Ibadah & PHBI";
    if (/^kreatif/i.test(s)) return "KWU & Kesehatan";
    return s;
  };
  return splitSie(nilaiAgenda).some((s) => diterima.has(s) || diterima.has(normalisasi(s)));
}
