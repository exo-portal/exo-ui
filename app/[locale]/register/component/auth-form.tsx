"use client";

import * as Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function AuthForm() {
  // Handlers for OAuth registration github provider
  const registerUsingGithubHandler = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/github";
  };

  // Handlers for Oauth registration google provider
  const registerUsingGoogleHandler = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/google";
  };

  return (
    <div className="flex flex-col gap-11">
      <div className="space-y-2 text-center">
        <h1 className="text-sub-heading-4 font-bold text-neutral-950">
          {translate(useTranslations(), "register.form.title")}
        </h1>
        <h2 className="text-neutral-500 text-body-normal">
          {translate(useTranslations(), "register.form.subtitle")}
        </h2>
      </div>
      <div className="flex flex-col space-y-4">
        {/* Google OAuth */}
        <Button variant={"outline"} onClick={registerUsingGoogleHandler}>
          <Image src={Icons.GoogleIcon} alt="google-icon" />
          <span className="font-semibold text-neutral-500 text-body-normal">
            {translate(useTranslations(), "register.form.button.google")}
          </span>
        </Button>

        {/* GitHub OAuth */}
        <Button
          className="font-semibold text-neutral-500 text-body-normal"
          variant={"outline"}
          onClick={registerUsingGithubHandler}
        >
          <Image src={Icons.GithubIcon} alt="github-icon" />
          <span className="font-semibold text-neutral-500 text-body-normal">
            {translate(useTranslations(), "register.form.button.github")}
          </span>
        </Button>
      </div>
    </div>
  );
}
