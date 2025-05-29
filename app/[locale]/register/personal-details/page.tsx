import React from "react";
import { PersonalDetailsForm } from "./components";
import ClientOnly from "@/components/client-only";

export default function PersonalDetailsPage() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <PersonalDetailsForm />
    </ClientOnly>
  );
}
