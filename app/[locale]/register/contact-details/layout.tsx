import { BackButton } from "@/components/common";
import { metaDataTitle, translate } from "@/lib";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import React from "react";

export const metadata: Metadata = {
  title: metaDataTitle("Create Your Account - Contact Details"),
  description:
    "Enter your contact details to continue creating your Exo Portal account. We use this information to keep your account secure and to contact you if needed.",
  keywords: [
    "register",
    "contact details",
    "sign up",
    "create account",
    "Exo Portal",
    "user registration",
    "email",
    "phone number",
  ],
  openGraph: {
    title: metaDataTitle("Create Your Account - Contact Details"),
    description:
      "Provide your contact details to complete your Exo Portal registration.",
    url: "https://your-domain.com/register/contact-details",
    type: "website",
  },
};

export default function ContactDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations();

  return (
    <section className="flex flex-col">
      <BackButton />
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-sub-heading-4 text-neutral-950 font-bold">
          {translate(t, "register.form.layout.title")}
        </h1>
        <span>
          {translate(t, "register.form.layout.contactDetailsSubtitle")}
        </span>
      </div>
      {children}
    </section>
  );
}
