"use client";

import { DEFAULT_IDLE_TIMEOUT, PATH } from "@/config";
import { getCurrentLocale } from "@/lib";
import { useRouter } from "next/navigation";
import { useIdleTimer } from "react-idle-timer";

export function AutoLogoutProvider() {
  const router = useRouter();

  const logoutApi = async () => {
    router.push(PATH.LOGOUT.getPath(getCurrentLocale()));
  };

  const timeout = 1000 * 60 * DEFAULT_IDLE_TIMEOUT; 

  useIdleTimer({
    timeout,
    onIdle: logoutApi,
    debounce: 500,
  });

  return null;
}
