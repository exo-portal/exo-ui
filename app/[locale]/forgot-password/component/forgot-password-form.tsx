"use client";

import { useAppStateStore } from "@/store";
import { set } from "date-fns";
import React, { useEffect } from "react";

export function ForgotPasswordForm() {
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return <div>Forgot</div>;
}
