import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  setUser: (user: any) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
  validateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn });
    if (isLoggedIn) {
      document.cookie = "isLoggedIn=true; path=/;";
    } else {
      document.cookie = "isLoggedIn=false; path=/;";
    }
  },
  logout: () => {
    axiosInstance.post("/api/auth/authentication/logout").finally(() => {
      set({ user: null });
      useAuthStore.getState().setIsLoggedIn(false);
      document.cookie = "tkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "isLoggedIn=false; path=/;";
      window.location.href = "/auth/login";
    });
  },
  validateToken: async () => {
    try {
      const token: string | null = await axiosInstance
        .get("/api/auth/authentication/get-token")
        .then((res) => res.data)
        .catch(() => null);

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          console.log("Token has expired. Logging out...");
          useAuthStore.getState().logout();
        } else {
          console.log("Token is valid.");
          useAuthStore.getState().setIsLoggedIn(true);
          const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
          setTimeout(() => {
            console.log("Token expired. Logging out...");
            useAuthStore.getState().logout();
          }, timeUntilExpiry);
        }
      } else {
        useAuthStore.getState().setIsLoggedIn(true);
      }
    } catch (error) {
      // console.error("Error validating token:", error);
      useAuthStore.getState().setIsLoggedIn(false);
    }
  },
}));
