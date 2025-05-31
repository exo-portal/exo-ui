import { translate, translateWithHtml } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export default function ForgotPasswordHeader() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2 text-center min-w-lg flex-1 mt-32 mb-10">
      <h1 className="text-sub-heading-4 font-bold text-neutral-950">
        {translate(t, "forgotPassword.form.enterEmail.header.title")}
      </h1>
      <p className="text-neutral-500 text-body-normal">
        {translateWithHtml(t, "forgotPassword.form.enterEmail.header.subtitle")}
      </p>
    </div>
  );
}
