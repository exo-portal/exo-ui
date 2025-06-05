import { BASE_URL } from "@/config";
import axios from "axios";
import { useAppStateStore } from "@/store";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  timeout: 5000, // Set timeout to 5000ms (5 seconds)
});

axiosInstance.interceptors.request.use(
  (config) => {
    useAppStateStore.getState().setIsLoading(true);
    return config;
  },
  (error) => {
    useAppStateStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    useAppStateStore.getState().setIsLoading(false);
    return response;
  },
  (error) => {
    useAppStateStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);
