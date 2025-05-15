import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib";
import { PATH } from "@/config";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  isTokenValid: boolean;
  setIsTokenValid: (isTokenValid: boolean) => void;
  setUser: (user: any) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
  validateToken: () => Promise<void>;
  redirectRoute: (to: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isTokenValid: false,
  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn });
    if (isLoggedIn) {
      document.cookie = "isLoggedIn=true; path=/;";
    } else {
      document.cookie = "isLoggedIn=false; path=/;";
    }
  },
  setIsTokenValid: (isTokenValid) => {
    set({ isTokenValid });
    if (isTokenValid) {
      document.cookie = "isTokenValid=true; path=/;";
    } else {
      document.cookie = "isTokenValid=false; path=/;";
    }
  },
  logout: () => {
    axiosInstance
      .post("/api/auth/authentication/logout")
      .then(() => {
        useAuthStore.getState().setIsLoggedIn(false);
        document.cookie =
          "tkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "isLoggedIn=false; path=/;";
        useAuthStore.getState().redirectRoute(PATH.LOGIN.value);
      })
      .catch((error) => {
        return null;
      })
      .finally(() => {
        set({ user: null });
        useAuthStore.getState().setIsLoggedIn(false);
        document.cookie =
          "tkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "isLoggedIn=false; path=/;";
      });
  },
  validateToken: async () => {
    try {
      let token: string | null = null;
      try {
        const res = await axiosInstance.get(
          "/api/auth/authentication/get-security-token"
        );
        token = res.data;
        if (res.status === 200) {
          useAuthStore.getState().redirectRoute(PATH.HOME.value);
        }
      } catch (error) {
        token = null;
      }

      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          useAuthStore.getState().logout();
        } else {
          useAuthStore.getState().setIsLoggedIn(true);
          const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
          setTimeout(() => {
            useAuthStore.getState().logout();
          }, timeUntilExpiry);
        }
      } else {
        useAuthStore.getState().setIsLoggedIn(false);
      }
    } catch (error) {
      useAuthStore.getState().setIsLoggedIn(false);
    }
  },
  redirectRoute: (to: string) => {
    const path = window.location.pathname;
    const localeMatch = path.match(/^\/([a-z]{2})(\/|$)/);

    if (localeMatch) {
      const locale = localeMatch[1];
      const targetPath = `/${locale}/${to}`;
      if (path !== targetPath) {
        window.location.replace(targetPath);
      }
    }
  },
}));
