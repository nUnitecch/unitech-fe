"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { ADMIN_NAV_ITEMS } from "@/constants/adminNav";
import { cn } from "@/libs/utils";
import Logo from "@/components/Logo";

export default function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when navigation panel drawer is active
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

  // Autoclose navigation panel container when user performs a route action transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden w-full bg-logo border-b border-border sticky top-0 z-50 px-4 py-4 flex items-center justify-between">
      {/* Brand Identity Lockup */}
      <div className="flex flex-col gap-2">
        <Logo />
        {/* <span className="text-[9px] text-white font-bold uppercase tracking-wider block -mt-0.5">
          Admin
        </span> */}
      </div>

      {/* Mobile Trigger Activation Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white rounded-sm border border-border focus:outline-none cursor-pointer"
        aria-label="Toggle navigation operational menu drawer container"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Slide-out Drawer Panel Menu Container Overlay View */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Shadow layer element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-18.5 bg-black/60 z-40 backdrop-blur-sm"
            />

            {/* Navigation Drawer Content Wrapper Canvas Block */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-18.5 left-0 bottom-0 w-72 bg-logo border-r border-border z-50 flex flex-col justify-between py-5 px-4"
            >
              <div className="space-y-6">
                <nav className="space-y-1">
                  {ADMIN_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all relative",
                          isActive
                            ? "text-logo font-bold bg-white"
                            : "text-white",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5 shrink-0",
                            isActive ? "text-logo" : "text-white",
                          )}
                        />
                        <span className="text-sm tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Identity Drawer Footer Viewport Container Section */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center gap-3 p-2.5 bg-white text-logo border border-border rounded-xl">
                  <div className="size-8 rounded-full bg-logo flex items-center justify-center font-bold text-xs text-white">
                    BH
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-none">
                      Bello Hakeem
                    </p>
                    <p className="text-[10px] text-logo/90 mt-1">
                      Super Admin Account
                    </p>
                  </div>
                </div>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:text-rose-400 transition-all text-sm font-medium cursor-pointer text-white">
                  <LogOut className="size-4 " />
                  <span>Exit System Console</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
