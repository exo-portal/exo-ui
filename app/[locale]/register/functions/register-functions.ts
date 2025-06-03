import { axiosInstance } from "@/lib";
import { RegistrationData } from "@/store";

const validateEmail = async (email: string) => {
  return axiosInstance.get("/api/auth/authentication/validate-email", {
    params: { email },
  });
};

const register = (data: RegistrationData) => {
  return axiosInstance.post("/api/auth/authentication/register", data);
};

export const RegisterOperations = {
  validateEmail,
  register
};
