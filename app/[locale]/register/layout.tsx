import { Metadata } from "next";
import React from "react";
import { InstructionSection } from "./section";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to our application",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-neutral-50">
      <InstructionSection />
      <section className="basis-8/12 flex justify-center items-center">
        {children}
      </section>
    </main>
  );
}
