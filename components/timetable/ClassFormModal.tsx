"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Loader2, AlertTriangle } from "lucide-react";
import FormField from "./FormField";

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

type TimetablePayload = Omit<TimetableEntry, "id" | "_id">;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const LEVELS = ["100", "200", "300", "400", "500", "600"];
const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Economics",
  "Accounting",
];

interface ClassFormModalProps {
  mode: "create" | "edit";
  entry?: TimetableEntry;
  fetching?: boolean;
  defaultDepartment: string;
  defaultLevel: string;
  saving: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (payload: TimetablePayload) => void;
}

export default function ClassFormModal({
  mode,
  entry,
  fetching,
  defaultDepartment,
  defaultLevel,
  saving,
  error,
  onClose,
  onSubmit,
}: ClassFormModalProps) {
  const [form, setForm] = useState<TimetablePayload>({
    day: "Monday",
    startTime: "",
    endTime: "",
    courseCode: "",
    courseTitle: "",
    lecturer: "",
    venue: "",
    department: defaultDepartment,
    level: defaultLevel,
  });

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (entry) {
      setForm({
        day: entry.day,
        startTime: entry.startTime.slice(0, 5),
        endTime: entry.endTime.slice(0, 5),
        courseCode: entry.courseCode,
        courseTitle: entry.courseTitle,
        lecturer: entry.lecturer,
        venue: entry.venue,
        department: entry.department,
        level: entry.level,
      });
    } else {
      setForm({
        day: "Monday",
        startTime: "",
        endTime: "",
        courseCode: "",
        courseTitle: "",
        lecturer: "",
        venue: "",
        department: defaultDepartment,
        level: defaultLevel,
      });
    }
  }, [entry, defaultDepartment, defaultLevel]);

  const isValid =
    form.startTime &&
    form.endTime &&
    toMinutes(form.endTime) > toMinutes(form.startTime) &&
    form.courseCode.trim() &&
    form.courseTitle.trim() &&
    form.lecturer.trim() &&
    form.venue.trim() &&
    form.department.trim() &&
    form.level.trim();

  function set<K extends keyof TimetablePayload>(
    key: K,
    value: TimetablePayload[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit() {
    setTouched(true);
    if (!isValid) return;

    onSubmit({
      ...form,
      courseCode: form.courseCode.toUpperCase(),
      startTime:
        form.startTime.length === 5 ? `${form.startTime}:00` : form.startTime,
      endTime: form.endTime.length === 5 ? `${form.endTime}:00` : form.endTime,
    });
  }

  function toMinutes(time: string) {
    const [h, m] = (time || "0:0").split(":").map(Number);
    return h * 60 + (m || 0);
  }

  return (
    <div className="fixed inset-0 z-200 flex items-end sm:items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-[1.5rem] shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-50">
          <div>
            <h3 className="font-bold text-slate-800">
              {mode === "create" ? "Add a class" : "Edit class"}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {mode === "create"
                ? "Schedule a new class."
                : `Updating ${entry?.courseCode}.`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-50 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-400">
            <Loader2 className="size-4 animate-spin" />
            Loading class details…
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            {/* Day & Level */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Day">
                <select
                  value={form.day}
                  onChange={(e) => set("day", e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Level">
                <select
                  value={form.level}
                  onChange={(e) => set("level", e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l} Level
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {/* Time */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start time">
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => set("startTime", e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                />
              </FormField>

              <FormField
                label="End time"
                error={
                  touched &&
                  form.endTime &&
                  toMinutes(form.endTime) <= toMinutes(form.startTime)
                    ? "Must be after start time"
                    : undefined
                }
              >
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => set("endTime", e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                />
              </FormField>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Course code"
                error={
                  touched && !form.courseCode.trim() ? "Required" : undefined
                }
              >
                <input
                  value={form.courseCode}
                  onChange={(e) => set("courseCode", e.target.value)}
                  placeholder="CSC301"
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm uppercase text-slate-700 placeholder:normal-case focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                />
              </FormField>

              <FormField
                label="Course title"
                error={
                  touched && !form.courseTitle.trim() ? "Required" : undefined
                }
              >
                <input
                  value={form.courseTitle}
                  onChange={(e) => set("courseTitle", e.target.value)}
                  placeholder="Operating Systems"
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                />
              </FormField>
            </div>

            {/* Lecturer */}
            <FormField
              label="Lecturer"
              error={touched && !form.lecturer.trim() ? "Required" : undefined}
            >
              <input
                value={form.lecturer}
                onChange={(e) => set("lecturer", e.target.value)}
                placeholder="Dr. A. Bello"
                className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
              />
            </FormField>

            {/* Venue & Department */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Venue"
                error={touched && !form.venue.trim() ? "Required" : undefined}
              >
                <input
                  value={form.venue}
                  onChange={(e) => set("venue", e.target.value)}
                  placeholder="LT 1"
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                />
              </FormField>

              <FormField label="Department">
                <select
                  value={form.department}
                  onChange={(e) => set("department", e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-100 px-3 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-500">
                <AlertTriangle className="size-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={saving || !isValid}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-logo text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {mode === "create" ? "Add class" : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
