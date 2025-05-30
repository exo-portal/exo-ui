import { AuthForm, DividerForm, EmailForm } from "./component";
import { ClientOnlyProvider } from "@/providers";
import EmailFormSkeleton from "./component/skeleton/email-form-skeleton";

export default function RegisterPage() {
  return (
    <section className="flex flex-col">
      <AuthForm />
      <DividerForm />
      <ClientOnlyProvider fallback={<EmailFormSkeleton />}>
        <EmailForm />
      </ClientOnlyProvider>
    </section>
  );
}
