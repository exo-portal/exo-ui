"use client";
import { Separator } from "@/components/ui/separator";
import { TxKeyPath } from "@/i18n";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";

interface InstructionContainerInterface {
  title: TxKeyPath;
  subTitle: TxKeyPath;
  topBadge: React.ReactNode;
  topBadgeTitleKey: TxKeyPath;
  bottomBadge?: React.ReactNode;
  bottomBadgeTitleKey?: TxKeyPath;
}

export function InstructionContainer({
  title,
  subTitle,
  topBadge,
  bottomBadge,
  topBadgeTitleKey,
  bottomBadgeTitleKey,
}: InstructionContainerInterface) {
  const t = useTranslations();

  return (
    <aside className="basis-4/12 bg-main-700 flex flex-col px-11 py-12 select-none">
      <div data-testid="instruction-header" className="flex flex-col">
        <div className="space-y-8">
          <div
            data-testid="company-logo"
            className="h-[50px] w-[120px] bg-neutral-50 rounded-lg"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-body-large text-neutral-50 font-bold">
              {translate(t, title)}
            </h1>
            <h2 className="text-body-normal text-neutral-50">
              {translate(t, subTitle)}
            </h2>
          </div>

          <div className="space-y-2">
            <p className="text-neutral-50 text-label">
              {translate(t, topBadgeTitleKey)}
            </p>
            {topBadge}
          </div>

          {bottomBadge && bottomBadgeTitleKey && (
            <>
              <div className="px-8">
                <Separator />
              </div>
              <div className="space-y-2">
                <label className="text-neutral-50 text-label" htmlFor="">
                  {translate(t, bottomBadgeTitleKey)}
                </label>
                {bottomBadge}
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
