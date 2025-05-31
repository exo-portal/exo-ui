import { BackButton } from "@/components/common";
import { metaDataTitle, translate } from "@/lib";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import React from "react";

export const metadata: Metadata = {
  title: metaDataTitle("Create Your Account - Personal Details"),
  description:
    "Enter your personal details to continue creating your Exo Portal account. This information helps us personalize your experience and keep your account secure.",
  keywords: [
    "register",
    "personal details",
    "sign up",
    "create account",
    "Exo Portal",
    "user registration",
    "name",
    "date of birth",
    "personal information",
  ],
  openGraph: {
    title: metaDataTitle("Create Your Account - Personal Details"),
    description:
      "Provide your personal details to complete your Exo Portal registration.",
    url: "https://your-domain.com/register/personal-details",
    type: "website",
  },
};

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
