"use client";

import React from "react";
import { useLanguage } from "@/hooks/use-language";

export function LocaleText({
  k,
  vars,
}: {
  k: string;
  vars?: Record<string, string | number>;
}) {
  const { t } = useLanguage();
  return <>{t(k, vars)}</>;
}
