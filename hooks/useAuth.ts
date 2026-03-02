import { loginStudent, registerStudent } from "@/apis/auth";
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
    onSuccess: (data) => {
      toast.success("Login successfully!");
      router.push(`/dashboard/${data?.id}`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return { isPending, login };
};
