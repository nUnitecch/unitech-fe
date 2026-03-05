"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

// Shared Components
import { Button } from "@/components/ui/button";
import FormField from "@/components/Forms/FormField";

export default function ResetPasswordPage() {
  const [isSending, setIsSending] = useState(false);

  const methods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleEmailSubmit = async (data: any) => {
    setIsSending(true);
    // Simulate API call
  };

  return (
    <div className="flex flex-col justify-center min-h-[80vh] px-4">
      {/* Header Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo text-white shadow-lg shadow-logo/20 mb-6"
        >
          <KeyRound className="size-8" />
        </motion.div>

        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
          Secure Your Account
        </h1>
        <p className="text-muted-foreground text-sm max-w-70 mx-auto">
          Reset your new password.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleEmailSubmit)}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key="reset-step"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <FormField
                  name="password"
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                  required
                />
                <FormField
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  placeholder="••••••••"
                  required
                />
                <Button
                  className="w-full h-12 bg-logo rounded-xl font-bold"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="animate-spin" /> Reset password ...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </motion.div>
            </AnimatePresence>
          </form>
        </FormProvider>

        {/* Navigation Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-logo transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
