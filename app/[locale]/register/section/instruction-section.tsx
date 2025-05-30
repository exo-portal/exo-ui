"use client";

import { useTranslations } from "next-intl";
import { translate } from "@/lib";
import { InstructionContainer } from "@/components/auth-instruction/instruction-cotainer";
import InstructionBadge from "@/components/auth-instruction/instruction-badge";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PATH } from "@/config";
import { useState } from "react";
import { TxKeyPath } from "@/i18n";

export function InstructionSection() {
  const t = useTranslations();

  const [title, settitle] = useState<TxKeyPath>(
    "register.instruction.register.title.1"
  );
  const [subTitle, setSubTitle] = useState<TxKeyPath>(
    "register.instruction.register.subtitle.1"
  );

  const [topBadgeComponent, setTopBadgeComponent] = useState<React.ReactNode>(
    <InstructionBadge
      number={1}
      title={translate(
        t,
        "register.instruction.register.topBadge.badgeTitle.1"
      )}
    />
  );
  const [bottomBadgeComponent, setBottomBadgeComponent] =
    useState<React.ReactNode>(
      <>
        {Array.from({ length: 3 }).map((_, idx) => {
          return (
            <InstructionBadge
              key={idx}
              number={idx + 2}
              title={translate(
                t,
                `register.instruction.register.bottomBadge.badgeTitle.${
                  idx + 1
                }` as TxKeyPath
              )}
            />
          );
        })}
      </>
    );
  const [topBadgeTitleKey, setTopBadgeTitleKey] = useState<TxKeyPath>(
    "register.instruction.register.topBadge.title"
  );
  const [bottomBadgeTitleKey, setBottomBadgeTitleKey] =
    useState<TxKeyPath | null>(
      "register.instruction.register.bottomBadge.title"
    );

  const pathname = usePathname();

  useEffect(() => {
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    const currentPathname = localeMatch
      ? pathname.replace(/^\/[a-z]{2}/, "")
      : pathname;

    switch (currentPathname) {
      case PATH.REGISTER.path:
        settitle("register.instruction.register.title.1");
        setSubTitle("register.instruction.register.subtitle.1");
        setTopBadgeTitleKey("register.instruction.register.topBadge.title");
        setBottomBadgeTitleKey(
          "register.instruction.register.bottomBadge.title"
        );
        setTopBadgeComponent(
          <InstructionBadge
            number={1}
            title={translate(
              t,
              "register.instruction.register.topBadge.badgeTitle.1"
            )}
          />
        );
        setBottomBadgeComponent(
          <>
            {Array.from({ length: 3 }).map((_, idx) => {
              return (
                <InstructionBadge
                  key={idx}
                  number={idx + 2}
                  title={translate(
                    t,
                    `register.instruction.register.bottomBadge.badgeTitle.${
                      idx + 1
                    }` as TxKeyPath
                  )}
                />
              );
            })}
          </>
        );
        break;
      case PATH.REGISTER_PERSONAL_DETAILS.path:
        settitle("register.instruction.register.title.2");
        setSubTitle("register.instruction.register.subtitle.2");
        setTopBadgeTitleKey(
          "register.instruction.personalDetails.topBadge.title"
        );
        setTopBadgeComponent(
          <>
            {Array.from({ length: 2 }).map((_, idx) => {
              return (
                <InstructionBadge
                  key={idx}
                  number={idx + 1}
                  title={translate(
                    t,
                    `register.instruction.personalDetails.topBadge.badgeTitle.${
                      idx + 1
                    }` as TxKeyPath
                  )}
                />
              );
            })}
          </>
        );
        setBottomBadgeComponent(null);
        setBottomBadgeTitleKey(null);
        break;
      case PATH.REGISTER_CONTACT_DETAILS.path:
        settitle("register.instruction.register.title.2");
        setSubTitle("register.instruction.register.subtitle.2");
        setTopBadgeTitleKey(
          "register.instruction.contactDetails.topBadge.title"
        );
        setTopBadgeComponent(
          <>
            {Array.from({ length: 2 }).map((_, idx) => {
              return (
                <InstructionBadge
                  key={idx}
                  number={idx + 1}
                  title={translate(
                    t,
                    `register.instruction.contactDetails.topBadge.badgeTitle.${
                      idx + 1
                    }` as TxKeyPath
                  )}
                />
              );
            })}
          </>
        );
        setBottomBadgeComponent(null);
        setBottomBadgeTitleKey(null);
        break;

      default:
        break;
    }
  }, [pathname]);

  return (
    <InstructionContainer
      topBadge={topBadgeComponent}
      bottomBadge={bottomBadgeComponent}
      topBadgeTitleKey={topBadgeTitleKey}
      bottomBadgeTitleKey={
        bottomBadgeTitleKey || "register.instruction.register.bottomBadge.title"
      }
      title={title}
      subTitle={subTitle}
    />
  );
}
