"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";

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

interface DeleteConfirmModalProps {
  entry: TimetableEntry;
  saving: boolean;
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  entry,
  saving,
  error,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className="relative z-10 w-full max-w-sm bg-white rounded-[1.5rem] shadow-xl p-6"
      >
        <div className="flex gap-3">
          <div className="size-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="size-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Delete this class?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              This removes <strong>{entry.courseCode}</strong> —{" "}
              {entry.courseTitle} from {entry.day}&apos;s schedule. This
              can&apos;t be undone.
            </p>
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
