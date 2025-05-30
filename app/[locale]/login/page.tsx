import React from "react";
import AuthForm from "./components/auth-form";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import EmailForm from "./components/email-form";

export default function page() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-9">
      <AuthForm />
      <div className="flex mt-2 gap-4 items-center">
        <div className="bg-border h-0.5 w-full" />
        <span className="text-body-normal text-neutral-400">
          {translate(t, "register.form.signUp.or")}
        </span>
        <div className="bg-border h-0.5 w-full" />
      </div>
      <EmailForm />
    </div>
  );
}
