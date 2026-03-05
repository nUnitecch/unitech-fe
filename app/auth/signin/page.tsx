"use client";

import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, Loader2 } from "lucide-react";
import Link from "next/link";

import FormField from "@/components/Forms/FormField";
import { Button } from "@/components/ui/button";
import { SigninFormData, signinSchema } from "@/lib/schemas/authSchema";
import { useStudentLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const methods = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const { isPending, login } = useStudentLogin();

  const onSubmit = (data: SigninFormData) => {
    login(data);
  };

  return (
    <div className="px-4 pt-10 sm:px-6 flex flex-col justify-center">
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo text-white mb-6 shadow-lg shadow-logo/20"
        >
          <UserRound className="size-8" />
        </motion.div>

        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Sign in to continue your academic journey!
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-md mx-auto w-full">
        <FormProvider {...methods}>
          <form className="relative" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              className="space-y-4 mb-10"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FormField
                name="email"
                type="email"
                label="Student Email"
                placeholder="johndoe@example.com"
                required
              />
              <div className="relative">
                <FormField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  required
                  showPasswordIcon={true}
                />
                <Link
                  className="absolute top-0 right-0 text-logo text-xs font-bold hover:underline"
                  href="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-logo hover:bg-logo/90 text-white rounded-xl shadow-lg shadow-logo/20 transition-all active:scale-[0.98] mb-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  New to LASU App?
                </span>
              </div>
            </div>

            <Link href="/auth/signup" className="block">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-border hover:bg-secondary"
              >
                Create a Student Account
              </Button>
            </Link>
          </form>
        </FormProvider>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        By signing in, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
