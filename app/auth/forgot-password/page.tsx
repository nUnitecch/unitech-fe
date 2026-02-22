"use client";

import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import EmailForm from "./_components/EmailForm";
// import ResetForm from "./_components/ResetForm";

type ResetStep = "EMAIL" | "OTP_AND_PASSWORD";

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<ResetStep>("EMAIL");
  const methods = useForm({ defaultValues: {} });

  return (
    <div className="w-[95%] mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-5">
          <div className="border size-15 rounded-full p-2 btn-primary">
            <KeyRound className="size-full" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold my-3">Reset Password</h1>
        <p className="text-[18px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      {/* {currentStep === "EMAIL" ? (
        <EmailForm methods={methods} changeCurrentStep={setCurrentStep} />
      ) : (
        <ResetForm methods={methods} />
      )} */}
    </div>
  );
}
