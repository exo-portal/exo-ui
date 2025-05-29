"use client";
import React, { useEffect, useState } from "react";

export function ClientOnlyProvider({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return fallback;
  return <>{children}</>;
}