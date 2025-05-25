import React from "react";
import { AuthForm, DividerForm, EmailForm } from "./component";

export default function Page() {
  return (
    <div className="flex flex-col">
      <AuthForm />
      <DividerForm />
      <EmailForm />
    </div>
  );
}
