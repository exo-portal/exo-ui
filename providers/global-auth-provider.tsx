"use client";
import { useAuthStore } from "@/store";
import { useEffect } from "react";

export function GlobalAuthProvider() {
  const validateToken = useAuthStore((state) => state.validateToken);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return null;
}
