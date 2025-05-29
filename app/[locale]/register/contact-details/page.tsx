import ClientOnlyProvider from "@/providers/client-only-provider";
import { ContactDetailsForm } from "./components";

export default function ContactDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<div>Loading...</div>}>
      <ContactDetailsForm />
    </ClientOnlyProvider>
  );
}