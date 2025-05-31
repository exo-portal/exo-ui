import React from "react";
import { ForgotPasswordForm } from "./component";
import { ClientOnlyProvider } from "@/providers";
import ForgotPasswordHeader from "./component/forgot-password-header";
import BackButton from "../register/component/back-button";

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
