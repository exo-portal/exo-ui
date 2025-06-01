import { BASE_URL } from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important: Send cookies with requests
  timeout: 5000, // Set timeout to 5000ms (5 seconds)
});
