import { ClientOnlyProvider } from "@/providers";
import { PersonalDetailsForm, PersonalDetailsFormSkeleton } from "./components";

export default function PersonalDetailsPage() {
  return (
    <ClientOnlyProvider fallback={<PersonalDetailsFormSkeleton />}>
      <PersonalDetailsForm />
    </ClientOnlyProvider>
  );
}
