import type { ReactNode } from "react";

/** Judul section gaya Notion: label kecil + judul tegas. */
export function SectionHeading({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">{kicker}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 leading-relaxed text-ink-soft">{desc}</p>}
    </div>
  );
}

/** Kartu putih garis tipis ala Notion. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[10px] border border-sand bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}
