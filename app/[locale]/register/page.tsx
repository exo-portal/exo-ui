import { AuthForm, DividerForm, EmailForm } from "./component";
import { ClientOnlyProvider } from "@/providers";

export default function Page() {
  return (
    <section className="flex flex-col">
      <AuthForm />
      <DividerForm />
      <ClientOnlyProvider fallback={<div>Loading...</div>}>
        <EmailForm />
      </ClientOnlyProvider>
    </section>
  );
}
