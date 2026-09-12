// ─────────────────────────────────────────────────────────────
// Data sie (divisi) Pesma Nur Alannur.
// Setiap sie punya 1 warna aksen konsisten untuk badge, kalender,
// dan halaman sie. Kombinasi soft/ink memenuhi kontras WCAG AA
// di atas background terang.
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

/* Palet pastel kalem ala tag Notion — tetap khas per sie. */
export const DAFTAR_SIE: Sie[] = [
  {
    slug: "pendidikan",
    nama: "Sie Pendidikan",
    singkatan: "Pendidikan",
    deskripsi:
      "Mengawal seluruh kegiatan keilmuan dan pembinaan intelektual santri — dari kitaban harian, tahsin-tahfidz, diskusi, hingga peringatan hari-hari besar nasional.",
    accent: "#3F5A3C",
    soft: "#EDF3EC",
    ink: "#3A5437",
    programUmum: [
      "Kajian tematik",
      "Seminar/talkshow",
      "Diskusi kepemudaan",
      "Bedah buku",
      "Peringatan Hari Santri",
      "Peringatan Sumpah Pemuda",
      "Peringatan Hari Pahlawan",
      "Peringatan Hari Guru",
      "Workshop/pelatihan",
    ],
  },
  {
    slug: "ibadah",
    nama: "Sie Ibadah",
    singkatan: "Ibadah",
    deskripsi:
      "Menjaga denyut ibadah santri — mengoordinasikan kegiatan ubudiyah harian, mingguan, dan momentum peringatan hari besar Islam (PHBI).",
    accent: "#6B5A1F",
    soft: "#F6F1DE",
    ink: "#66591F",
    programUmum: [
      "Khataman Al-Qur'an",
      "Doa bersama",
      "Muhasabah",
      "Kajian keislaman",
      "Peringatan PHBI",
      "Kegiatan ibadah bersama pada momentum tertentu",
    ],
  },
  {
    slug: "kebersihan",
    nama: "Sie Kebersihan",
    singkatan: "Kebersihan",
    deskripsi:
      "Menjaga kebersihan dan kerapian lingkungan Pesma — dari roan rutin per lantai hingga kerja bakti besar menjelang dan pasca acara.",
    accent: "#2F5D58",
    soft: "#E6F2F0",
    ink: "#2C5954",
    programUmum: [
      "Kerja bakti menjelang acara besar",
      "Bersih-bersih pascaacara",
      "Lomba kebersihan kamar",
      "Penataan lingkungan Pesma",
      "Gerakan peduli lingkungan",
    ],
  },
  {
    slug: "humas",
    nama: "Sie Humas",
    singkatan: "Humas",
    deskripsi:
      "Wajah Pesma ke luar — mengelola publikasi, dokumentasi, campaign apresiasi, penggalangan dana, bakti sosial, dan kolaborasi dengan pihak luar.",
    accent: "#3B5A7C",
    soft: "#E9EFF5",
    ink: "#375471",
    programUmum: [
      "Campaign Hari Ibu",
      "Publikasi kegiatan hari besar",
      "Penggalangan dana",
      "Bakti sosial",
      "Kolaborasi dengan pihak luar",
      "Dokumentasi dan publikasi kegiatan insidentil",
    ],
  },
  {
    slug: "kreatif",
    nama: "Sie Kreatif / Kesenian",
    singkatan: "Kreatif",
    deskripsi:
      "Merawat sisi seni dan kreativitas santri — dari pentas seni, dekorasi acara, desain publikasi, hingga persembahan khusus Milad Pesma.",
    accent: "#8A4A2B",
    soft: "#F5E9E3",
    ink: "#7C4526",
    programUmum: [
      "Lomba dalam peringatan hari besar",
      "Pentas seni",
      "Dekorasi acara",
      "Desain publikasi",
      "Persembahan Milad Pesma",
    ],
  },
];

/** Warna netral untuk agenda lintas-sie ("Seluruh Sie / Kepanitiaan"). */
export const SIE_BERSAMA = {
  nama: "Seluruh Sie",
  singkatan: "Bersama",
  accent: "#5A5A55",
  soft: "#EFEFED",
  ink: "#3F3E3A",
};

export function getSieBySlug(slug: string): Sie | undefined {
  return DAFTAR_SIE.find((s) => s.slug === slug);
}

/** Warna badge untuk sebuah nama sie (mendukung "A & B" dan "Seluruh Sie"). */
export function getSieColor(namaSie: string): { accent: string; soft: string; ink: string } {
  const sie = DAFTAR_SIE.find((s) => s.nama === namaSie || s.singkatan === namaSie);
  if (sie) return { accent: sie.accent, soft: sie.soft, ink: sie.ink };
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
 * Perbandingan toleran terhadap awalan "Sie ".
 */
export function cocokFilterSie(nilaiAgenda: string, sieAktif: string[]): boolean {
  const diterima = new Set<string>();
  for (const aktif of sieAktif) {
    diterima.add(aktif);
    const sie = DAFTAR_SIE.find((s) => s.nama === aktif || s.singkatan === aktif);
    if (sie) {
      diterima.add(sie.nama);
      diterima.add(sie.singkatan);
    } else {
      diterima.add(aktif.replace(/^Sie\s+/i, ""));
    }
  }
  return splitSie(nilaiAgenda).some((s) => diterima.has(s));
}
