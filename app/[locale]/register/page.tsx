import React from "react";
import { AuthForm, DividerForm, EmailForm } from "./component";
import ClientOnly from "@/components/client-only";

export default function Page() {
  return (
    <section className="flex flex-col">
      <AuthForm />
      <DividerForm />
      <ClientOnly fallback={<div>Loading...</div>}>
        <EmailForm />
      </ClientOnly>
    </section>
  );
}
