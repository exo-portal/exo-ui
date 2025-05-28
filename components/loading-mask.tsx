"use client";

import { useAppStateStore } from "@/store";
import React from "react";

export default function LoadingMask() {
    
  const { isLoading } = useAppStateStore();
  return (
    <div
      hidden={!isLoading}
      className="fixed h-screen w-screen cursor-progress z-50"
    />
  );
}
