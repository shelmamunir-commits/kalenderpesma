import { SieBadge, WaktuLabel } from "@/components/badges";
import { Card } from "@/components/ui";
import { AGENDA_INSIDENTIL } from "@/data/agenda-insidentil";
import { AGENDA_RUTIN } from "@/data/agenda-rutin";
import { DAFTAR_SIE, cocokFilterSie, getSieBySlug } from "@/data/sie";
import { fromISODate } from "@/lib/recurrence";
import { ArrowLeft, CalendarHeart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatTanggalID } from "@/lib/format";

export function generateStaticParams() {
  return DAFTAR_SIE.map((sie) => ({ slug: sie.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const sie = getSieBySlug((await params).slug);
  return { title: sie ? sie.nama : "Divisi" };
}

export default async function HalamanDetailSie({ params }: { params: Promise<{ slug: string }> }) {
  const sie = getSieBySlug((await params).slug);
  if (!sie) notFound();

  // Gabungan 3 sumber: agenda rutin + program umum + insidentil tanggung jawab sie ini.
  const rutin = AGENDA_RUTIN.filter((r) => r.sie === sie.nama || r.sie === sie.singkatan);
  const insidentil = AGENDA_INSIDENTIL.filter((a) => cocokFilterSie(a.sie, [sie.nama]));
  const insidentilBertanggal = insidentil.filter(
    (a): a is (typeof a) & { tanggal: string } => a.tanggal !== null,
  );
  const insidentilKondisional = insidentil.filter((a) => a.tanggal === null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/divisi"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Semua divisi
      </Link>

      <div className="mt-4 rounded-[10px] border border-sand bg-white p-6 sm:p-8">
        <p className="inline-flex">
          <SieBadge sie={sie.nama} />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{sie.nama}</h1>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{sie.deskripsi}</p>
      </div>

      {/* ── Agenda rutin ── */}
      <section className="mt-8" aria-label="Agenda rutin">
        <h2 className="text-lg font-bold tracking-tight text-ink">
          Agenda rutin ({rutin.length})
        </h2>
        {rutin.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">Sie ini tidak memegang agenda rutin.</p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {rutin.map((r) => (
              <Card key={r.id}>
                <p className="flex items-center justify-between gap-2">
                  <span className="font-medium text-ink">{r.nama}</span>
                  <WaktuLabel waktu={r.waktu} />
                </p>
                {r.deskripsi && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.deskripsi}</p>}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Program umum ── */}
      <section className="mt-8" aria-label="Program kerja umum">
        <h2 className="text-lg font-bold tracking-tight text-ink">
          Program kerja umum ({sie.programUmum.length})
        </h2>
        <Card className="mt-3">
          <ul className="grid gap-2 sm:grid-cols-2">
            {sie.programUmum.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-ink">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ── Insidentil ── */}
      <section className="mt-8" aria-label="Program insidentil">
        <h2 className="text-lg font-bold tracking-tight text-ink">
          Program insidentil ({insidentil.length})
        </h2>
        {insidentil.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">
            Sie ini tidak menjadi penanggung jawab momentum insidentil periode ini.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {insidentilBertanggal.map((a) => (
              <li key={a.id}>
                <Card>
                  <p className="text-xs text-ink-soft">
                    {formatTanggalID(fromISODate(a.tanggal))}
                  </p>
                  <p className="mt-0.5 font-medium text-ink">{a.momentum}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{a.program}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-1.5">
                    {a.waktu && <WaktuLabel waktu={a.waktu} />}
                    {a.sie !== sie.nama && <SieBadge sie={a.sie} />}
                  </p>
                </Card>
              </li>
            ))}
            {insidentilKondisional.map((a) => (
              <li key={a.id}>
                <Card className="border-dashed">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft">
                    <CalendarHeart className="h-3.5 w-3.5" aria-hidden />
                    Kondisional — {a.momentum}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.program}</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
