"use client";
import { useAppStateStore } from "@/store";
import React, { useEffect } from "react";

export function ResetLoadingProvider() {
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return <></>;
}
