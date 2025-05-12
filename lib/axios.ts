import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Important: Send cookies with requests
  timeout: 5000, // Set timeout to 5000ms (5 seconds)
});
