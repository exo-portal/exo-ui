"use client";

import { DEV_MODE } from "@/config";
import { JSX, useEffect } from "react";
import { scan } from "react-scan";

export function ReactScanProvider(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: DEV_MODE == "development",
    });
  }, []);

  return <></>;
}
