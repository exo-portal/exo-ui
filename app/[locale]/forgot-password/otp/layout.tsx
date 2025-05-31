import { metaDataTitle } from "@/lib";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: metaDataTitle("OTP Verification"),
  description:
    "Enter the One-Time Password (OTP) sent to your email to reset your ExoPortal account password.",
  robots: "noindex, nofollow",
  openGraph: {
    title: metaDataTitle("OTP Verification"),
    description:
      "Securely verify your identity with a One-Time Password on ExoPortal.",
  },
};

export default function OtpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex min-h-screen bg-neutral-50">{children}</main>;
}
