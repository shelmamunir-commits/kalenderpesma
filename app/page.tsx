"use client";

import { SieBadge, WaktuLabel } from "@/components/badges";
import { Card, SectionHeading } from "@/components/ui";
import { INSIDENTIL_BERTANGGAL } from "@/data/agenda-insidentil";
import { getAgendaForDate } from "@/lib/agenda";
import { fromISODate, toISODate } from "@/lib/recurrence";
import { ArrowRight, CalendarDays, MapPin, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { formatTanggalID } from "@/components/calendar/CalendarList";

export default function Beranda() {
  const { hariIni, agendaHariIni, agendaMingguIni, momentumTerdekat } = useMemo(() => {
    const hariIni = new Date();
    const isoHariIni = toISODate(hariIni);
    const agendaHariIni = getAgendaForDate(hariIni);

    // 7 hari ke depan (termasuk hari ini).
    const agendaMingguIni: { date: Date; jumlah: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(hariIni.getFullYear(), hariIni.getMonth(), hariIni.getDate() + i);
      agendaMingguIni.push({ date: d, jumlah: getAgendaForDate(d).length });
    }

    const momentumTerdekat = INSIDENTIL_BERTANGGAL.filter((a) => a.tanggal >= isoHariIni).slice(0, 3);
    const sisa = 3 - momentumTerdekat.length;
    const tambahan =
      sisa > 0 ? INSIDENTIL_BERTANGGAL.slice(0, sisa) : []; // kalau periode lewat, tampilkan awal periode
    return { hariIni, agendaHariIni, agendaMingguIni, momentumTerdekat: [...momentumTerdekat, ...tambahan] };
  }, []);

  return (
    <div>
      {/* ── Hero ala Notion: putih, rata tengah ── */}
      <section className="mx-auto max-w-3xl px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
          Satu kalender untuk seluruh kegiatan Pesma.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Pesma Nur Alannur Surabaya — rumah kedua mahasiswa perantauan. Pantau jadwal
          rutin, momentum insidentil, dan program tiap divisi dalam satu tempat.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kalender"
            className="inline-flex items-center gap-2 rounded-lg bg-pesma-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pesma-900"
          >
            <CalendarDays className="h-4 w-4" aria-hidden />
            Lihat Kalender
          </Link>
          <Link
            href="/divisi"
            className="inline-flex items-center gap-1.5 rounded-lg border border-sand px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cream-dark"
          >
            Kenali divisi
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {/* ── Bingkai pratinjau ala screenshot Notion ── */}
        <div className="mt-10 overflow-hidden rounded-xl border border-sand bg-white text-left shadow-[0_8px_40px_-16px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-1.5 border-b border-sand bg-cream-dark/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sand" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-sand" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-sand" aria-hidden />
            <span className="ms-2 truncate text-xs text-ink-soft">
              {formatTanggalID(hariIni)} — {agendaHariIni.length} agenda
            </span>
          </div>
          <ul className="divide-y divide-sand">
            {agendaHariIni.length === 0 && (
              <li className="px-4 py-3 text-sm text-ink-soft">
                Tidak ada agenda terjadwal hari ini.
              </li>
            )}
            {agendaHariIni.slice(0, 5).map((a) => (
              <li key={a.key} className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm">
                <span className="font-medium text-ink">
                  {a.jenis === "insidentil" && a.momentum ? a.momentum : a.nama}
                </span>
                <span className="ms-auto flex items-center gap-1.5">
                  {a.waktu && <WaktuLabel waktu={a.waktu} />}
                  <SieBadge sie={a.sie} size="xs" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6">
        {/* ── Hari ini & minggu ini ── */}
        <section aria-label="Agenda terdekat">
          <SectionHeading
            kicker="Jadwal santri"
            title={`Hari ini: ${formatTanggalID(hariIni)}`}
            desc="Dihitung otomatis dari jadwal rutin dan momentum insidentil."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-sm font-semibold text-ink">
                Agenda hari ini ({agendaHariIni.length})
              </p>
              {agendaHariIni.length === 0 ? (
                <p className="mt-2 text-sm text-ink-soft">Tidak ada agenda terjadwal hari ini.</p>
              ) : (
                <ul className="mt-2 divide-y divide-sand">
                  {agendaHariIni.map((a) => (
                    <li key={a.key} className="flex flex-wrap items-center gap-2 py-2.5 text-sm">
                      <span className="font-medium text-ink">
                        {a.jenis === "insidentil" && a.momentum ? a.momentum : a.nama}
                      </span>
                      <span className="ms-auto flex items-center gap-1.5">
                        {a.waktu && <WaktuLabel waktu={a.waktu} />}
                        <SieBadge sie={a.sie} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            <Card>
              <p className="text-sm font-semibold text-ink">Sepekan ke depan</p>
              <ul className="mt-2 divide-y divide-sand">
                {agendaMingguIni.map(({ date, jumlah }) => (
                  <li
                    key={toISODate(date)}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <span className="text-ink">{formatTanggalID(date)}</span>
                    <span className="rounded-[4px] bg-cream-dark px-2 py-0.5 text-xs text-ink-soft">
                      {jumlah} agenda
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* ── Momentum terdekat ── */}
        <section aria-label="Momentum terdekat">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeading
              kicker="Jangan lewatkan"
              title="Momentum terdekat"
              desc="Program insidentil periode September–Desember 2026."
            />
            <Link
              href="/program-insidentil"
              className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:underline"
            >
              Semua program <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {momentumTerdekat.map((m) => (
              <Card key={m.id} className="flex flex-col transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
                <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {formatTanggalID(fromISODate(m.tanggal))}
                </p>
                <h3 className="mt-1.5 flex flex-wrap items-center gap-2 text-lg font-bold tracking-tight text-ink">
                  {m.momentum}
                  {m.prioritas && (
                    <span className="inline-flex items-center gap-1 rounded-[4px] bg-pesma-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      <Star className="h-3 w-3" aria-hidden />
                      Prioritas
                    </span>
                  )}
                </h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-soft">{m.program}</p>
                {m.lokasi && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                    {m.lokasi}
                  </p>
                )}
                <p className="mt-3"><SieBadge sie={m.sie} /></p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
