"use client";
import InstructionBadge from "@/components/auth-instruction/instruction-badge";
import { InstructionContainer } from "@/components/auth-instruction/instruction-cotainer";
import { PATH } from "@/config";
import { TxKeyPath } from "@/i18n";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function InstructionSection() {
  const t = useTranslations();

  const [title, setTitle] = useState<TxKeyPath>(
    "register.instruction.register.title.1"
  );
  const [subTitle, setSubTitle] = useState<TxKeyPath>(
    "register.instruction.register.subtitle.1"
  );
  const [topBadgeTitleKey, setTopBadgeTitleKey] = useState<TxKeyPath>(
    "register.instruction.register.topBadge.title"
  );
  const [bottomBadgeTitleKey, setBottomBadgeTitleKey] =
    useState<TxKeyPath | null>(
      "register.instruction.register.bottomBadge.title"
    );
  // Store badge config as data, not React nodes
  const [topBadgeData, setTopBadgeData] = useState<{
    count: number;
    keyPrefix: string;
  } | null>({
    count: 1,
    keyPrefix: "register.instruction.register.topBadge.badgeTitle",
  });
  const [bottomBadgeData, setBottomBadgeData] = useState<{
    count: number;
    keyPrefix: string;
  } | null>({
    count: 3,
    keyPrefix: "register.instruction.register.bottomBadge.badgeTitle",
  });

  const pathname = usePathname();

  useEffect(() => {
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    const currentPathname = localeMatch
      ? pathname.replace(/^\/[a-z]{2}/, "")
      : pathname;

    switch (currentPathname) {
      case PATH.REGISTER.path:
        setTitle("register.instruction.register.title.1");
        setSubTitle("register.instruction.register.subtitle.1");
        setTopBadgeTitleKey("register.instruction.register.topBadge.title");
        setBottomBadgeTitleKey(
          "register.instruction.register.bottomBadge.title"
        );
        setTopBadgeData({
          count: 1,
          keyPrefix: "register.instruction.register.topBadge.badgeTitle",
        });
        setBottomBadgeData({
          count: 3,
          keyPrefix: "register.instruction.register.bottomBadge.badgeTitle",
        });
        break;
      case PATH.REGISTER_PERSONAL_DETAILS.path:
        setTitle("register.instruction.register.title.2");
        setSubTitle("register.instruction.register.subtitle.2");
        setTopBadgeTitleKey(
          "register.instruction.personalDetails.topBadge.title"
        );
        setTopBadgeData({
          count: 2,
          keyPrefix: "register.instruction.personalDetails.topBadge.badgeTitle",
        });
        setBottomBadgeData(null);
        setBottomBadgeTitleKey(null);
        break;
      case PATH.REGISTER_CONTACT_DETAILS.path:
        setTitle("register.instruction.register.title.2");
        setSubTitle("register.instruction.register.subtitle.2");
        setTopBadgeTitleKey(
          "register.instruction.contactDetails.topBadge.title"
        );
        setTopBadgeData({
          count: 2,
          keyPrefix: "register.instruction.contactDetails.topBadge.badgeTitle",
        });
        setBottomBadgeData(null);
        setBottomBadgeTitleKey(null);
        break;
      default:
        break;
    }
  }, [pathname]);

  // Derive badge components in render
  const topBadge = topBadgeData ? (
    <>
      {Array.from({ length: topBadgeData.count }).map((_, idx) => (
        <InstructionBadge
          key={idx}
          number={idx + 1}
          title={translate(
            t,
            `${topBadgeData.keyPrefix}.${idx + 1}` as TxKeyPath
          )}
        />
      ))}
    </>
  ) : null;

  const bottomBadge = bottomBadgeData ? (
    <>
      {Array.from({ length: bottomBadgeData.count }).map((_, idx) => (
        <InstructionBadge
          key={idx}
          number={idx + 1 + (topBadgeData?.count || 0)}
          title={translate(
            t,
            `${bottomBadgeData.keyPrefix}.${idx + 1}` as TxKeyPath
          )}
        />
      ))}
    </>
  ) : null;

  return (
    <InstructionContainer
      topBadge={topBadge}
      bottomBadge={bottomBadge}
      topBadgeTitleKey={topBadgeTitleKey}
      bottomBadgeTitleKey={
        bottomBadgeTitleKey || "register.instruction.register.bottomBadge.title"
      }
      title={title}
      subTitle={subTitle}
    />
  );
}
// ...existing code...
