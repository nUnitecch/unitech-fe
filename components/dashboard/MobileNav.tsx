"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import { useLogout } from "@/hooks/useAuth";
import SidebarLink from "./sidebar/SidebarLink-v2";
import { sidebarItems } from "@/constants/sidebar";

interface MobileNavProps {
  sidebarItems: Array<{
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    upComing?: boolean;
  }>;
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const logout = useLogout();

  // Handle background scroll locking when drawer opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Ensure drawer closes seamlessly upon navigation transitions
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden w-full bg-logo border-b border-border sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <Logo />
      </div>

      {/* Mobile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-card hover:text-white rounded-xl border border-border bg-logo focus:outline-none cursor-pointer active:scale-95 transition-all"
        aria-label="Toggle navigation operational menu drawer container"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-18.75 bg-black/80 z-40 backdrop-blur-sm"
            />

            {/* Navigation Drawer Content Wrapper Canvas Block */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-18.75 left-0 bottom-0 w-72 bg-logo border-r border-border z-50 flex flex-col justify-between py-5 px-4"
            >
              <div className="space-y-6">
                <nav className="space-y-1.5">
                  {sidebarItems.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <SidebarLink
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        Icon={link.icon as any}
                        setIsOpen={setIsOpen}
                        upComing={link.upComing}
                        isActive={isActive}
                      />
                    );
                  })}
                </nav>
              </div>

              {/* Profile Card & Action Drawer Footer Section */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center gap-3 p-2.5 bg-card border border-border rounded-xl">
                  <div className="size-8 rounded-full bg-logo flex items-center justify-center font-bold text-xs text-white shadow-sm shadow-logo/20">
                    BH
                  </div>
                  <div className="flex flex-col text-logo">
                    <p className="text-xs font-bold leading-none">
                      Bello Hakeem
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Student Account
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:text-rose-400 text-slate-400 transition-all text-sm font-medium cursor-pointer"
                >
                  <LogOut className="size-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
                  <span>Sign Out Account</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
