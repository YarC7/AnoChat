"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "vi-VN" | "en-US";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  "vi-VN": {
    // Common
    back: "Quay lại",
    save: "Lưu",
    cancel: "Hủy",
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    account: "Tài khoản",
    privacy: "Riêng tư",
    notifications: "Thông báo",
    support: "Hỗ trợ",

    // Settings page
    managePreferences: "Quản lý tùy chọn của bạn",
    accountSettings: "Cài đặt tài khoản",
    managePasswordAndDetails: "Quản lý mật khẩu và thông tin tài khoản.",
    changePassword: "Đổi mật khẩu",
    currentPassword: "Mật khẩu hiện tại",
    newPassword: "Mật khẩu mới",
    confirmNewPassword: "Xác nhận mật khẩu mới",
    enterCurrentPassword: "Nhập mật khẩu hiện tại",
    minimum8Characters: "Tối thiểu 8 ký tự",
    retypeNewPassword: "Nhập lại mật khẩu mới",
    updatePassword: "Cập nhật mật khẩu",
    recoveryEmail: "Email khôi phục",
    optionalRecovery:
      "Tùy chọn. Chỉ dùng để khôi phục tài khoản nếu bạn mất mật khẩu.",
    verify: "Xác minh",
    dangerZone: "Khu vực nguy hiểm",
    deleteWarning: "Khi xóa tài khoản, bạn không thể hoàn tác. Hãy chắc chắn.",
    deleteAccount: "Xóa tài khoản",
    privacyMatching: "Riêng tư & Ghép đôi",
    controlChatAndShare: "Kiểm soát ai bạn chat và chia sẻ bao nhiêu.",
    matchingPreference: "Tùy chọn ghép đôi",
    selectMatchingPreference:
      "Chọn ai bạn muốn ghép đôi trong chat ngẫu nhiên.",
    everyone: "Tất cả",
    male: "Nam",
    female: "Nữ",
    nonBinary: "Không nhị phân",
    ageRangePreference: "Tùy chọn độ tuổi",
    specifyAgeRange: "Chỉ định độ tuổi cho ghép đôi.",
    languagePreference: "Tùy chọn ngôn ngữ",
    selectLanguagePreference: "Chọn ngôn ngữ ưa thích cho cuộc trò chuyện.",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    locationPreference: "Tùy chọn vị trí",
    selectLocationPreference: "Chọn vị trí ưa thích.",
    global: "Toàn cầu",
    sameCountry: "Cùng quốc gia",
    sameCity: "Cùng thành phố",
    showLocation: "Hiển thị vị trí",
    allowLocationSharing: "Cho phép chia sẻ vị trí với người khác.",
    applicationLanguage: "Ngôn ngữ ứng dụng",
    selectAppLanguage: "Chọn ngôn ngữ sẽ được sử dụng trong toàn bộ ứng dụng.",
    vietnameseVN: "Tiếng Việt (vi-VN)",
    englishUS: "Tiếng Anh (en-US)",
    saveAllChanges: "Lưu tất cả thay đổi",
    comingSoon: "Sắp ra mắt...",

    // Checkout
    processing: "Đang xử lý...",
    payWithAmount: "Thanh toán {amount}",
    poweredBy: "Được cung cấp bởi",
    sslEncrypted: "Thanh toán mã hoá SSL",
    subscriptionNotice:
      "Bằng cách xác nhận đăng ký, bạn cho phép {app} tính phí thẻ của bạn cho khoản thanh toán này và các khoản thanh toán trong tương lai theo Điều khoản của chúng tôi.",

    // Checkout Button
    buyNow: "Mua ngay",

    // Premium
    premiumHeader: "Nâng cấp gói của bạn",
    plan_free: "Miễn phí",
    plan_business: "Doanh nghiệp",
    freeSubtitle: "Xem AI có thể làm gì",
    currentPlanLabel: "Gói hiện tại của bạn",
    upgradeToBusiness: "Chuyển sang Business",
    recommended: "ĐƯỢC ĐỀ XUẤT",
    goToDashboardNow: "Chuyển đến Bảng điều khiển ngay",
    paymentSuccessful: "Thanh toán thành công!",
    premiumActivated:
      "Đăng ký Premium của bạn đã được kích hoạt. Tận hưởng tất cả các tính năng!",
    redirectingDashboard: "Chuyển hướng đến bảng điều khiển trong vài giây...",

    // Success page
    youNowHaveAccess: "Bạn hiện đã có quyền truy cập vào:",
    success_feature_unlimited_filtering: "Bộ lọc giới tính không giới hạn",
    success_feature_icebreakers: "50 gợi ý AI / Ngày",
    success_feature_ad_free: "Trải nghiệm không quảng cáo",

    // Landing page
    usersOnline: "{count} người đang online",
    heroTitleLine1: "Kết nối ngay lập tức.",
    heroTitleLine2: "Chat ẩn danh.",
    heroSubtitle:
      "Kết nối với người lạ một cách an toàn. AI của chúng tôi gợi ý câu bắt chuyện và giúp bạn tìm người phù hợp.",
    startNow: "Bắt đầu ngay",
    totalAnonymity: "Bảo mật tuyệt đối",
    aiIcebreakers: "Gợi ý AI",
    aiIcebreakersDesc:
      "Bị bối rối không biết nói gì? AI của chúng tôi gợi ý câu bắt chuyện dựa trên ngữ cảnh.",
    smartMatching: "Ghép đôi thông minh",
    smartMatchingDesc:
      "Lọc theo giới tính hoặc sở thích để tìm người bạn thực sự muốn trò chuyện.",
    totalAnonymityDesc:
      "Danh tính của bạn được bảo mật. Chúng tôi không lưu nhật ký hay dữ liệu cá nhân. Trò chuyện an toàn.",
    terms: "Điều khoản Dịch vụ",
    privacyPolicy: "Chính sách Bảo mật",
    communityGuidelines: "Nguyên tắc Cộng đồng",

    // App and Nav
    appName: "AnonChat",
    nav_activeChat: "Trò chuyện",
    nav_matches: "Ghép đôi",
    nav_premium: "Cao cấp",
    nav_settings: "Cài đặt",
    online: "Online",
    matched: "MATCHED",
    interestMatchPrefix: "Sở thích phù hợp:",
    nextStranger: "Người tiếp theo",

    // Chat
    aiIcebreakers: "Gợi ý AI",
    starter_dad_joke: "Kể cho tôi một câu chuyện " + "(dad joke)",
    starter_would_you_rather: "Bạn muốn gì hơn...?",
    starter_best_travel: "Kể về chuyến đi đáng nhớ nhất",
    starter_movie_recommendation: "Gợi ý phim",
    placeholder_type_message: "Nhập tin nhắn...",

    // Dashboard & Profile
    dashboardTitle: "Dashboard",
    totalUsers: "Tổng số người dùng",
    revenue: "Doanh thu",
    products: "Sản phẩm",
    accountInformation: "Thông tin tài khoản",
    emailLabel: "Email:",
    nameLabel: "Tên:",
    saveChanges: "Lưu thay đổi",
    signOut: "Đăng xuất",
  },
  "en-US": {
    // Common
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    settings: "Settings",
    language: "Language",
    account: "Account",
    privacy: "Privacy",
    notifications: "Notifications",
    support: "Support",

    // Settings page
    managePreferences: "Manage your preferences",
    accountSettings: "Account Settings",
    managePasswordAndDetails: "Manage your password and account details.",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    enterCurrentPassword: "Enter current password",
    minimum8Characters: "Minimum 8 characters",
    retypeNewPassword: "Retype new password",
    updatePassword: "Update Password",
    recoveryEmail: "Recovery Email",
    optionalRecovery:
      "Optional. Used only for account recovery if you lose your password.",
    verify: "Verify",
    dangerZone: "Danger Zone",
    deleteWarning:
      "Once you delete your account, there is no going back. Please be certain.",
    deleteAccount: "Delete Account",
    privacyMatching: "Privacy & Matching",
    controlChatAndShare: "Control who you chat with and how much you share.",
    matchingPreference: "Matching Preference",
    selectMatchingPreference:
      "Select who you would prefer to be matched with in random chats.",
    everyone: "Everyone",
    male: "Male",
    female: "Female",
    nonBinary: "Non-binary",
    ageRangePreference: "Age Range Preference",
    specifyAgeRange: "Specify the age range for matches.",
    languagePreference: "Language Preference",
    selectLanguagePreference:
      "Select your preferred language for conversations.",
    english: "English",
    vietnamese: "Vietnamese",
    locationPreference: "Location Preference",
    selectLocationPreference: "Select your preferred location.",
    global: "Global",
    sameCountry: "Same Country",
    sameCity: "Same City",
    showLocation: "Show Location",
    allowLocationSharing: "Allow sharing your location with others.",
    applicationLanguage: "Application Language",
    selectAppLanguage:
      "Select the language that will be used throughout the application.",
    vietnameseVN: "Vietnamese (vi-VN)",
    englishUS: "English (en-US)",
    saveAllChanges: "Save All Changes",
    comingSoon: "Coming soon...",

    // Checkout
    processing: "Processing...",
    payWithAmount: "Pay {amount}",
    poweredBy: "Powered by",
    sslEncrypted: "SSL Encrypted Payment",
    subscriptionNotice:
      "By confirming your subscription, you allow {app} to charge your card for this payment and future payments in accordance with our Terms.",

    // Checkout Button
    buyNow: "Buy Now",

    // Premium
    premiumHeader: "Upgrade your plan",
    plan_free: "Free",
    plan_business: "Business",
    freeSubtitle: "See what AI can do",
    currentPlanLabel: "Your current plan",
    upgradeToBusiness: "Switch to Business",
    recommended: "RECOMMENDED",
    goToDashboardNow: "Go to Dashboard Now",
    paymentSuccessful: "Payment Successful!",
    premiumActivated:
      "Your premium subscription has been activated. Enjoy all the premium features!",
    redirectingDashboard: "Redirecting to dashboard in a few seconds...",

    // Success page
    youNowHaveAccess: "You now have access to:",
    success_feature_unlimited_filtering: "Unlimited Gender Filtering",
    success_feature_icebreakers: "50 AI Icebreakers / Day",
    success_feature_ad_free: "Ad-Free Experience",

    // Landing page
    usersOnline: "{count} users online",
    heroTitleLine1: "Connect instantly.",
    heroTitleLine2: "Chat anonymously.",
    heroSubtitle:
      "Meet random strangers safely. Let our AI break the ice for you and find your perfect conversation partner.",
    startNow: "Start Now",
    totalAnonymity: "Total Anonymity",
    aiIcebreakers: "AI Icebreakers",
    aiIcebreakersDesc:
      "Stuck on what to say? Our AI suggests conversation starters based on context.",
    smartMatching: "Smart Matching",
    smartMatchingDesc:
      "Filter by gender or interests to find the people you actually want to talk to.",
    totalAnonymityDesc:
      "Your identity is safe with us. We don't store logs or personal data. Chat freely.",
    terms: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    communityGuidelines: "Community Guidelines",

    // App and Nav
    appName: "AnonChat",
    nav_activeChat: "Active Chat",
    nav_matches: "Matches",
    nav_premium: "Premium",
    nav_settings: "Settings",
    online: "Online",
    matched: "MATCHED",
    interestMatchPrefix: "Interest match:",
    nextStranger: "Next Stranger",

    // Chat
    aiIcebreakers: "AI Conversation Starters",
    starter_dad_joke: "Tell me a dad joke",
    starter_would_you_rather: "Would you rather...?",
    starter_best_travel: "Best travel story",
    starter_movie_recommendation: "Movie recommendation",
    placeholder_type_message: "Type a message...",

    // Dashboard & Profile
    dashboardTitle: "Dashboard",
    totalUsers: "Total Users",
    revenue: "Revenue",
    products: "Products",
    accountInformation: "Account Information",
    emailLabel: "Email:",
    nameLabel: "Name:",
    saveChanges: "Save Changes",
    signOut: "Sign Out",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi-VN");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("app-language") as Language;
    if (
      savedLanguage &&
      (savedLanguage === "vi-VN" || savedLanguage === "en-US")
    ) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let template =
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key;

    if (!vars) return template as string;

    return String(template).replace(/\{(\w+)\}/g, (match, p1) => {
      const val = vars[p1];
      if (val === undefined || val === null) return match;
      if (typeof val === "number") {
        try {
          return new Intl.NumberFormat(language).format(val);
        } catch {
          return String(val);
        }
      }
      if (val instanceof Date) {
        try {
          return new Intl.DateTimeFormat(language).format(val as Date);
        } catch {
          return String(val);
        }
      }
      return String(val);
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
