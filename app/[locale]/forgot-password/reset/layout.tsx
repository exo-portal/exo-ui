import { metaDataTitle } from "@/lib";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: metaDataTitle("Reset Password"),
  description:
    "Reset your ExoPortal account password securely. Enter your new password to regain access to your account.",
  robots: "noindex, nofollow",
  openGraph: {
    title: metaDataTitle("Reset Password"),
    description:
      "Safely reset your ExoPortal account password and restore access to your account.",
  },
};

export default function ResetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-neutral-50">{children}</main>;
}
