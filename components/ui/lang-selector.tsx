"use client";

import React from "react";
import { useLanguage } from "@/hooks/use-language";

export function LangSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="absolute top-4 right-4">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-[#16162a] text-white rounded-md px-2 py-1 border border-white/10"
        aria-label={t("language")}
      >
        <option value="en-US">{t("english")}</option>
        <option value="vi-VN">{t("vietnamese")}</option>
      </select>
    </div>
  );
}
