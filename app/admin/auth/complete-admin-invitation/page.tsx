"use client";

import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

import FormField from "@/components/Forms/FormField";
import { Button } from "@/components/ui/button";
import {
  invitedAdminSchema,
  InvitedAdminFormData,
} from "@/libs/validations/authSchema";

export default function CompleteAdminInvitePage() {
  const searchParams = useSearchParams();
  const invitedEmail = searchParams.get("email") || "admin.user@lasu.edu.ng";

  const methods = useForm<InvitedAdminFormData>({
    resolver: zodResolver(invitedAdminSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: InvitedAdminFormData) => {
    console.log({ ...data, email: invitedEmail });
  };

  return (
    <div className="px-4 pt-10 sm:px-6 flex flex-col justify-center">
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo/10 text-logo mb-6 shadow-md shadow-logo/40"
        >
          <ShieldCheck className="size-8" />
        </motion.div>
        <h1 className="text-3xl font-black tracking-tight text-logo mb-2">
          Complete Setup
        </h1>
        <p className="text-muted-foreground text-sm">
          Configure your operational profile options to complete access
          activation.
        </p>
      </div>

      <div className="max-w-md mx-auto w-full">
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border flex flex-col gap-1">
          <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
            Invited Account
          </span>
          <span className="text-sm font-semibold text-foreground/80 break-all">
            {invitedEmail}
          </span>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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

            <FormField
              name="phoneNumber"
              type="tel"
              label="Phone Number"
              placeholder="+234 80 1234 5678"
              required
            />

            <FormField
              name="password"
              type="password"
              label="Create Secure Password"
              placeholder="••••••••"
              showPasswordIcon={true}
              required
            />

            <Button
              type="submit"
              className="w-full h-11 bg-logo hover:bg-logo/50 text-white font-semibold rounded-xl mt-6 shadow-md transition-all"
            >
              Activate Profile Settings
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
