import { ClientOnlyProvider } from "@/providers";
import { PersonalDetailsForm } from "./components";

export default function PersonalDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<div>Loading...</div>}>
      <PersonalDetailsForm />
    </ClientOnlyProvider>
  );
}
