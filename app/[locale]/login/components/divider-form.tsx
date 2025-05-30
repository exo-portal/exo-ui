import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export function DividerForm() {
  const t = useTranslations();

  return (
    <div className="flex mt-2 gap-4 items-center" data-testid="divider-form">
      <div className="bg-border h-0.5 w-full" data-testid="divider-line-left" />
      <span
        className="text-body-normal text-neutral-400"
        data-testid="divider-text"
      >
        {translate(t, "login.form.signIn.or")}
      </span>
      <div
        className="bg-border h-0.5 w-full"
        data-testid="divider-line-right"
      />
    </div>
  );
}
