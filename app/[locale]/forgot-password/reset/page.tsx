import { BackButton } from "@/components/common";
import { ClientOnlyProvider } from "@/providers";
import React from "react";
import { ResetForm, ResetHeader } from "./components";

export default function ResetPage() {
  return (
    <section className="flex flex-col flex-1 justify-center">
      <BackButton />
      <ResetHeader />
      <ClientOnlyProvider fallback={<div>loading...</div>}>
        <ResetForm />
      </ClientOnlyProvider>
    </section>
  );
}
