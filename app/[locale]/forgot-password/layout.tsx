import React from "react";
import { ForgotPasswordInstructionSection } from "./section";

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex min-h-screen bg-neutral-50"
      data-testid="forgot-password-layout-main"
    >
      <ForgotPasswordInstructionSection data-testid="forgot-password-instruction-section" />
      <section
        className="basis-8/12 flex justify-center items-center"
        data-testid="forgot-password-layout-section"
      >
        {children}
      </section>
    </main>
  );
}
