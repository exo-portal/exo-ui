import React from "react";
import { DividerForm, AuthForm, EmailForm } from "./components";
import { ClientOnlyProvider } from "@/providers";

export default function page() {
  return (
    <div className="flex flex-col gap-9" data-testid="login-page">
      <AuthForm data-testid="auth-form" />
      <DividerForm data-testid="divider-form" />
      <ClientOnlyProvider fallback={<div>loading...</div>}>
        <EmailForm data-testid="email-form" />
      </ClientOnlyProvider>
    </div>
  );
}
