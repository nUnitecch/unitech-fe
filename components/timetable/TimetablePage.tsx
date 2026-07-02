"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useStudentData } from "@/contexts/studentContext";
import TimetableList from "./TimetableList";
import ClassFormModal from "./ClassFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

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

const LIMIT = 8;

function getId(entry: TimetableEntry) {
  return entry.id ?? entry._id ?? "";
}

function toMinutes(time: string) {
  const [h, m] = (time || "0:0").split(":").map(Number);
  return h * 60 + (m || 0);
}

// API Layer
const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://unitech-be.onrender.com/api/v1"
).replace(/\/+$/, "");
const RESOURCE = process.env.NEXT_PUBLIC_TIMETABLE_PATH ?? "/time-table";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Couldn't reach the timetable service. Check your connection.",
      0,
    );
  }
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.clone().json();
      message = body?.message || body?.error || message;
    } catch {}
    throw new ApiError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function unwrapList(body: any): { items: TimetableEntry[]; total?: number } {
  if (Array.isArray(body)) return { items: body };
  if (Array.isArray(body?.data))
    return { items: body.data, total: body.total ?? body.count };
  if (Array.isArray(body?.results))
    return { items: body.results, total: body.total ?? body.count };
  return { items: [] };
}

function unwrapOne(body: any): TimetableEntry {
  return body?.data ?? body;
}

const timetableApi = {
  list: (department: string, level: string, page: number, limit: number) =>
    request<any>(
      `${RESOURCE}/${encodeURIComponent(department)}/${encodeURIComponent(level)}?page=${page}&limit=${limit}`,
    ).then(unwrapList),
  getOne: (id: string) => request<any>(`${RESOURCE}/${id}`).then(unwrapOne),
  create: (payload: TimetablePayload) =>
    request<any>(RESOURCE, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(unwrapOne),
  update: (id: string, payload: TimetablePayload) =>
    request<any>(`${RESOURCE}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }).then(unwrapOne),
  remove: (id: string) =>
    request<void>(`${RESOURCE}/${id}`, { method: "DELETE" }),
};

export default function TimetablePage() {
  const { studentData } = useStudentData?.() ?? ({} as any);
  const isAdmin = true;

  const [department, setDepartment] = useState(
    studentData?.department || DEPARTMENTS[0],
  );
  const [level, setLevel] = useState(studentData?.level || LEVELS[0]);
  const [page, setPage] = useState(1);

  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<
    | { type: "closed" }
    | { type: "create" }
    | { type: "edit"; entry: TimetableEntry; fetching: boolean }
    | { type: "delete"; entry: TimetableEntry }
  >({ type: "closed" });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items, total } = await timetableApi.list(
        department,
        level,
        page,
        LIMIT,
      );
      setEntries(
        items.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)),
      );
      setTotal(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [department, level, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [department, level]);

  async function openEdit(entry: TimetableEntry) {
    setModal({ type: "edit", entry, fetching: true });
    try {
      const fresh = await timetableApi.getOne(getId(entry));
      setModal({
        type: "edit",
        entry: { ...entry, ...fresh },
        fetching: false,
      });
    } catch {
      setModal({ type: "edit", entry, fetching: false });
    }
  }

  async function handleSubmit(payload: TimetablePayload) {
    setSaving(true);
    setFormError(null);
    try {
      if (modal.type === "edit") {
        await timetableApi.update(getId(modal.entry), payload);
      } else {
        await timetableApi.create(payload);
      }
      setModal({ type: "closed" });
      load();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Couldn't save this class.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (modal.type !== "delete") return;
    setSaving(true);
    try {
      await timetableApi.remove(getId(modal.entry));
      setModal({ type: "closed" });
      load();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Couldn't delete this class.",
      );
    } finally {
      setSaving(false);
    }
  }

  const now = new Date();
  const today = now.toLocaleDateString("en-US", { weekday: "long" });
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="pb-10 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Timetable</h2>
          <p className="text-sm text-slate-500">
            {isAdmin
              ? "Manage the class schedule by department and level"
              : "Your class schedule for the week"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-white border border-slate-100 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l} Level
              </option>
            ))}
          </select>

          {isAdmin && (
            <button
              onClick={() => setModal({ type: "create" })}
              className="flex items-center gap-1.5 bg-logo text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="size-4" />
              Add class
            </button>
          )}
        </div>
      </div>

      <TimetableList
        entries={entries}
        loading={loading}
        error={error}
        department={department}
        level={level}
        isAdmin={isAdmin}
        today={today}
        nowMinutes={nowMinutes}
        onEdit={openEdit}
        onDelete={(entry) => setModal({ type: "delete", entry })}
      />

      {/* Pagination */}
      {!loading && !error && entries.length > 0 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-xs text-slate-400">
            Page {page}
            {total ? ` of ${Math.max(1, Math.ceil(total / LIMIT))}` : ""}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 text-sm font-semibold text-slate-500 bg-white border border-slate-100 rounded-lg px-3 py-1.5 disabled:opacity-40 hover:border-logo/20 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={
                entries.length < LIMIT ||
                (total ? page * LIMIT >= total : false)
              }
              className="flex items-center gap-1 text-sm font-semibold text-slate-500 bg-white border border-slate-100 rounded-lg px-3 py-1.5 disabled:opacity-40 hover:border-logo/20 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* <ClassFormModal
        mode={modal.type === "create" ? "create" : "edit"}
        entry={modal.type === "edit" ? modal.entry : undefined}
        fetching={modal.type === "edit" ? modal.fetching : false}
        defaultDepartment={department}
        defaultLevel={level}
        saving={saving}
        error={formError}
        onClose={() => {
          setModal({ type: "closed" });
          setFormError(null);
        }}
        onSubmit={handleSubmit}
      /> */}

      {(modal.type === "create" || modal.type === "edit") && (
        <ClassFormModal
          mode={modal.type}
          entry={modal.type === "edit" ? modal.entry : undefined}
          fetching={modal.type === "edit" ? modal.fetching : false}
          defaultDepartment={department}
          defaultLevel={level}
          saving={saving}
          error={formError}
          onClose={() => {
            setModal({ type: "closed" });
            setFormError(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      <DeleteConfirmModal
        entry={modal.type === "delete" ? modal.entry : ({} as TimetableEntry)}
        saving={saving}
        error={formError}
        isOpen={modal.type === "delete"}
        onClose={() => {
          setModal({ type: "closed" });
          setFormError(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
