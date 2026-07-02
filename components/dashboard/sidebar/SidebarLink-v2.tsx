"use client";

import Link from "next/link";
import { cn } from "@/libs/utils";
import { LucideIcon } from "lucide-react";

type SidebarLinkType = {
  Icon: LucideIcon;
  href: string;
  label: string;
  setIsOpen: (value: boolean) => void;
  upComing?: boolean;
  isActive?: boolean;
};

export default function SidebarLink({
  setIsOpen,
  Icon,
  href,
  label,
  upComing,
  isActive,
}: SidebarLinkType) {
  return (
    <Link
      href={upComing ? "" : href}
      onClick={() => {
        if (!upComing) setIsOpen(false);
      }}
      className={cn(
        "flex items-center gap-4 h-12 px-4 rounded-xl transition-all group relative active:scale-[0.99]",
        upComing
          ? "opacity-40 cursor-not-allowed pointer-events-none"
          : isActive
            ? "bg-white text-logo font-bold"
            : "text-card hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-5 shrink-0",
          isActive ? "text-logo" : "text-card group-hover:text-slate-600",
        )}
      />

      <span className="text-base tracking-tight text-nowrap flex-1 flex items-center justify-between">
        {label}
        {upComing && (
          <span className="text-[10px] font-black uppercase tracking-widest bg-secondary border border-border/40 text-muted-foreground px-1.5 py-0.5 rounded-md">
            Soon
          </span>
        )}
      </span>
    </Link>
  );
}
