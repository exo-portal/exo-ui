"use client";

import { useAuthStore } from "@/store";
import { useEffect } from "react";

export default function GlobalAuth() {
  const validateToken = useAuthStore((state) => state.validateToken);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return null;
}
