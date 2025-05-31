import React from "react";
import { ClientOnlyProvider } from "@/providers";
import { BackButton } from "@/components/common";
import { OtpForm, OtpHeader } from "./components";

export default function OtpPage() {
  return (
    <section className="flex flex-col flex-1">
      <BackButton />
      <OtpHeader />
      <ClientOnlyProvider fallback={<div>loading...</div>}>
        <OtpForm />
      </ClientOnlyProvider>
    </section>
  );
}
