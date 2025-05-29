import ClientOnlyProvider from "@/providers/client-only-provider";
import { PersonalDetailsForm } from "./components";

export default function PersonalDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<div>Loading...</div>}>
      <PersonalDetailsForm />
    </ClientOnlyProvider>
  );
}
