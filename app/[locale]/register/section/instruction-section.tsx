"use client";
import InstructionBadge from "@/components/auth-instruction/instruction-badge";
import { InstructionContainer } from "@/components/auth-instruction/instruction-container";
import { PATH } from "@/config";
import { TxKeyPath } from "@/i18n";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

type InstructionConfig = {
  title: TxKeyPath;
  subTitle: TxKeyPath;
  topBadgeTitleKey: TxKeyPath;
  bottomBadgeTitleKey?: TxKeyPath;
  topBadgeData?: {
    count: number;
    keyPrefix: string;
  };
  bottomBadgeData?: {
    count: number;
    keyPrefix: string;
  };
};

const INSTRUCTION_CONFIG: Record<string, InstructionConfig> = {
  [PATH.REGISTER.path]: {
    title: "register.instruction.register.title.1",
    subTitle: "register.instruction.register.subtitle.1",
    topBadgeTitleKey: "register.instruction.register.topBadge.title",
    bottomBadgeTitleKey: "register.instruction.register.bottomBadge.title",
    topBadgeData: {
      count: 1,
      keyPrefix: "register.instruction.register.topBadge.badgeTitle",
    },
    bottomBadgeData: {
      count: 3,
      keyPrefix: "register.instruction.register.bottomBadge.badgeTitle",
    },
  },
  [PATH.REGISTER_PERSONAL_DETAILS.path]: {
    title: "register.instruction.register.title.2",
    subTitle: "register.instruction.register.subtitle.2",
    topBadgeTitleKey: "register.instruction.personalDetails.topBadge.title",
    topBadgeData: {
      count: 2,
      keyPrefix: "register.instruction.personalDetails.topBadge.badgeTitle",
    },
    // Use undefined instead of null
    bottomBadgeData: undefined,
    bottomBadgeTitleKey: undefined,
  },
  [PATH.REGISTER_CONTACT_DETAILS.path]: {
    title: "register.instruction.register.title.2",
    subTitle: "register.instruction.register.subtitle.2",
    topBadgeTitleKey: "register.instruction.contactDetails.topBadge.title",
    topBadgeData: {
      count: 2,
      keyPrefix: "register.instruction.contactDetails.topBadge.badgeTitle",
    },
    bottomBadgeData: undefined,
    bottomBadgeTitleKey: undefined,
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

export function InstructionSection() {
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

  const bottomBadge = config.bottomBadgeData ? (
    <>
      {Array.from({ length: config.bottomBadgeData.count }).map((_, idx) => (
        <InstructionBadge
          key={idx}
          number={idx + 1 + (config.topBadgeData?.count || 0)}
          title={translate(
            t,
            `${config.bottomBadgeData?.keyPrefix}.${idx + 1}` as TxKeyPath
          )}
        />
      ))}
    </>
  ) : null;

  return (
    <InstructionContainer
      topBadge={topBadge}
      bottomBadge={bottomBadge}
      topBadgeTitleKey={config.topBadgeTitleKey}
      bottomBadgeTitleKey={
        config.bottomBadgeTitleKey ||
        "register.instruction.register.bottomBadge.title"
      }
      title={config.title}
      subTitle={config.subTitle}
    />
  );
}
