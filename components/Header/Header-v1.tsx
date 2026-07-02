"use client";

import { useState, useEffect } from "react";
import Logo from "../Logo";
import LinkButton from "../LinkButton";
import Container from "../Container";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 border-b px-4 py-3 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md border-slate-900 shadow-md shadow-black/20"
          : "bg-slate-950 border-slate-900/60"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* MOBILE MENU TRIGGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden hover:bg-slate-900 rounded-lg transition-colors border border-transparent active:border-slate-800 focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-slate-200 h-0.5 rounded-full origin-center"
          />
          <motion.span
            animate={
              isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }
            }
            className="block w-6 bg-slate-200 h-0.5 rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-slate-200 h-0.5 rounded-full origin-center"
          />
        </button>

        {/* BRAND LOGO IDENTITY - Centered on Mobile Layouts */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2">
          <Logo />
        </div>

        {/* DESKTOP NAVIGATION MATRIX */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link
            href="/dashboard"
            className="hover:text-logo transition-colors py-1"
          >
            Student Space
          </Link>
          <Link
            href="/admin"
            className="hover:text-logo transition-colors py-1 flex items-center gap-1.5"
          >
            <ShieldAlert className="size-3.5 text-logo" /> Console
          </Link>
          <a
            href="#features"
            className="hover:text-slate-200 transition-colors py-1"
          >
            Features
          </a>
          <a
            href="#about"
            className="hover:text-slate-200 transition-colors py-1"
          >
            About
          </a>
        </nav>

        {/* PRIMARY CALL TO ACTION BUTTON */}
        <LinkButton
          href="/auth/signin"
          className="bg-logo hover:bg-logo/90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-logo/10 active:scale-[0.97]"
        >
          Sign In
        </LinkButton>
      </Container>

      {/* MOBILE EXPANDABLE OVERLAY PANEL DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-slate-950 border-b border-slate-900 p-5 flex flex-col gap-3.5 md:hidden shadow-2xl z-40"
          >
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest px-1">
              Gateway Navigations
            </span>

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-logo border-b border-slate-900 pb-2.5 px-1"
            >
              Student Space
            </Link>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-logo border-b border-slate-900 pb-2.5 px-1 flex items-center justify-between group"
            >
              <span>Administrative Operations</span>
              <ShieldAlert className="size-4 text-logo opacity-60 group-hover:opacity-100" />
            </Link>

            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-400 hover:text-slate-200 border-b border-slate-900 pb-2.5 px-1"
            >
              Platform Features
            </a>

            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold text-slate-400 hover:text-slate-200 px-1 pt-0.5"
            >
              About Systems
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
