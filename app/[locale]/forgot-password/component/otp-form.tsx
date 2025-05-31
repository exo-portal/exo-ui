"use client";
import { useAppStateStore } from "@/store";
import React, { useEffect } from "react";

export function OtpForm() {
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return <div>OtpForm</div>;
}
