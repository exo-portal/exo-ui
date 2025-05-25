"use client";

import { GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { GITHUB_OAUTH_FULL_URL, GOOGLE_OAUTH_FULL_URL } from "@/config";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function AuthForm() {
  const t = useTranslations();

  // Handlers for OAuth registration github provider
  const registerUsingGithubHandler = () => {
    window.location.href = GITHUB_OAUTH_FULL_URL;
  };

  // Handlers for Oauth registration google provider
  const registerUsingGoogleHandler = () => {
    window.location.href = GOOGLE_OAUTH_FULL_URL;
  };

  return (
    <div className="flex flex-col gap-11">
      <div className="space-y-2 text-center">
        <h1 className="text-sub-heading-4 font-bold text-neutral-950">
          {translate(t, "register.form.title")}
        </h1>
        <h2 className="text-neutral-500 text-body-normal">
          {translate(t, "register.form.subtitle")}
        </h2>
      </div>
      <div className="flex flex-col space-y-4">
        {/* Google OAuth */}
        <Button
          className="font-semibold text-neutral-500"
          variant={"outline"}
          onClick={registerUsingGoogleHandler}
        >
          <Image src={GoogleIcon} alt="google-icon" />
          {translate(t, "register.form.button.google")}
        </Button>

        {/* GitHub OAuth */}
        <Button
          className="font-semibold text-neutral-500"
          variant={"outline"}
          onClick={registerUsingGithubHandler}
        >
          <Image src={GithubIcon} alt="github-icon" />
          {translate(t, "register.form.button.github")}
        </Button>
      </div>
    </div>
  );
}
