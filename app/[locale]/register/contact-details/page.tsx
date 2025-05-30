import { ClientOnlyProvider } from "@/providers";
import { ContactDetailsForm, ContactDetailsFormSkeleton } from "./components";

export default function ContactDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<ContactDetailsFormSkeleton />}>
      <ContactDetailsForm />
    </ClientOnlyProvider>
  );
}
