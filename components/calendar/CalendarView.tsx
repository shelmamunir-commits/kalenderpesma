"use client";

import { DAFTAR_SIE, cocokFilterSie } from "@/data/sie";
import { getAgendaListForMonth, getAgendaMapForMonth, type AgendaHari } from "@/lib/agenda";
import { toISODate } from "@/lib/recurrence";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import CalendarFilter, { type FilterJenis, type Tampilan } from "./CalendarFilter";
import CalendarGrid from "./CalendarGrid";
import CalendarList from "./CalendarList";
import DayDetailModal from "./DayDetailModal";

const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const SEMUA_SIE = DAFTAR_SIE.map((s) => s.nama);

/** Agenda lolos filter sie jika salah satu sie penanggung jawabnya aktif. */
function lolosSie(agenda: AgendaHari, sieAktif: string[]): boolean {
  return cocokFilterSie(agenda.sie, sieAktif);
}

export default function CalendarView() {
  const kini = new Date();
  const [year, setYear] = useState(kini.getFullYear());
  const [month, setMonth] = useState(kini.getMonth());
  const [sieAktif, setSieAktif] = useState<string[]>(SEMUA_SIE);
  const [jenis, setJenis] = useState<FilterJenis>("semua");
  const [tampilan, setTampilan] = useState<Tampilan>("grid");
  const [terpilih, setTerpilih] = useState<Date | null>(null);

  const geser = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };
  const keHariIni = () => {
    const n = new Date();
    setYear(n.getFullYear());
    setMonth(n.getMonth());
  };

  const cocokJenis = (a: AgendaHari) => jenis === "semua" || a.jenis === jenis;

  const agendaMap = useMemo(() => {
    const mentah = getAgendaMapForMonth(year, month);
    const saring = new Map<string, AgendaHari[]>();
    for (const [iso, daftar] of mentah) {
      const cocok = daftar.filter((a) => cocokJenis(a) && lolosSie(a, sieAktif));
      if (cocok.length > 0) saring.set(iso, cocok);
    }
    return saring;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, sieAktif, jenis]);

  const daftarList = useMemo(() => {
    return getAgendaListForMonth(year, month)
      .map(({ tanggal, date, agenda }) => ({
        tanggal,
        date,
        agenda: agenda.filter((a) => cocokJenis(a) && lolosSie(a, sieAktif)),
      }))
      .filter((d) => d.agenda.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, sieAktif, jenis]);

  const toggleSie = (nama: string) =>
    setSieAktif((prev) => (prev.includes(nama) ? prev.filter((s) => s !== nama) : [...prev, nama]));

  const agendaTerpilih: AgendaHari[] = terpilih ? (agendaMap.get(toISODate(terpilih)) ?? []) : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => geser(-1)}
            aria-label="Bulan sebelumnya"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-cream-dark hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => geser(1)}
            aria-label="Bulan berikutnya"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-cream-dark hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {NAMA_BULAN[month]} {year}
        </h2>
        <button
          type="button"
          onClick={keHariIni}
          className="ms-auto rounded-md border border-sand px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-cream-dark"
        >
          Hari ini
        </button>
      </div>

      <CalendarFilter
        sieAktif={sieAktif}
        onToggleSie={toggleSie}
        onSemuaSie={() => setSieAktif(SEMUA_SIE)}
        onKosongkanSie={() => setSieAktif([])}
        jenis={jenis}
        onJenis={setJenis}
        tampilan={tampilan}
        onTampilan={setTampilan}
      />

      {tampilan === "grid" ? (
        <>
          <CalendarGrid
            year={year}
            month={month}
            agendaMap={agendaMap}
            tanggalTerpilih={terpilih ? toISODate(terpilih) : null}
            onPilihTanggal={setTerpilih}
          />
          <p className="text-xs text-ink-soft">
            Klik tanggal untuk melihat daftar lengkap agenda hari itu. Warna bar menunjukkan sie penanggung jawab.
          </p>
        </>
      ) : (
        <CalendarList daftar={daftarList} />
      )}

      {terpilih && (
        <DayDetailModal date={terpilih} agenda={agendaTerpilih} onTutup={() => setTerpilih(null)} />
      )}
    </div>
  );
}
