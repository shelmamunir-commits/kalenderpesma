"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function AccordionItem({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-[10px] border border-sand bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="block text-sm font-semibold text-ink">{title}</span>
          {subtitle && <span className="block text-xs text-ink-soft">{subtitle}</span>}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-sand bg-cream-dark/40 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      {open && <div className="border-t border-sand px-4 py-3">{children}</div>}
    </div>
  );
}
