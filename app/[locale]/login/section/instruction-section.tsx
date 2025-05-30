import InstructionBadge from "@/components/auth-instruction/instruction-badge";
import { InstructionContainer } from "@/components/auth-instruction/instruction-container";
import { TxKeyPath } from "@/i18n";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import React from "react";

export function InstructionSection() {
  const t = useTranslations();
  return (
    <InstructionContainer
      title={"login.instruction.title"}
      subTitle={"login.instruction.subtitle"}
      topBadge={
        <InstructionBadge
          number={1}
          title={translate(t, "login.instruction.topBadge.badgeTitle.1")}
        />
      }
      topBadgeTitleKey={"login.instruction.topBadge.title"}
      bottomBadgeTitleKey="login.instruction.bottomBadge.title"
      bottomBadge={
        <>
          {Array.from({ length: 2 }, (_, index) => (
            <InstructionBadge
              key={index}
              number={index + 1}
              title={translate(
                t,
                `login.instruction.bottomBadge.badgeTitle.${
                  index + 1
                }` as TxKeyPath
              )}
            />
          ))}
        </>
      }
    />
  );
}
