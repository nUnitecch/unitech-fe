import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, "Fullname required!")
      .min(2, "Fullname too short"),
    email: z.email("Invalid email address").trim(),
    gender: z.string().trim().min(1, "Select gender"),
    username: z.string().trim().min(3, "Username too short"),
    matricNo: z
      .string()
      .trim()
      .min(1, "Matric Number required!")
      .min(5, "Invalid matric number"),
    campus: z.string().trim().min(1, "Select campus"),
    faculty: z.string().trim().min(1, "Select faculty"),
    department: z.string().trim().min(1, "Select department"),
    level: z.string().trim().min(1, "Select level"),
    callingNumber: z
      .string()
      .trim()
      .min(1, "Calling number is required")
      .min(10, "Invalid calling number")
      .regex(/^[\d\s+()-]+$/, "Invalid phone number format"),
    address: z.string().min(10, "Address too short"),
    guardianName: z
      .string()
      .trim()
      .min(2)
      .optional()
      .refine((val) => !val || val.length >= 2, {
        message: "Guardian name too short",
      }),
    guardianNumber: z
      .string()
      .trim()
      .min(10)
      .optional()
      .refine((val) => !val || val.length >= 10, {
        message: "Guardian number must be at least 10 digits",
      }),
    whatsappNumber: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || val.length >= 10, {
        message: "WhatsApp number must be at least 10 digits",
      })
      .refine((val) => !val || /^[\d\s+()-]+$/.test(val), {
        message: "Invalid WhatsApp number format",
      }),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address").trim(),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
