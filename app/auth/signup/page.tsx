"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
// Components
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import PersonalForm from "./PersonalForm";
import AcademicForm from "./AcademicForm";
import ContactForm from "./ContactForm";
import SecurityForm from "./SecurityForm";
// Data & Hooks
import { mapSignupToApi } from "@/lib/api/mapper";
import { useStudentRegistration } from "@/hooks/useAuth";
import { SignupFormData, signupSchema } from "@/lib/schemas/authSchema";
import { currentStepFields } from "@/constants/signupFields";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { isPending, register } = useStudentRegistration();

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    shouldUnregister: false,
    mode: "onChange",
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const fields =
      currentStepFields[currentStep as keyof typeof currentStepFields];
    const isValid = await trigger(fields as any);
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: SignupFormData) => {
    console.log("data before map", data);
    const apiPayload = mapSignupToApi(data);
    console.log("data after mapped", apiPayload);
    register(apiPayload);
  };

  return (
    <div className="py-10 px-4 sm:px-6 flex flex-col justify-center">
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center size-16 rounded-3xl bg-logo text-white shadow-lg shadow-logo/20 mb-6"
        >
          <GraduationCap className="size-8" />
        </motion.div>
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground mb-8">
          Join the LASU digital community
        </p>

        <ProgressBar currentStep={currentStep} />
      </div>
      {/* Form Section */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 mb-10"
            >
              {currentStep === 1 && <PersonalForm />}
              {currentStep === 2 && <AcademicForm />}
              {currentStep === 3 && <ContactForm />}
              {currentStep === 4 && <SecurityForm />}
            </motion.div>
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-between gap-4 border-t border-border/20 pt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 h-11 rounded-xl"
              >
                <ArrowLeft className="mr-2 size-4" /> Back
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 h-11 rounded-xl bg-logo hover:bg-logo/90 transition-all"
              >
                Continue <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 h-11 rounded-xl bg-logo"
              >
                {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {isPending ? "Creating..." : "Submit"}
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-logo font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
