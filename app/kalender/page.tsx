import CalendarView from "@/components/calendar/CalendarView";
import { SectionHeading } from "@/components/ui";

export const metadata = {
  title: "Kalender Kegiatan",
  description:
    "Kalender kegiatan Pesma Nur Alannur — agenda rutin mingguan/bulanan dan agenda insidentil dalam satu tampilan yang bisa difilter.",
};

export default function HalamanKalender() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading
        kicker="Kalender kegiatan"
        title="Satu kalender untuk semua agenda"
        desc="Agenda rutin (aturan berulang) dan momentum insidentil (bertanggal) digabung dalam satu tampilan. Saring berdasarkan sie atau jenis agenda."
      />
      <div className="mt-6">
        <CalendarView />
      </div>
    </div>
  );
}
