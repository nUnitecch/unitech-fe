"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LogOut } from "lucide-react";
// Shared Architecture Components
import { sidebarItems } from "@/constants/sidebar";
import { cn } from "@/libs/utils";
import Logo from "../../Logo";
import { useLogout } from "@/hooks/useAuth";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 280 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="relative hidden h-full md:flex flex-col border-r border-border bg-logo selection:bg-logo/20 overflow-hidden"
    >
      {/* Upper Branding Container */}
      <div className="h-16 flex items-center px-6 overflow-hidden border-b border-border shrink-0">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.span
              key="short"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-black text-card text-2xl mx-auto"
            >
              L.
            </motion.span>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Logo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden pt-4 custom-scrollbar">
        {sidebarItems.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.upComing ? "" : link.href}
              className={cn(
                "flex items-center h-12 px-3.5 rounded-xl transition-all group relative overflow-visible",
                link.upComing
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : isActive
                    ? "text-logo font-bold bg-card"
                    : "text-card hover:bg-secondary hover:text-foreground",
              )}
            >
              {isActive && !link.upComing && (
                <motion.div
                  layoutId="activeStudentNav"
                  className="absolute inset-0 bg-logo/10 rounded-xl -z-10 border-l-4 border-logo"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                className={cn(
                  "size-5 min-w-5 transition-colors shrink-0",
                  isActive && !link.upComing
                    ? "text-logo"
                    : "text-white group-hover:text-slate-600",
                )}
              />

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 text-sm tracking-tight whitespace-nowrap flex-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.upComing && (
                    <span className="text-[10px] bg-secondary text-muted-foreground font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border border-border/40">
                      Soon
                    </span>
                  )}
                </motion.span>
              )}

              {/* Collapsed Dynamic Micro Hover Tooltip Panel */}
              {isCollapsed && (
                <div className="absolute left-16 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all bg-slate-950 dark:bg-slate-900 text-white dark:text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-xl whitespace-nowrap z-50 shadow-xl border border-slate-800">
                  {link.label}
                  {link.upComing && " (Soon)"}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Control Actions Panel Drawer Footer */}
      <div className="p-3 border-t border-border space-y-1 bg-logo shrink-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-11 rounded-xl flex items-center px-3.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all cursor-pointer group"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="size-5 flex items-center justify-center shrink-0"
          >
            <MdKeyboardDoubleArrowLeft className="size-5 text-white group-hover:text-logo transition-colors" />
          </motion.div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 text-xs font-semibold tracking-wide uppercase text-white group-hover:text-logo"
            >
              Collapse
            </motion.span>
          )}
        </button>

        <button
          onClick={logout}
          className="w-full h-11 rounded-xl flex items-center px-3.5 hover:bg-rose-500/5 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer group text-white"
        >
          <div className="size-5 flex items-center justify-center shrink-0">
            <LogOut className="size-4 group-hover:text-rose-500 transition-colors" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-4 text-sm font-medium tracking-tight"
            >
              Sign Out Account
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
