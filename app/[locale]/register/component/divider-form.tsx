import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export default function DividerForm() {
  const t = useTranslations();

  return (
    <div className="flex mt-2 gap-4 items-center">
      <div className="bg-border h-0.5 w-full" />
      <span className="text-body-normal text-neutral-400">
        {translate(t, "register.form.signUp.or")}
      </span>
      <div className="bg-border h-0.5 w-full" />
    </div>
  );
}
