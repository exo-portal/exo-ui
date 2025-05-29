import { ClientOnlyProvider } from "@/providers";
import { ContactDetailsForm } from "./components";

export default function ContactDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<div>Loading...</div>}>
      <ContactDetailsForm />
    </ClientOnlyProvider>
  );
}