import { axiosInstance } from "@/lib";

const loginWithApi = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/api/auth/authentication/login", {
    email,
    password,
  });
};

export const LoginOperations = {
  loginWithApi,
};
