import { Separator } from "@/components/ui/separator";
import React from "react";
import { InstructionBadge } from "../component";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";

export default function InstructionSection() {
  const t = useTranslations();

  return (
    <aside className="basis-4/12 bg-main-700 flex flex-col px-11 py-12">
      <div data-testid="instruction-header" className="flex flex-col">
        <div className="space-y-8">
          <div
            data-testid="company-logo"
            className="h-[50px] w-[120px] bg-neutral-50 rounded-lg"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-body-large text-neutral-50 font-bold">
              {translate(t, "register.instruction.getStartedwithUs")}
            </h1>
            <h2 className="text-body-normal text-neutral-50">
              {translate(t, "register.instruction.chooseSignupType")}
            </h2>
          </div>

          <div className="space-y-2">
            <label className="text-neutral-50 text-label" htmlFor="">
              {translate(t, "register.instruction.signUpWithOAuth")}
            </label>
            <InstructionBadge
              number={1}
              title={translate(
                t,
                "register.instruction.signUpWithExistingAccounts"
              )}
            />
          </div>

          <div className="px-8">
            <Separator />
          </div>

          <div className="space-y-2">
            <label className="text-neutral-50 text-label" htmlFor="">
              {translate(t, "register.instruction.signUpWithEmailOrPhone")}
            </label>
            <InstructionBadge
              number={2}
              title={translate(
                t,
                "register.instruction.signUpWithEmailOrPhoneDescription"
              )}
            />
            <InstructionBadge
              number={3}
              title={translate(
                t,
                "register.instruction.signUpWithUsernameAndPassword"
              )}
            />
            <InstructionBadge
              number={4}
              title={translate(t, "register.instruction.continueButton")}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
