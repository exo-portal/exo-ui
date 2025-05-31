import React from "react";
import { ForgotPasswordInstructionSection } from "./section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | ExoPortal",
  description:
    "Reset your ExoPortal account password. Enter your email address to receive password reset instructions and regain access to your account.",
  keywords: [
    "ExoPortal",
    "Forgot Password",
    "Password Reset",
    "Account Recovery",
    "Exo Portal",
  ],
  robots: "noindex, nofollow",
  openGraph: {
    title: "Forgot Password | ExoPortal",
    description:
      "Securely reset your ExoPortal account password and restore access to your account.",
    url: "https://your-exoportal-domain.com/forgot-password",
    siteName: "ExoPortal",
    type: "website",
  },
};

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
        className="basis-8/12 flex justify-center items-start mt-32"
        data-testid="forgot-password-layout-section"
      >
        {children}
      </section>
    </main>
  );
}
