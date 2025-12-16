"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  Image,
  Info,
  BadgeCheck,
  Palette,
  Lock,
  Shield,
  Users,
  Link,
  LayoutDashboard,
  BarChart,
  Brain,
  ArrowLeft,
} from "lucide-react";
import { LocaleText } from "@/components/ui/locale-text";

type PlanType = "personal" | "business";

export default function PremiumPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<PlanType>("business");
  const currentPlan = "free"; // TODO: Get from user context

  const handleUpgrade = () => {
    router.push("/premium/checkout");
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="w-full max-w-6xl mb-8 relative">
        <button
          onClick={handleCancel}
          className="absolute top-0 left-0 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <LocaleText k="cancel" />
        </button>
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          <LocaleText k="premiumHeader" />
        </h1>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8">
            <h2 className="text-white text-2xl font-bold mb-6">
              <LocaleText k="plan_free" />
            </h2>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-white text-5xl font-bold">0</span>
                <span className="text-gray-400">VNĐ / tháng</span>
              </div>
              <p className="text-gray-400 text-sm">
                <LocaleText k="freeSubtitle" />
              </p>
            </div>

            {currentPlan === "free" && (
              <div className="mb-6">
                <div className="bg-[#252540] text-white text-center py-3 rounded-lg font-medium">
                  <LocaleText k="currentPlanLabel" />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <FeatureItem
                icon={<Sparkles />}
                text={<LocaleText k="feature_simple_explanations" />}
              />
              <FeatureItem
                icon={<MessageCircle />}
                text={<LocaleText k="feature_handle_queries" />}
              />
              <FeatureItem
                icon={<Image />}
                text={<LocaleText k="feature_image_generation" />}
              />
              <FeatureItem
                icon={<Info />}
                text={<LocaleText k="feature_memory" />}
              />
            </div>
          </div>

          {/* Business Plan */}
          <div className="bg-gradient-to-br from-[#2d2d52] to-[#1e1e32] rounded-3xl border border-purple-500/30 p-8 relative">
            {/* Recommended Badge */}
            <div className="absolute -top-3 right-8">
              <span className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                <LocaleText k="recommended" />
              </span>
            </div>

            <h2 className="text-white text-2xl font-bold mb-6">
              <LocaleText k="plan_business" />
            </h2>

            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-white text-5xl font-bold">199.000</span>
                <span className="text-gray-400">
                  VNĐ / tháng (theo phần VAT)
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                <LocaleText k="businessSubtitle" />
              </p>
            </div>

            <button
              onClick={handleUpgrade}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-colors mb-6"
            >
              <LocaleText k="upgradeToBusiness" />
            </button>

            <div className="space-y-3">
              <FeatureItem
                icon={<BadgeCheck />}
                text={<LocaleText k="biz_feature_analytics" />}
              />
              <FeatureItem
                icon={<MessageCircle />}
                text={<LocaleText k="biz_feature_unlimited_messages" />}
              />
              <FeatureItem
                icon={<Palette />}
                text={<LocaleText k="biz_feature_media" />}
              />
              <FeatureItem
                icon={<Lock />}
                text={<LocaleText k="biz_feature_security" />}
              />
              <FeatureItem
                icon={<Shield />}
                text={<LocaleText k="biz_feature_privacy" />}
              />
              <FeatureItem
                icon={<Users />}
                text={<LocaleText k="biz_feature_sharing" />}
              />
              <FeatureItem
                icon={<Link />}
                text={<LocaleText k="biz_feature_integrations" />}
              />
              <FeatureItem
                icon={<LayoutDashboard />}
                text={<LocaleText k="biz_feature_workflows" />}
              />
              <FeatureItem
                icon={<BarChart />}
                text={<LocaleText k="biz_feature_transcription" />}
              />
              <FeatureItem
                icon={<Brain />}
                text={<LocaleText k="biz_feature_agents" />}
              />
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400">
                <LocaleText k="biz_footer_users" />
              </p>
              <p className="text-xs text-gray-400 mt-1">
                <LocaleText k="biz_footer_note" />{" "}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  <LocaleText k="learnMore" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-gray-400 text-xl flex-shrink-0 mt-0.5">{icon}</div>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
