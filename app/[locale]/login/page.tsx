import React from "react";
import { DividerForm, AuthForm, EmailForm } from "./components";

export default function page() {
  return (
    <div className="flex flex-col gap-9" data-testid="login-page">
      <AuthForm data-testid="auth-form" />
      <DividerForm data-testid="divider-form" />
      <EmailForm data-testid="email-form" />
    </div>
  );
}
