"use client";

import { useAppStateStore } from "@/store";

export function LoadingMaskProvider() {
  const { isLoading } = useAppStateStore();
  return (
    <div
      hidden={!isLoading}
      className="fixed h-screen w-screen cursor-progress z-50"
    />
  );
}
