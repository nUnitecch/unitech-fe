"use client";

import {
  Users,
  CalendarDays,
  FileUp,
  ShieldAlert,
  UserPlus,
} from "lucide-react";

// Reuse your clean layout systems
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/admin/StatCard";
import RecentActivityTable from "@/components/dashboard/admin/RecentActivityTable";
import QuickControlsPanel from "@/components/dashboard/admin/QuickControlsPanel";

export default function AdminDashboardHome() {
  return (
    <div className="space-y-8 p-4 md:p-10">
      {/* Header Hero Area */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-logo text-white p-6 rounded-2xl dark:bg-slate-950">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            Administrative Control
          </h1>
          <p className="text-slate-200 text-sm mt-1">
            Platform operations, system timetables, and entity audits.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-slate-900 hover:bg-logo/90 text-white rounded-xl h-11 text-xs font-semibold px-4 cursor-pointer">
            <UserPlus className="mr-2 size-4" /> Invite New Admin
          </Button>
        </div>
      </header>

      {/* Analytical KPI Status Panel */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value="14,820"
          change="+3.2%"
          subtitle="Active student entities"
          icon={<Users className="size-5 text-logo" />}
        />
        <StatCard
          title="Timetable Blocks"
          value="184"
          change="Updated live"
          subtitle="Active institutional schedules"
          icon={<CalendarDays className="size-5 text-amber-500" />}
        />
        <StatCard
          title="Shared Materials"
          value="1,240"
          change="84.2 GB"
          subtitle="Academic uploads hosted"
          icon={<FileUp className="size-5 text-emerald-500" />}
        />
        <StatCard
          title="System Operators"
          value="8"
          change="2 Pending"
          subtitle="Privileged admin seats"
          icon={<ShieldAlert className="size-5 text-rose-500" />}
        />
      </section>

      {/* 3. Main Operational Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Core Administrative Actions & Logs */}
        <div className="lg:col-span-2 space-y-8">
          <RecentActivityTable />
        </div>

        {/* Right Column: Fast Execution Actions */}
        <div className="space-y-6">
          <QuickControlsPanel />
        </div>
      </div>
    </div>
  );
}
