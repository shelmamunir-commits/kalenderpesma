import { getSieColor } from "@/data/sie";

/** Tag kecil pastel sesuai sie, ala tag database Notion. */
export function SieBadge({ sie, size = "sm" }: { sie: string; size?: "xs" | "sm" }) {
  const c = getSieColor(sie);
  const pad = size === "xs" ? "px-1.5 py-px text-[11px]" : "px-2 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-[4px] font-medium ${pad}`}
      style={{ backgroundColor: c.soft, color: c.ink }}
      title={sie}
    >
      <span className="truncate">{sie}</span>
    </span>
  );
}

/** Label waktu pagi/malam — tag abu netral. */
export function WaktuLabel({ waktu }: { waktu: "pagi" | "malam" }) {
  return (
    <span className="inline-flex items-center rounded-[4px] bg-cream-dark px-2 py-0.5 text-[11px] font-medium text-ink-soft">
      {waktu === "pagi" ? "Pagi" : "Malam"}
    </span>
  );
}
