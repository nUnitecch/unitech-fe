"use client";

import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Loader2 } from "lucide-react";

import FormField from "@/components/Forms/FormField";
import { Button } from "@/components/ui/button";
import {
  AdminLoginFormData,
  adminLoginSchema,
} from "@/libs/validations/authSchema";
import { useAdminLogin } from "@/hooks/useAuth";
import Link from "next/link";

export default function AdminLoginPage() {
  const methods = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  const { handleSubmit } = methods;
  const { isPending, adminLogin } = useAdminLogin();

  const onSubmit = (data: AdminLoginFormData) => {
    adminLogin(data);
  };

  return (
    <div className="px-4 pt-10 sm:px-6 flex flex-col justify-center">
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo/10 text-logo mb-6 shadow-md shadow-slate-900/20 dark:bg-slate-200"
        >
          <LockKeyhole className="size-8 text-logo" />
        </motion.div>

        <h1 className="text-3xl font-black text-logo tracking-tight mb-2">
          Admin Portal
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Sign in to manage the LASU digital workspace.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              type="email"
              label="Administrative Email"
              placeholder="admin.name@lasu.edu.ng"
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

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-logo hover:bg-logo/50 dark:hover:bg-logo/90 text-white rounded-xl shadow-lg transition-all active:scale-[0.98] mt-6!"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Back-routing Context */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an admin account?{" "}
            <Link
              href="/auth/admin/signup"
              className="text-logo font-bold hover:underline ml-1"
            >
              Sign up here
            </Link>
          </p>
        </FormProvider>
      </div>
    </div>
  );
}
