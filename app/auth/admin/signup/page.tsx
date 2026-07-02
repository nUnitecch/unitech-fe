// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { UserPlus, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
// import { cn } from "@/libs/utils";

// interface SignupForm {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
// }

// export default function AdminSignupPage() {
//   const [form, setForm] = useState<SignupForm>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/admin/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Signup failed");

//       setSuccess(true);
//       // Optionally redirect after success
//       // router.push("/admin/login");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-[1.5rem] overflow-hidden"
//         >
//           {/* Header */}
//           <div className="px-8 pt-8 pb-6 text-center">
//             <div className="mx-auto size-16 rounded-2xl bg-logo/10 flex items-center justify-center mb-4">
//               <UserPlus className="size-8 text-logo" />
//             </div>
//             <h1 className="text-2xl font-bold text-slate-800">Admin Sign Up</h1>
//             <p className="text-slate-500 mt-1">
//               Create an administrator account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 space-y-5">
//             <div className="grid grid-cols-2 gap-4">
//               <FormField label="First Name">
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-11 rounded-xl border border-slate-100 px-4 text-sm focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
//                   placeholder="John"
//                 />
//               </FormField>

//               <FormField label="Last Name">
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-11 rounded-xl border border-slate-100 px-4 text-sm focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
//                   placeholder="Doe"
//                 />
//               </FormField>
//             </div>

//             <FormField label="Email Address">
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full h-11 rounded-xl border border-slate-100 px-4 text-sm focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
//                 placeholder="admin@unitech.edu"
//               />
//             </FormField>

//             <FormField label="Phone Number">
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={form.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 className="w-full h-11 rounded-xl border border-slate-100 px-4 text-sm focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10"
//                 placeholder="+234 801 234 5678"
//               />
//             </FormField>

//             <FormField label="Password">
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full h-11 rounded-xl border border-slate-100 px-4 text-sm focus:outline-none focus:border-logo/40 focus:ring-2 focus:ring-logo/10 pr-12"
//                   placeholder="Create a strong password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </FormField>

//             {error && (
//               <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-sm text-red-600">
//                 <AlertTriangle className="size-5 mt-0.5 shrink-0" />
//                 {error}
//               </div>
//             )}

//             {success && (
//               <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-center text-green-700">
//                 Account created successfully! You can now log in.
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className={cn(
//                 "w-full h-12 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
//                 loading
//                   ? "bg-logo/70 cursor-not-allowed"
//                   : "bg-logo hover:bg-logo/90",
//               )}
//             >
//               {loading && <Loader2 className="size-5 animate-spin" />}
//               {loading ? "Creating Account..." : "Create Admin Account"}
//             </button>
//           </form>

//           <div className="px-8 py-6 border-t border-slate-100 text-center">
//             <p className="text-sm text-slate-500">
//               Already have an account?{" "}
//               <a
//                 href="/admin/login"
//                 className="text-logo font-semibold hover:underline"
//               >
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </motion.div>

//         <p className="text-center text-xs text-slate-400 mt-6">
//           © {new Date().getFullYear()} Unitech Admin Portal
//         </p>
//       </div>
//     </div>
//   );
// }

// function FormField({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-slate-500">{label}</label>
//       {children}
//     </div>
//   );
// }

"use client";

import React from "react";
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
  adminLoginSchema,
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
                  Register Admin Account{" "}
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
            {/* <div className="border-t border-border/20 pt-6"></div> */}

            {/* Back-routing Context */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already possess admin rights?{" "}
              <Link
                href="/auth/admin/login"
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
