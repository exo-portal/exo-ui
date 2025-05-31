import React from "react";
import { ClientOnlyProvider } from "@/providers";
import { OtpForm } from "../component";
import { BackButton } from "@/components/common";

export default function OtpPage() {
  return (
    <section className="flex flex-col justify-start">
      <BackButton />
      {/* OTP Header */}
      <ClientOnlyProvider fallback={<div>loading...</div>}>
        <OtpForm />
      </ClientOnlyProvider>
    </section>
  );
}
