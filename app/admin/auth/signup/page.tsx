"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Shared Architecture Components
import FormField from "@/components/Forms/FormField";
import { Button } from "@/components/ui/button";
import {
  adminRegistrationSchema,
  AdminRegistrationFormData,
} from "@/libs/validations/authSchema";
import { useAdminRegistration } from "@/hooks/useAuth";

export default function AdminSignupPage() {
  const methods = useForm<AdminRegistrationFormData>({
    resolver: zodResolver(adminRegistrationSchema),
    mode: "onBlur",
  });

  const { handleSubmit } = methods;
  const { isPending, registerAdminMutate } = useAdminRegistration();

  const onSubmit = (data: AdminRegistrationFormData) => {
    registerAdminMutate(data);
  };

  return (
    <div className="pt-10 pb-5 px-4 sm:px-6 flex flex-col justify-center">
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo/10 text-logo mb-6 shadow-md shadow-slate-900/20 dark:bg-slate-200"
        >
          <ShieldCheck className="size-8 text-logo" />
        </motion.div>

        <h1 className="text-3xl font-black text-logo tracking-tight mb-2">
          Admin Sign Up
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Create an administrator account
        </p>
      </div>
      {/* Form Workspace */}
      <div className="max-w-xl mx-auto w-full">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-6"
          >
            <motion.div
              className="space-y-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Identity Section (Side-by-Side Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  name="firstName"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  required
                />
                <FormField
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  required
                />
              </div>

              {/* Communication Elements */}
              <FormField
                name="email"
                type="email"
                label="Official Admin Email"
                placeholder="J.Doe@lasu.edu.ng"
                required
              />

              <FormField
                name="phoneNumber"
                type="tel"
                label="Mobile Contact Line"
                placeholder="+234 80 1234 ****"
                required
              />

              {/* Security Anchor */}
              <FormField
                name="password"
                type="password"
                label="Access Password"
                placeholder="••••••••"
                required
                showPasswordIcon={true}
              />
            </motion.div>

            {/* Form Actions */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-logo hover:bg-logo/50 dark:hover:bg-logo/90 text-white rounded-xl shadow-lg transition-all active:scale-[0.98] mt-6!"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 size-5" />
                  Provisioning System Profile...
                </>
              ) : (
                <>
                  Register Admin Account <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
            {/* <div className="border-t border-border/20 pt-6"></div> */}

            {/* Back-routing Context */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already possess admin rights?{" "}
              <Link
                href="/admin/auth/login"
                className="text-logo font-bold hover:underline ml-1"
              >
                Sign in to console
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
