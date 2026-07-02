"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const getMailProvider = () => {
    if (email?.includes("gmail.com"))
      return { name: "Gmail", url: "https://mail.google.com" };
    if (email?.includes("outlook.com") || email?.includes("hotmail.com"))
      return { name: "Outlook", url: "https://outlook.live.com" };
    if (email?.includes("yahoo.com"))
      return { name: "Yahoo", url: "https://mail.yahoo.com" };
    return { name: "your inbox", url: "#" };
  };

  const provider = getMailProvider();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleResend = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setCanResend(false);
      setCountdown(60);
    }, 1500);
  };

  if (!email) {
    return (
      <div className="text-center pt-20">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p>We couldn't find your registration details.</p>
        <Link href="/auth/signup" className="text-logo underline">
          Go back to Signup
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-10 px-4 sm:px-6 flex flex-col items-center justify-center">
      {/* Visual Icon Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center size-20 rounded-[2rem] bg-logo/10 text-logo mb-6 shadow-xl shadow-logo/5 relative"
        >
          <Mail className="size-10" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 size-4 bg-logo rounded-full border-4 border-background"
          />
        </motion.div>

        <h1 className="text-3xl font-black tracking-tight text-foreground mb-3">
          Check your mail
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          We’ve sent a verification link to <br />
          <span className="text-foreground font-semibold">{email}</span>
        </p>
      </div>

      <div className="max-w-md mx-auto w-full space-y-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            asChild
            className="w-full h-14 bg-logo hover:bg-logo/90 text-white rounded-2xl shadow-lg shadow-logo/20 transition-all active:scale-[0.98]"
          >
            <a href={provider.url} target="_blank" rel="noopener noreferrer">
              Open {provider.name} <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/auth/signin">
            <Button
              variant="ghost"
              className="w-full h-12 rounded-xl text-muted-foreground hover:text-logo"
            >
              I've verified my account <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              Didn't get the email?
            </span>
          </div>
        </div>

        {/* Resend Logic */}
        <div className="text-center">
          <Button
            variant="outline"
            disabled={!canResend || isResending}
            onClick={handleResend}
            className="rounded-xl px-8 border-dashed border-2 hover:border-logo hover:bg-logo/5 transition-colors"
          >
            {isResending ? (
              <RefreshCw className="mr-2 size-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 size-4" />
            )}
            {canResend ? "Resend Link" : `Resend in ${countdown}s`}
          </Button>

          <p className="mt-6 text-xs text-muted-foreground leading-relaxed px-6">
            Check your spam or junk folder if you don't see it in your inbox
            within a few minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center pt-20">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
