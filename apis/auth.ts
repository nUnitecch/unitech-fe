import { StudentLoginData, StudentRegistrationData } from "@/types/auth.types";
import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BACKEND_BASE_API as string;

async function registerStudent(
  credentials: StudentRegistrationData,
): Promise<void> {
  try {
    const response = await axios.post(
      `${BASE_API}/api/v1/student/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Error creating account";
    throw new Error(message);
  }
}

async function loginStudent({ email, password }: StudentLoginData) {
  const credentials = { email, password };
  try {
    const response = await axios.post(
      `${BASE_API}/api/v1/student/login`,
      credentials,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
}

async function forgetPassword({ email }: { email: string }) {
  try {
    const response = await axios.post(
      `${BASE_API}/api/v1/student/reset-request`,
      email,
      { withCredentials: true },
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to send link";
    throw new Error(message);
  }
}

async function resetPassword({
  id,
  token,
  password,
}: {
  id: string | number;
  token: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_API}/api/v1/student/reset?id=${id}token=${token}`,
      { password },
      { withCredentials: true },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to reset password");
  }
}

export { registerStudent, loginStudent, forgetPassword, resetPassword };
