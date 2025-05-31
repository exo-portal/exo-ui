import React from "react";
import { ClientOnlyProvider } from "@/providers";
import { BackButton } from "@/components/common";
import { OtpForm, OtpFormSkeleton, OtpHeader } from "./components";

export default function OtpPage() {
  return (
    <section className="flex flex-col flex-1">
      <BackButton />
      <OtpHeader />
      <ClientOnlyProvider fallback={<OtpFormSkeleton />}>
        <OtpForm />
      </ClientOnlyProvider>
    </section>
  );
}
