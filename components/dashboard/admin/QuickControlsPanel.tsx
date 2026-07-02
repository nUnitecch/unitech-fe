import { ArrowUpRight } from "lucide-react";

export default function QuickControlsPanel() {
  return (
    <div className="bg-background border border-border/10 rounded-xl shadow-sm p-5 space-y-4">
      <div>
        <h3 className="font-bold text-base text-foreground">
          Operational Triggers
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fast-track pathways for everyday maintenance tasks.
        </p>
      </div>

      <div className="space-y-2">
        <QuickActionButton
          title="Create Timetable Entry"
          description="POST /api/v1/time-table"
          color="border-amber-500/20 hover:bg-amber-500/5 text-amber-600"
        />
        <QuickActionButton
          title="Upload Resource Asset"
          description="POST /api/v1/resource/upload"
          color="border-emerald-500/20 hover:bg-emerald-500/5 text-emerald-600"
        />
        <QuickActionButton
          title="Deactivate Admin Member"
          description="PATCH /api/v1/admin/{id}/deactivate"
          color="border-rose-500/20 hover:bg-rose-500/5 text-rose-600"
        />
      </div>
    </div>
  );
}

function QuickActionButton({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) {
  return (
    <button
      className={`w-full text-left p-3.5 border rounded-xl flex items-center justify-between group transition-all cursor-pointer ${color}`}
    >
      <div>
        <div className="font-bold text-sm tracking-tight">{title}</div>
        <div className="text-[10px] font-mono opacity-80 mt-0.5">
          {description}
        </div>
      </div>
      <ArrowUpRight className="size-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </button>
  );
}
