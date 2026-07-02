"use client";

import { FiBell, FiMenu, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";
import { User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname().split("/").at(-1);

  return (
    <header
      className={`sticky top-0 left-0 w-full bg-logo z-100 transition-all duration-300 shadow-2xs`}
    >
      <div className="hidden md:flex items-center justify-between flex-1 p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-transparent rounded-xs p-0.5 md:hidden text-white"
        >
          <FiMenu className="size-6" />
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-card">
          <h4 className="font-semibold">Student {pathname}</h4>
        </div>
        {/* Notification form */}
        <div className="right-icons flex items-center gap-5 text-white">
          <FiBell className="size-6" />
          <div className="size-10 border rounded-full flex items-center justify-center bg-logo text-background">
            <User2 />
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <MobileNav />
    </header>
  );
}
