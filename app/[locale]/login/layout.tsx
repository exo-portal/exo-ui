import { Metadata } from "next";
import React from "react";
import { InstructionSection } from "./section";

export const metadata: Metadata = {
  title: "Login | ExoPortal",
  description:
    "Access your ExoPortal account to manage your profile, view dashboards, and explore features. Secure login for ExoPortal users.",
  keywords: [
    "ExoPortal",
    "login",
    "sign in",
    "user access",
    "dashboard",
    "account management",
  ],
  openGraph: {
    title: "ExoPortal Login",
    description:
      "Sign in to your ExoPortal account to access personalized features and dashboards.",
    url: "https://your-exoportal-domain.com/login",
    siteName: "ExoPortal",
    type: "website",
  },
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
