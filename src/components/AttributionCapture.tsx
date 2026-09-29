"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Reads the landing URL's UTM params into memory (no cookies, no storage). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
