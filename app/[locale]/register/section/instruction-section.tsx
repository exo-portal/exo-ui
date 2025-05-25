import { Separator } from "@/components/ui/separator";
import React from "react";
import { InstructionBadge } from "../component";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";

export default function InstructionSection() {
  return (
    <aside className="basis-4/12 bg-main-700 flex flex-col px-11 py-12">
      <div data-test="instruction-header" className="flex flex-col">
        <div className="space-y-8">
          <div
            data-test="company-logo"
            className="h-[50px] w-[120px] bg-neutral-50 rounded-lg"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-body-large text-neutral-50 font-bold">
              {translate(
                useTranslations(),
                "register.instruction.getStartedwithUs"
              )}
            </h1>
            <h2 className="text-body-normal text-neutral-50">
              {translate(
                useTranslations(),
                "register.instruction.chooseSignupType"
              )}
            </h2>
          </div>

          <div className="space-y-2">
            <label className="text-neutral-50 text-label" htmlFor="">
              {translate(
                useTranslations(),
                "register.instruction.signUpWithOAuth"
              )}
            </label>
            <InstructionBadge
              number={1}
              title={translate(
                useTranslations(),
                "register.instruction.signUpWithExistingAccounts"
              )}
            />
          </div>

          <div className="px-8">
            <Separator />
          </div>

          <div className="space-y-2">
            <label className="text-neutral-50 text-label" htmlFor="">
              {translate(
                useTranslations(),
                "register.instruction.signUpWithEmailOrPhone"
              )}
            </label>
            <InstructionBadge
              number={1}
              title={translate(
                useTranslations(),
                "register.instruction.signUpWithEmailOrPhoneDescription"
              )}
            />
            <InstructionBadge
              number={2}
              title={translate(
                useTranslations(),
                "register.instruction.signUpWithUsernameAndPassword"
              )}
            />
            <InstructionBadge
              number={3}
              title={translate(
                useTranslations(),
                "register.instruction.continueButton"
              )}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
