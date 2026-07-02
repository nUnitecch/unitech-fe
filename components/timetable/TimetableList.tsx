import { motion } from "framer-motion";
import {
  CalendarX2,
  AlertTriangle,
  Loader2,
  Pencil,
  Trash2,
  MapPin,
} from "lucide-react";
import { cn } from "@/libs/utils";

interface TimetableEntry {
  id?: string;
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  venue: string;
  department: string;
  level: string;
}

interface TimetableListProps {
  entries: TimetableEntry[];
  loading: boolean;
  error: string | null;
  department: string;
  level: string;
  isAdmin: boolean;
  today: string;
  nowMinutes: number;
  onEdit: (entry: TimetableEntry) => void;
  onDelete: (entry: TimetableEntry) => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function formatLabel(time: string) {
  if (!time) return "";
  const [hStr, mStr] = time.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${mStr} ${period}`;
}

function toMinutes(time: string) {
  const [h, m] = (time || "0:0").split(":").map(Number);
  return h * 60 + (m || 0);
}

export default function TimetableList({
  entries,
  loading,
  error,
  department,
  level,
  isAdmin,
  today,
  nowMinutes,
  onEdit,
  onDelete,
}: TimetableListProps) {
  const grouped = DAYS.reduce(
    (acc, day) => {
      acc[day] = entries.filter((e) => e.day === day);
      return acc;
    },
    {} as Record<string, TimetableEntry[]>,
  );

  if (loading) {
    return (
      <div className="bg-white border border-slate-100 rounded-[1.5rem] shadow-sm min-h-40 flex items-center justify-center gap-2 py-16 text-sm text-slate-400">
        <Loader2 className="size-4 animate-spin" />
        Loading timetable…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-100 rounded-[1.5rem] shadow-sm min-h-40 flex flex-col items-center text-center py-16 px-6">
        <div className="size-12 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center mb-3">
          <AlertTriangle className="size-6" />
        </div>
        {/* <p className="font-bold text-slate-700 text-sm">
          Couldn&apos;t load the timetable
        </p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-semibold text-logo bg-logo/5 px-4 py-2 rounded-lg hover:bg-logo/10 transition-colors"
        >
          Try again
        </button> */}
        <p className="font-bold text-slate-700 text-sm">
          No timetable available yet
        </p>

        <p className="text-xs text-slate-400 mt-1">
          There is no timetable for {department} • {level} Level yet.
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-[1.5rem] shadow-sm min-h-40 flex flex-col items-center text-center py-16 px-6">
        <div className="size-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mb-3">
          <CalendarX2 className="size-6" />
        </div>
        <p className="font-bold text-slate-700 text-sm">No classes found</p>
        <p className="text-xs text-slate-400 mt-1">
          {department} · {level} Level has nothing scheduled yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-[1.5rem] shadow-sm overflow-hidden">
      <div className="divide-y divide-slate-50">
        {Object.entries(grouped).map(([day, list]) => {
          if (list.length === 0) return null;
          return (
            <div key={day}>
              <div className="px-4 sm:px-6 pt-4 pb-1 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {day}
                </span>
                {day === today && (
                  <span className="text-[9px] font-black text-logo uppercase bg-logo/10 px-1.5 py-0.5 rounded-md">
                    Today
                  </span>
                )}
              </div>

              {list.map((entry) => {
                const isLive =
                  day === today &&
                  nowMinutes >= toMinutes(entry.startTime) &&
                  nowMinutes < toMinutes(entry.endTime);
                return (
                  <motion.div
                    key={getId(entry) || entry.courseCode + entry.startTime}
                    whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                    className={cn(
                      "group flex items-center px-4 py-4 sm:px-6 transition-all",
                      isLive && "bg-logo/5",
                    )}
                  >
                    <div className="flex flex-col items-center justify-center text-center min-w-20 border-r border-slate-100 pr-4 mr-4">
                      <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                        {formatLabel(entry.startTime)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {formatLabel(entry.endTime)}
                      </span>
                      {isLive && (
                        <span className="mt-1 text-[9px] font-black text-logo uppercase animate-pulse">
                          Live
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-bold text-slate-700 truncate text-sm md:text-base mb-1">
                        {entry.courseTitle}
                      </h4>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                          {entry.courseCode}
                        </span>
                        <span className="text-slate-400 text-xs truncate max-w-32 sm:max-w-none">
                          {entry.lecturer}
                        </span>
                        <span className="text-[10px] font-medium text-slate-300">
                          •
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <MapPin size={12} />
                          {entry.venue}
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onEdit(entry)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-logo hover:text-white transition-all shadow-sm active:scale-90"
                          title="Edit class"
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(entry)}
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                          title="Delete class"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getId(entry: TimetableEntry) {
  return entry.id ?? entry._id ?? "";
}
