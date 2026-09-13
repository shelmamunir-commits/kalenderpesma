// Struktur & Tupoksi Pengurus Pesma Nur Alannur — Periode 2025/2026
// Sumber: dokumen pengurus resmi. Data statis, edit manual bila ada pergantian.

export const PERIODE = "2025/2026";

export interface Anggota {
  nama: string;
  lantai?: string;
  kamar?: string;
}

export interface JabatanInti {
  jabatan: string;
  nama: string;
  keterangan?: string;
}

export interface DivisiOrg {
  slug: string;
  nama: string;
  anggota: string[];
  tupoksi: string[];
  ikon?: string;
}

// Hierarki: Pengasuh → Pembimbing → Ketua → Sekretaris ↔ Bendahara → Divisi → Santri
export const PENGASUH: JabatanInti = {
  jabatan: "Pengasuh",
  nama: "Prof. Dr. Hj. Mutimmatul Faidah, S.Ag., M.Ag.",
};

export const PEMBIMBING: Anggota[] = [
  { nama: "Siti Ma'rufah" },
  { nama: "Dina Rahmawati" },
];

export const PENGURUS_INTI: JabatanInti[] = [
  { jabatan: "Ketua", nama: "Arshella Angelina", keterangan: "Lt. 2" },
  { jabatan: "Sekretaris", nama: "Zunniya' Tunnisa", keterangan: "Lt. 2" },
  { jabatan: "Bendahara", nama: "Amalia Nur Wachidah", keterangan: "Lt. 2" },
];

export const DIVISI: DivisiOrg[] = [
  {
    slug: "ibadah-phbi",
    nama: "Ibadah & PHBI",
    anggota: [
      "Salwa 'Aidatussafanah",
      "Noor Zuhailah",
      "Najwa Nur",
      "Jannatin Aliyah",
      "Noor",
      "Dewi Ananda",
      "Debby Ambarani",
    ],
    tupoksi: [
      "Mengontrol jamaah shalat (Subuh, Maghrib, Isya')",
      "Merencanakan dan mengoordinir kegiatan PHBI (Peringatan Hari Besar Islam)",
      "Mengoordinir jadwal imam",
      "Mengondisikan kegiatan zikir, yasin, dan tahlil",
      "Merencanakan dan mengoordinir kegiatan Two Week One Juz",
      "Mengadakan shalat sunnah berjamaah (taubat, hajat, witir) tiap 2 minggu/1 bulan sekali",
      "Mengoordinir kegiatan bulan Ramadhan (jadwal imam, bilal, kultum, i'tikaf, bagi takjil)",
      "Memberikan punishment bagi santri yang tidak mengikuti kegiatan wajib",
    ],
  },
  {
    slug: "pendidikan",
    nama: "Pendidikan",
    anggota: [
      "Aulia Dini Syakirina",
      "Asva Eka",
      "Vamela Febya",
      "Jauzah Rifda",
      "Lailatul Balqis B.",
      "Nawal El Sadawi A. Z.",
    ],
    tupoksi: [
      "Mengontrol kegiatan mengaji Al-Qur'an dan kitab",
      "Merencanakan dan mengoordinir kegiatan malam Jumat",
      "Merencanakan dan mengoordinir tahsin dan tahfidz Qur'an",
      "Merencanakan dan mengoordinir khotmil Qur'an (offline Jumat, Sabtu, Minggu)",
      "Merencanakan dan mengoordinir kegiatan bulan Ramadhan",
      "Mengoordinir Syar'i Day (hari Selasa)",
      "Mengondisikan notulen ngaji kitab",
      "Mengembangkan minat dan bakat santri di bidang seni & budaya",
      "Mengoordinir pelatihan minat dan bakat santri",
      "Memberikan punishment bagi santri yang melanggar",
    ],
  },
  {
    slug: "medkom",
    nama: "Media & Komunikasi (Medkom)",
    anggota: [
      "Ayu Angelina",
      "Lu'lu'ul Hamdiyah",
      "Shelma Nasywa",
      "Safina Amelya I.",
      "Andini Rahmawati Putri",
    ],
    tupoksi: [
      "Mengoordinasikan akun Instagram Pesma Nur-Alannur",
      "Mengontrol postingan Instagram",
      "Mendokumentasikan setiap kegiatan untuk dipublikasikan",
      "Membuat publikasi desain visual (pamflet, banner, sertifikat, poster ucapan, dll.)",
      "Membuat konten menarik untuk media sosial",
    ],
  },
  {
    slug: "keamanan-sarpras",
    nama: "Keamanan & Sarana Prasarana",
    anggota: [
      "Bilqis Indar Parawansah",
      "Alimiana Rizka",
      "Thania Aulia",
      "Lina Rohma Firdausia",
      "Naila Raniyah",
      "Rohmatun Nazila",
    ],
    tupoksi: [
      "Mengunci gerbang pada jam malam (pukul 22.00)",
      "Mengawasi tempat parkir dan membuat peraturan parkir",
      "Memastikan pintu garasi terkunci pada malam hari",
      "Mengoordinir perizinan pulang santri",
      "Menegur santri yang ramai/gaduh melewati jam malam",
      "Memastikan aula kondusif dan santri sudah di kamar pada pukul 22.30 WIB",
      "Bertanggung jawab, mengontrol, dan melaporkan kondisi sarana-prasarana Pesma",
      "Memberikan punishment bagi pelanggar peraturan",
    ],
  },
  {
    slug: "kebersihan",
    nama: "Kebersihan",
    anggota: [
      "Maghfirah Ramadhania Firdaus",
      "Arini Hassisal J.",
      "Alfa Sikhah S.",
      "Aulia Kusuma",
      "Unsiatus Saidah",
      "Ishmah Nur Auliya",
    ],
    tupoksi: [
      "Bertanggung jawab penuh atas kebersihan seluruh Pesma",
      "Membuat jadwal piket kebersihan santri dan jadwal ro'an",
      "Mengingatkan petugas piket kebersihan",
      "Membuat tata tertib kebersihan",
      "Membeli perlengkapan kebersihan",
      "Mengadakan lomba kebersihan kamar",
      "Memberikan punishment bagi pelanggar",
    ],
  },
  {
    slug: "konsumsi",
    nama: "Konsumsi",
    anggota: [
      "Maela Tuhfatus Salma",
      "Evilani Al Qur'taini",
      "Santri Devi",
      "Amel Fauzia",
      "Anisa Nur",
      "Isnatun Nisa",
      "Hikmatul Ainiyah",
      "Zaiyanatul Marufah",
    ],
    tupoksi: [
      "Membuat dan mengawasi jadwal piket masak",
      "Mengelola keuangan/kas makan",
      "Menyediakan kebutuhan pokok piket masak (beras, minyak, gula, dll.)",
      "Menjaga kebersihan area dapur, area makan, dan kulkas",
      "Membuat tata tertib dan sanksi terkait dapur & piket masak",
      "Mengelola kebutuhan alat masak dan jadwal roan dapur",
    ],
  },
  {
    slug: "kwu-kesehatan",
    nama: "KWU & Kesehatan",
    anggota: [
      "Sabrina Putri Amalia",
      "Salsabila Nurul Faiza",
      "Salma Fauziah",
      "Anisa Suci Rachmawati",
      "Ardelia Zahra Farsiana",
      "Redha Emawati Ubudiyah",
      "Balqis Asyhar",
    ],
    tupoksi: [
      "Menjual keperluan santri dan mengontrol kegiatan jual-beli",
      "Mencatat laba jual-beli (dialokasikan untuk Wi-Fi Pesma)",
      "Memantau kesehatan santri dan menyediakan obat-obatan pokok",
      "Merawat santri yang sakit",
      "Menghidupkan tanaman di balkon dan mengadakan kegiatan penghijauan",
      "Mengadakan kegiatan senam tiap hari Jumat",
      "Memberikan punishment bagi santri yang tidak mengikuti kegiatan",
    ],
  },
];

// Tupoksi pengurus inti (dipisah dari divisi)
export const TUPOKSI_INTI: Record<string, string[]> = {
  Ketua: [
    "Bertanggung jawab atas jalannya kegiatan Pesma",
    "Mengontrol semua kegiatan divisi-divisi agar berjalan baik",
    "Mengadakan rapat pengurus tiap akhir bulan",
  ],
  Sekretaris: [
    "Bertanggung jawab penuh atas keluar-masuknya surat Pesma",
    "Menyusun LPJ akhir periode bersama wakil pengasuh",
    "Menyelenggarakan rapat dan mencatat hasil rapat",
    "Membuat buku pedoman program kerja dan buku induk Pesma",
    "Membuat piagam penghargaan",
  ],
  Bendahara: [
    "Mengelola dan melaporkan pemasukan/pengeluaran biaya operasional",
    "Menyusun LPJ keuangan akhir periode",
    "Mengatur dan mengoordinir biaya operasional dan program kerja tiap bidang",
    "Bertanggung jawab atas pemasukan laba KWU",
  ],
};
