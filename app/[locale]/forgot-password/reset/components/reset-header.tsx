import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export function ResetHeader() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2 text-center min-w-lg mt-32 mb-10">
      <h1 className="text-sub-heading-4 font-bold text-neutral-950">
        {translate(t, "forgotPassword.form.reset.header.title")}
      </h1>
      <p className="text-neutral-500 text-body-normal">
        {translate(t, "forgotPassword.form.reset.header.subtitle")}
      </p>
    </div>
  );
}
