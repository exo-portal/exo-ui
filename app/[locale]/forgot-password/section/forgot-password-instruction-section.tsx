"use client";

import { useTranslations } from "next-intl";
import { InstructionConfig, PATH } from "@/config";
import { usePathname } from "next/navigation";
import InstructionBadge from "@/components/auth-instruction/instruction-badge";
import { translate } from "@/lib";
import { InstructionContainer } from "@/components/auth-instruction/instruction-container";
import { TxKeyPath } from "@/i18n";

const INSTRUCTION_CONFIG: Record<string, InstructionConfig> = {
  [PATH.FORGOT_PASSWORD.path]: {
    title: "forgotPassword.instruction.enterEmail.title",
    subTitle: "forgotPassword.instruction.enterEmail.subtitle",
    topBadgeTitleKey: "forgotPassword.instruction.enterEmail.topBadge.title",
    topBadgeData: {
      count: 2,
      keyPrefix: "forgotPassword.instruction.enterEmail.topBadge.badgeTitle",
    },
  },
  [PATH.FORGOT_PASSWORD_OTP.path]: {
    title: "forgotPassword.instruction.otp.title",
    subTitle: "forgotPassword.instruction.otp.subtitle",
    topBadgeTitleKey: "forgotPassword.instruction.otp.topBadge.title",
    topBadgeData: {
      count: 3,
      keyPrefix: "forgotPassword.instruction.otp.topBadge.badgeTitle",
    },
  },
  [PATH.FORGOT_PASSWORD_RESET.path]: {
    title: "forgotPassword.instruction.reset.title",
    subTitle: "forgotPassword.instruction.reset.subtitle",
    topBadgeTitleKey: "forgotPassword.instruction.reset.topBadge.title",
    topBadgeData: {
      count: 3,
      keyPrefix: "forgotPassword.instruction.reset.topBadge.badgeTitle",
    },
  },
};

const useInstructionConfig = (
  pathname: string
): (typeof INSTRUCTION_CONFIG)[keyof typeof INSTRUCTION_CONFIG] => {
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const currentPathname = localeMatch
    ? pathname.replace(/^\/[a-z]{2}/, "")
    : pathname;
  return (
    INSTRUCTION_CONFIG[currentPathname] ||
    INSTRUCTION_CONFIG[PATH.REGISTER.path]
  );
};

export function ForgotPasswordInstructionSection() {
  const t = useTranslations();
  const pathname = usePathname();
  const config = useInstructionConfig(pathname);

  const topBadge = config.topBadgeData ? (
    <>
      {Array.from({ length: config.topBadgeData.count }).map((_, idx) => (
        <InstructionBadge
          key={idx}
          number={idx + 1}
          title={translate(
            t,
            `${config.topBadgeData?.keyPrefix}.${idx + 1}` as TxKeyPath
          )}
        />
      ))}
    </>
  ) : null;

  return (
    <InstructionContainer
      title={config.title}
      subTitle={config.subTitle}
      topBadge={topBadge}
      topBadgeTitleKey={config.topBadgeTitleKey}
    />
  );
}
