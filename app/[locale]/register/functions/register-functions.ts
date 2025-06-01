import { axiosInstance } from "@/lib";

const validateEmail = async (email: string) => {
  return axiosInstance.get("/api/auth/authentication/validate-email", {
    params: { email },
  });
};

export const RegisterOperations = {
  validateEmail,
};
