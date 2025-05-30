import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";
import BackButton from "../component/back-button";

export default function PersonalDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  return (
    <section className="flex flex-col">
      <BackButton />
      <div className="text-center space-y-2 mb-20 w-full">
        <h1 className="text-sub-heading-4 text-neutral-950 font-bold">
          {translate(t, "register.form.layout.title")}
        </h1>
        <span>
          {translate(t, "register.form.layout.personalDetailsSubtitle")}
        </span>
      </div>
      {children}
    </section>
  );
}
