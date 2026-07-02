import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  forgetPassword,
  loginAdmin,
  loginStudent,
  registerAdmin,
  registerStudent,
  resetPassword,
} from "@/apis/authApi";

export const useAdminLogin = () => {
  const { isPending, mutate: adminLogin } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: () => {
      toast.success("Admin account created successfully!");
    },
    onError: (error: any) => {
      let errorMessage = "Registration failed. Try again.";
      if (error.error) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  return { isPending, adminLogin };
};

export const useAdminRegistration = () => {
  const router = useRouter();
  const { isPending, mutate: registerAdminMutate } = useMutation({
    mutationFn: registerAdmin,
    onSuccess: () => {
      toast.success("Admin account created successfully!");
      router.push(`/auth/admin/login`);
    },
    onError: (error: any) => {
      let errorMessage = "Registration failed. Try again.";
      if (error.error) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    },
  });

  return { isPending, registerAdminMutate };
};

export const useStudentRegistration = () => {
  const router = useRouter();
  const { isPending, mutate: register } = useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push(`/auth/signin`);
      // const email = encodeURIComponent(variables.email);
      // router.push(`/auth/verify?email=${email}`);
    },
    onError: (error: any) => {
      let errorMessage = "Registration failed. Try again.";
      if (error.error) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });

  return { isPending, register };
};

export const useStudentLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutate: login } = useMutation({
    mutationFn: loginStudent,
    onSuccess: async (res) => {
      // Set cookies
      Cookies.set("token", res.data.token, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      await queryClient.refetchQueries({
        queryKey: ["student-info"],
      });
      // Toast and then redirect
      toast.success(res.message || "Login successfully!");
      router.push("/dashboard");
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

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    Cookies.remove("token");
    queryClient.clear();

    router.push("/auth/signin");
    router.refresh();
  };

  return logout;
};
