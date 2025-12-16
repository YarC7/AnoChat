"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, Check } from "lucide-react";
import { LocaleText } from "@/components/ui/locale-text";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 text-5xl" />
          </div>

          {/* Title */}
          <h1 className="text-white text-3xl font-bold mb-4">
            <LocaleText k="paymentSuccessful" />
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-base mb-8">
            <LocaleText k="premiumActivated" />
          </p>

          {/* Features */}
          <div className="bg-[#252540] rounded-xl p-6 mb-6 text-left">
            <h3 className="text-white font-semibold mb-3">
              <LocaleText k="youNowHaveAccess" />
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Check className="text-purple-400 text-lg" />
                <LocaleText k="success_feature_unlimited_filtering" />
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-purple-400 text-lg" />
                <LocaleText k="success_feature_icebreakers" />
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-purple-400 text-lg" />
                <LocaleText k="success_feature_ad_free" />
              </li>
            </ul>
          </div>

          {/* Redirect Info */}
          <p className="text-gray-500 text-sm">
            <LocaleText k="redirectingDashboard" />
          </p>

          {/* Manual Redirect Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <LocaleText k="goToDashboardNow" />
          </button>
        </div>
      </div>
    </div>
  );
}
