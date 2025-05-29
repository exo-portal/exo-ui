import ClientOnly from "@/components/client-only";
import { ContactDetailsForm } from "./components";

export default function ContactDetailsPage() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <ContactDetailsForm />
    </ClientOnly>
  );
}