import React from "react";
import { ForgotPasswordForm, ForgotPasswordHeader } from "./component";
import { ClientOnlyProvider } from "@/providers";
import { BackButton } from "@/components/common";

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-col justify-start">
      <BackButton />
      <ForgotPasswordHeader />
      <ClientOnlyProvider fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </ClientOnlyProvider>
    </section>
  );
}
