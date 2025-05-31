"use client";

import { ChevronLeft } from "@/components/icons";
import { translate } from "@/lib";
import { useAppStateStore } from "@/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export function BackButton() {
  const t = useTranslations();

  const { setIsLoading } = useAppStateStore();

  const onClickHandler = () => {
    setIsLoading(true);
    window.history.back();
  };

  return (
    <button
      type="button"
      className="flex gap-2 px-3.5 py-2.5 cursor-pointer items-center"
      onClick={onClickHandler}
    >
      <Image src={ChevronLeft} alt="chevron-left" />
      <span className="text-body-normal text-neutral-500">
        {translate(t, "common.back")}
      </span>
    </button>
  );
}
