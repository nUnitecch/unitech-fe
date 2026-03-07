import {
  forgetPassword,
  loginStudent,
  registerStudent,
  resetPassword,
} from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useStudentRegistration = () => {
  const router = useRouter();
  const { isPending, mutate: register } = useMutation({
    mutationFn: registerStudent,
    onSuccess: (response, variables) => {
      toast.success("Account created successfully!");
      const email = encodeURIComponent(variables.email);
      router.push(`/auth/verify?email=${email}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed. Try again.");
    },
  });

  return { isPending, register };
};

export const useStudentLogin = () => {
  const router = useRouter();

  const { isPending, mutate: login } = useMutation({
    mutationFn: loginStudent,
    onSuccess: (res) => {
      toast.success(`Welcome back, ${res.data.student.firstName}!`);
      router.push(`/dashboard/`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return { isPending, login };
};

export const useForgotPassword = () => {
  const { isPending, mutate: forgotPwd } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      toast.success("Link sent to your Email");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return { isPending, forgotPwd };
};

export const useResetPassword = () => {
  const router = useRouter();
  const { mutate: resetPwd, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push("/signin");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return { isPending, resetPwd };
};
