"use client";

import { GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { GITHUB_OAUTH_FULL_URL, GOOGLE_OAUTH_FULL_URL } from "@/config";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useCallback } from "react";

export function AuthForm() {
  const t = useTranslations();

  // Handlers for OAuth registration github provider
  const registerUsingGithubHandler = useCallback(() => {
    window.location.href = GITHUB_OAUTH_FULL_URL;
  }, []);

  // Handlers for Oauth registration google provider
  const registerUsingGoogleHandler = useCallback(() => {
    window.location.href = GOOGLE_OAUTH_FULL_URL;
  }, []);

  return (
    <section className="flex flex-col gap-11 min-w-lg flex-1">
      <div className="space-y-2 text-center">
        <h1 className="text-sub-heading-4 font-bold text-neutral-950">
          {translate(t, "login.form.signIn.title")}
        </h1>
        <h2 className="text-neutral-500 text-body-normal">
          {translate(t, "login.form.signIn.subtitle")}
        </h2>
      </div>
      <div className="flex flex-col space-y-4">
        {/* Google OAuth */}
        <Button
          className="font-semibold text-neutral-500 bg-transparent border-neutral-500 hover:bg-main-50 focus-visible:bg-main-200 focus:border-main-900 focus:text-main-900"
          variant={"outline"}
          onClick={registerUsingGoogleHandler}
        >
          <Image src={GoogleIcon} alt="Google icon" />
          {translate(t, "login.form.signIn.button.google")}
        </Button>

        {/* GitHub OAuth */}
        <Button
          className="font-semibold text-neutral-500 bg-transparent border-neutral-500 hover:bg-main-50 focus-visible:bg-main-200 focus:border-main-900 focus:text-main-900"
          variant={"outline"}
          onClick={registerUsingGithubHandler}
        >
          <Image src={GithubIcon} alt="GitHub icon" />
          {translate(t, "login.form.signIn.button.github")}
        </Button>
      </div>
    </section>
  );
}
