import { Metadata } from "next";
import React from "react";
import { InstructionSection } from "./section";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to our application",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex min-h-screen bg-neutral-50"
      data-testid="login-layout-main"
    >
      <InstructionSection />
      <section
        className="basis-8/12 flex justify-center items-center"
        data-testid="login-layout-section"
      >
        {children}
      </section>
    </main>
  );
}
