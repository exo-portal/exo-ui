"use client";

import { DEV_MODE } from "@/config";
import React, { JSX, useEffect } from "react";
import { scan } from "react-scan";

export default function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: DEV_MODE == "development",
    });
  }, []);

  return <></>;
}
