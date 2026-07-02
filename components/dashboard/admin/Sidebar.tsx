"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, LogOut, Menu } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/constants/adminNav";
import { cn } from "@/libs/utils";
import Logo from "@/components/Logo";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-logo text-white border-r border-border flex flex-col h-full justify-between p-4 selection:bg-logo/30">
      {/* Upper Brand Section */}
      <div className="space-y-8">
        <div className="flex flex-col gap-3 px-2 py-3 border-b border-border">
          <Logo />
          <span className="text-[10px] text-white font-bold uppercase tracking-widest mt-0.5 block">
            Admin Console
          </span>
        </div>

        {/* Navigation Items Link Group */}
        <nav className="space-y-1.5">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all group overflow-hidden",
                  isActive
                    ? "bg-logo/50 font-bold"
                    : "text-white hover:text-logo/10",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeAdminNav"
                    className="absolute inset-0 bg-logo/90 rounded-xl -z-10 border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon
                  className={cn(
                    "size-5 transition-colors shrink-0",
                    isActive
                      ? "text-logo/50"
                      : "text-white group-hover:text-slate-400",
                  )}
                />

                <div className="flex flex-col">
                  <span className="text-sm tracking-tight">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Administrative Signout Action */}
      <div className="pt-4 border-t border-border space-y-3">
        {/* Active Operator Badge */}
        <div className="flex items-center gap-3 p-2 bg-white text-logo border border-border rounded-xl">
          <div className="size-8 rounded-full bg-logo border border-border flex items-center justify-center font-bold text-xs text-white">
            BH
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate">Bello Hakeem</p>
            <p className="text-[10px] text-logo/90 truncate">Super Admin</p>
          </div>
        </div>

        <button
          onClick={() => {
            /* Trigger your logout payload context here */
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:text-rose-400 hover:bg-rose-500/5 transition-all text-sm font-medium group cursor-pointer"
        >
          <LogOut className="size-4 text-white group-hover:text-rose-400 transition-colors" />
          <span>Exit Console</span>
        </button>
      </div>
    </aside>
  );
}
