"use client";

import { useState, useEffect } from "react";
import Logo from "../Logo";
import LinkButton from "../LinkButton";
import Container from "../Container";
import { motion, AnimatePresence } from "framer-motion";

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
      className={`sticky top-0 left-0 w-full z-100 transition-all duration-300 px-4 py-4 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden hover:bg-foreground/5 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-foreground h-0.5 rounded-full origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 bg-foreground h-0.5 rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 bg-foreground h-0.5 rounded-full origin-center"
          />
        </button>

        {/* LOGO - Centered on Mobile, Left on Desktop */}
        <div className="hidden absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 sm:block">
          <Logo />
        </div>

        {/* DESKTOP NAV (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-logo transition-colors">
            Features
          </a>
          <a href="#about" className="hover:text-logo transition-colors">
            About
          </a>
          <a href="#faq" className="hover:text-logo transition-colors">
            FAQ
          </a>
        </nav>

        {/* ACTION BUTTON */}
        <LinkButton
          href="/auth/signin"
          className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95"
        >
          Sign in
        </LinkButton>
      </Container>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold border-b border-border pb-2"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold border-b border-border pb-2"
            >
              About
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold pb-2"
            >
              FAQ
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
