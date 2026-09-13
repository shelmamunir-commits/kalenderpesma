import { Card, SectionHeading } from "@/components/ui";
import { AccordionItem } from "@/components/StrukturAccordion";
import { DIVISI, PEMBIMBING, PENGASUH, PENGURUS_INTI, PERIODE, TUPOKSI_INTI } from "@/data/struktur";
import { ArrowDown, Crown, Users } from "lucide-react";

export const metadata = {
  title: "Struktur Organisasi",
  description:
    "Struktur kepengurusan, susunan personalia, dan tugas pokok & fungsi (tupoksi) Pengurus Pesma Nur Alannur periode 2025/2026.",
};

function OrgCard({
  label,
  name,
  extra,
}: {
  label: string;
  name: string;
  extra?: string;
}) {
  return (
    <div className="rounded-[10px] border border-sand bg-white px-4 py-3 text-center">
      <p className="text-[11px] font-medium uppercase tracking-wider text-ink-soft">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{name}</p>
      {extra && <p className="mt-0.5 text-xs text-ink-soft">{extra}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center py-1.5 text-sand" aria-hidden>
      <ArrowDown className="h-4 w-4 text-ink-soft/60" />
    </div>
  );
}

export default function HalamanStruktur() {
  const ketua = PENGURUS_INTI.find((p) => p.jabatan === "Ketua")!;
  const sekretaris = PENGURUS_INTI.find((p) => p.jabatan === "Sekretaris")!;
  const bendahara = PENGURUS_INTI.find((p) => p.jabatan === "Bendahara")!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
          Periode {PERIODE}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Struktur & Tupoksi Pengurus
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Hierarki, susunan personalia, dan tugas pokok & fungsi seluruh pengurus
          Pesma Nur Alannur.
        </p>
      </div>

      {/* Org Chart */}
      <section className="mx-auto mt-10 max-w-3xl" aria-label="Diagram organisasi">
        <SectionHeading
          kicker="Hierarki"
          title="Struktur kepengurusan"
          desc="Alur komando dari Pengasuh hingga Santri."
        />

        <div className="mt-6">
          <OrgCard label="Pengasuh" name={PENGASUH.nama} />
          <Arrow />

          <div className="rounded-[10px] border border-sand bg-white px-4 py-3">
            <p className="text-center text-[11px] font-medium uppercase tracking-wider text-ink-soft">
              Pembimbing
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {PEMBIMBING.map((p) => (
                <div
                  key={p.nama}
                  className="rounded-md bg-cream-dark/50 px-3 py-2 text-center text-sm font-medium text-ink"
                >
                  {p.nama}
                </div>
              ))}
            </div>
          </div>
          <Arrow />

          <OrgCard label="Ketua" name={ketua.nama} extra={ketua.keterangan} />
          <Arrow />

          <div className="grid gap-3 sm:grid-cols-2">
            <OrgCard label="Sekretaris" name={sekretaris.nama} extra={sekretaris.keterangan} />
            <OrgCard label="Bendahara" name={bendahara.nama} extra={bendahara.keterangan} />
          </div>
          <Arrow />

          <div className="rounded-[10px] border border-sand bg-white p-4">
            <p className="text-center text-xs font-semibold text-ink">
              Divisi — 7 Bidang
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {DIVISI.map((d) => (
                <div
                  key={d.slug}
                  className="rounded-md border border-sand bg-cream-dark/30 px-3 py-2.5"
                >
                  <p className="text-sm font-medium text-ink">{d.nama}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {d.anggota.length} anggota · {d.tupoksi.length} tupoksi
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Arrow />

          <div className="rounded-[10px] border border-dashed border-sand bg-cream-dark/30 px-4 py-4 text-center">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Users className="h-4 w-4 text-ink-soft" aria-hidden />
              Santri
            </p>
            <p className="mt-1 text-xs text-ink-soft">Seluruh santriwati Pesma Nur Alannur</p>
          </div>
        </div>
      </section>

      {/* Personalia */}
      <section className="mt-12" aria-label="Susunan personalia">
        <SectionHeading
          kicker="Personalia"
          title="Susunan pengurus"
          desc="Daftar nama pengurus inti dan anggota tiap divisi periode 2025/2026."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Crown className="h-4 w-4 text-ink-soft" aria-hidden />
              Pengurus Inti
            </h3>
            <dl className="mt-3 space-y-2">
              <div className="flex justify-between gap-2 border-b border-sand py-2 text-sm">
                <dt className="text-ink-soft">Pengasuh</dt>
                <dd className="text-right font-medium text-ink">{PENGASUH.nama}</dd>
              </div>
              <div className="border-b border-sand py-2">
                <dt className="text-xs uppercase tracking-wider text-ink-soft">Pembimbing</dt>
                <dd className="mt-1 text-sm text-ink">{PEMBIMBING.map((p) => p.nama).join(" · ")}</dd>
              </div>
              {PENGURUS_INTI.map((p) => (
                <div key={p.jabatan} className="flex justify-between gap-2 border-b border-sand py-2 text-sm last:border-0">
                  <dt className="text-ink-soft">{p.jabatan}</dt>
                  <dd className="text-right font-medium text-ink">
                    {p.nama} <span className="font-normal text-ink-soft">· {p.keterangan}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          {DIVISI.map((d) => (
            <Card key={d.slug}>
              <h3 className="text-sm font-semibold text-ink">{d.nama}</h3>
              <p className="mt-0.5 text-xs text-ink-soft">{d.anggota.length} anggota</p>
              <ul className="mt-3 space-y-1">
                {d.anggota.map((nama) => (
                  <li key={nama} className="flex items-start gap-2 text-sm text-ink">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-sand" aria-hidden />
                    {nama}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Tupoksi */}
      <section className="mt-12" aria-label="Tugas pokok dan fungsi">
        <SectionHeading
          kicker="Tupoksi"
          title="Tugas pokok & fungsi"
          desc="Rincian tanggung jawab tiap jabatan. Klik untuk membuka detail — dirancang ringkas agar nyaman dibaca di HP."
        />

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-ink">Pengurus Inti</h3>
            <div className="grid gap-2">
              {Object.entries(TUPOKSI_INTI).map(([jabatan, daftar]) => (
                <AccordionItem key={jabatan} title={jabatan} subtitle={`${daftar.length} poin`}>
                  <ul className="space-y-1.5">
                    {daftar.map((poin, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/40" aria-hidden />
                        {poin}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-ink">Divisi</h3>
            <div className="grid gap-2">
              {DIVISI.map((d) => (
                <AccordionItem
                  key={d.slug}
                  title={d.nama}
                  subtitle={`${d.anggota.length} anggota · ${d.tupoksi.length} tupoksi`}
                >
                  <ul className="space-y-1.5">
                    {d.tupoksi.map((poin, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/40" aria-hidden />
                        {poin}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
