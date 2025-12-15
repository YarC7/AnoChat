"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <div className="w-full max-w-6xl mb-8">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          Nâng cấp gói của bạn
        </h1>

      </div>

      {/* Pricing Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8">
          <h2 className="text-white text-2xl font-bold mb-6">Free</h2>

          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-white text-5xl font-bold">₫0</span>
              <span className="text-gray-400">VNĐ / tháng</span>
            </div>
            <p className="text-gray-400 text-sm">Xem AI có thể làm gì</p>
          </div>

          {currentPlan === "free" && (
            <div className="mb-6">
              <div className="bg-[#252540] text-white text-center py-3 rounded-lg font-medium">
                Gói hiện tại của bạn
              </div>
            </div>
          )}

          <div className="space-y-3">
            <FeatureItem
              icon="auto_awesome"
              text="Nhận lời giải thích đơn giản"
            />
            <FeatureItem
              icon="chat"
              text="Thực hiện các đoạn nội dung dễ giải đáp những câu hỏi thường gặp"
            />
            <FeatureItem icon="image" text="Thử tính năng tạo hình ảnh" />
            <FeatureItem
              icon="info"
              text="Tiết kiệm bộ nhớ và ngữ cảnh hạn chế"
            />
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-gradient-to-br from-[#2d2d52] to-[#1e1e32] rounded-3xl border border-purple-500/30 p-8 relative">
          {/* Recommended Badge */}
          <div className="absolute -top-3 right-8">
            <span className="bg-purple-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
              ĐƯỢC ĐỀ XUẤT
            </span>
          </div>

          <h2 className="text-white text-2xl font-bold mb-6">Business</h2>

          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-white text-5xl font-bold">₫649.000</span>
              <span className="text-gray-400">VNĐ / tháng (theo phần VAT)</span>
            </div>
            <p className="text-gray-300 text-sm">
              Hoàn thành nhiều công việc hơn với AI cho các nhóm
            </p>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl transition-colors mb-6"
          >
            Chuyển sang Business
          </button>

          <div className="space-y-3">
            <FeatureItem
              icon="verified"
              text="Tiền hành phần tích chuyên nghiệp"
            />
            <FeatureItem icon="chat" text="Nhận tin không giới hạn với GPT-5" />
            <FeatureItem
              icon="palette"
              text="Tạo hình ảnh, video, slide và nhiều nội dung khác"
            />
            <FeatureItem
              icon="lock"
              text="Bảo mật không gian của bạn bằng SSO, MFA và nhiều tính năng khác"
            />
            <FeatureItem
              icon="shield"
              text="Bảo vệ quyền riêng tư tuyệt đối không sử dụng dữ liệu cho huấn luyện"
            />
            <FeatureItem icon="forum" text="Chia sẻ dữ án và GPT tùy chỉnh" />
            <FeatureItem
              icon="link"
              text="Tích hợp với SharePoint và các công cụ khác"
            />
            <FeatureItem
              icon="dashboard"
              text="Đơn giản hóa quy trình thanh toán và quản lý người dùng"
            />
            <FeatureItem
              icon="bar_chart"
              text="Ghi lại chi chú cuộc họp bằng tính năng chép lời"
            />
            <FeatureItem
              icon="psychology"
              text="Triển khai các tác nhân để viết mã và nghiên cứu"
            />
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-400">
              Dành cho 2+ người dùng, thanh toán hằng năm
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Không giới hạn thuốc vào các quy định bảo vệ tránh lạm dụng.{" "}
              <a
                href="#"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Tìm hiểu thêm
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: string;
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="material-symbols-outlined text-gray-400 text-xl flex-shrink-0 mt-0.5">
        {icon}
      </span>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
