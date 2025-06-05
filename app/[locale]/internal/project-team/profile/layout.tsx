import { ResetLoadingProvider } from "@/providers";
import React from "react";

export default function ProjectTeamProfileLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <main className="min-h-screen">
      <ResetLoadingProvider />
      {children}
    </main>
  );
}
