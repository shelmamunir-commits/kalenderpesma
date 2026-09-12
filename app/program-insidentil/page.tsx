import { SieBadge, WaktuLabel } from "@/components/badges";
import { Card, SectionHeading } from "@/components/ui";
import { INSIDENTIL_BERTANGGAL, INSIDENTIL_KONDISIONAL } from "@/data/agenda-insidentil";
import { HARI_NASIONAL_2026, PHBI_2026, type HariBesar } from "@/data/referensi";
import { fromISODate } from "@/lib/recurrence";
import { formatTanggalID } from "@/lib/format";
import { MapPin, Star } from "lucide-react";

export const metadata = {
  title: "Program Insidentil",
  description:
    "Program kerja insidentil Pesma Nur Alannur per divisi periode September–Desember 2026, termasuk momentum khusus yang bertanggal pasti.",
};

function ReferensiCard({
  judul,
  catatan,
  daftar,
  tanggalBeragenda,
}: {
  judul: string;
  catatan: string;
  daftar: HariBesar[];
  tanggalBeragenda: Set<string>;
}) {
  return (
    <Card>
      <h3 className="text-lg font-bold tracking-tight text-ink">{judul}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{catatan}</p>
      <ul className="mt-3 divide-y divide-sand">
        {daftar.map((h) => (
          <li key={h.tanggal} className="flex items-center justify-between gap-2 py-2 text-sm">
            <span>
              <span className="block text-ink">{h.nama}</span>
              <span className="block text-xs text-ink-soft">
                {formatTanggalID(fromISODate(h.tanggal))}
              </span>
            </span>
            {tanggalBeragenda.has(h.tanggal) && (
              <span className="shrink-0 rounded-[4px] bg-cream-dark px-2 py-0.5 text-[11px] font-medium text-ink">
                Ada agenda
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function HalamanProgramInsidentil() {
  const tanggalBeragenda = new Set(INSIDENTIL_BERTANGGAL.map((m) => m.tanggal));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading
        kicker="September – Desember 2026"
        title="Program insidentil"
        desc="Momentum bertanggal pasti, ditambah program kondisional yang menyesuaikan kebutuhan di lapangan."
      />

      {/* ── Timeline momentum bertanggal ── */}
      <ol className="relative mt-8 space-y-4 border-s border-sand ps-0 sm:ms-4">
        {INSIDENTIL_BERTANGGAL.map((m) => {
          const d = fromISODate(m.tanggal);
          return (
            <li key={m.id} className="relative ps-8 sm:ps-10">
              <span
                className="absolute top-5 -start-[5px] h-2.5 w-2.5 rounded-full bg-ink-soft"
                aria-hidden
              />
              <Card>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="shrink-0 rounded-md border border-sand px-4 py-3 text-center sm:w-20">
                    <p className="text-2xl font-bold leading-none tracking-tight text-ink">{d.getDate()}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-ink-soft">
                      {d.toLocaleDateString("id-ID", { month: "short" })} ’26
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ink-soft">{formatTanggalID(d)}</p>
                    <h3 className="mt-0.5 flex flex-wrap items-center gap-2 text-lg font-bold tracking-tight text-ink">
                      {m.momentum}
                      {m.prioritas && (
                        <span className="inline-flex items-center gap-1 rounded-[4px] bg-pesma-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          <Star className="h-3 w-3" aria-hidden />
                          Prioritas
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.program}</p>
                    {m.lokasi && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                        {m.lokasi}
                      </p>
                    )}
                    <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {m.waktu && <WaktuLabel waktu={m.waktu} />}
                      <SieBadge sie={m.sie} />
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>

      {/* ── Program kondisional ── */}
      <section className="mt-12" aria-label="Program kondisional">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Program Kondisional / Menyesuaikan Momentum
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Program berikut tidak memiliki tanggal pasti sehingga tidak masuk kalender —
          dilaksanakan saat momentumnya tiba.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSIDENTIL_KONDISIONAL.map((m) => (
            <Card key={m.id} className="border-dashed">
              <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                Tanpa tanggal tetap
              </p>
              <h3 className="mt-1.5 text-base font-bold tracking-tight text-ink">{m.momentum}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.program}</p>
              <p className="mt-3"><SieBadge sie={m.sie} /></p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Referensi hari besar ── */}
      <section className="mt-12" aria-label="Referensi hari besar 2026">
        <SectionHeading
          kicker="Pengingat pengurus"
          title="Referensi hari besar 2026"
          desc="Hari-hari besar ini berfungsi sebagai pengingat — pengurus dapat menjadwalkan agenda khusus pada tanggal-tanggal tersebut."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ReferensiCard
            judul="PHBI"
            catatan="Peringatan Hari Besar Islam 2026, mengikuti penetapan Kemenag."
            daftar={PHBI_2026}
            tanggalBeragenda={tanggalBeragenda}
          />
          <ReferensiCard
            judul="Hari Nasional"
            catatan="Hari besar nasional 2026 — yang berlabel “Ada agenda” sudah terjadwal di Pesma."
            daftar={HARI_NASIONAL_2026}
            tanggalBeragenda={tanggalBeragenda}
          />
        </div>
      </section>
    </div>
  );
}
