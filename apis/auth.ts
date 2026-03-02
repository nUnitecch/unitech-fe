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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
      throw new Error(error.response?.data?.message || "Registration failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
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
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log("Login successful", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

async function requestPasswordReset() {}

export { registerStudent, loginStudent };
