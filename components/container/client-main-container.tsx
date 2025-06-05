"use client";

import { cn } from "@/lib";

export default function ClientMainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-amber-300",
        className
      )}
    >
      {children}
    </main>
  );
}
