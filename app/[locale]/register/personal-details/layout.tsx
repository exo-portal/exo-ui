import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export default function PersonalDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  return (
    <section className="flex flex-col">
      <div className="text-center space-y-2 mb-20">
        <h1 className="text-sub-heading-4 text-neutral-950 font-bold">
          {translate(t, "register.form.personalDetails.title")}
        </h1>
        <span>{translate(t, "register.form.personalDetails.subtitle")}</span>
      </div>
      {children}
    </section>
  );
}
