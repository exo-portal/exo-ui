import { Metadata } from "next";
import React from "react";
import { InstructionSection } from "./section";
import { metaDataTitle } from "@/lib";

export const metadata: Metadata = {
  title: metaDataTitle("Create Your Account"),
  description:
    "Sign up for a new account to access all features of the Exo Portal. Join our community and get started today.",
  keywords: [
    "register",
    "sign up",
    "create account",
    "Exo Portal",
    "user registration",
  ],
  openGraph: {
    title: metaDataTitle("Create Your Account"),
    description:
      "Sign up for a new account to access all features of the Exo Portal.",
    url: "https://your-domain.com/register",
    type: "website",
  },
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
