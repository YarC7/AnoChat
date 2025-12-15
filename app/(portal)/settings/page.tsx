"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  User,
  Shield,
  Bell,
  Sparkles,
  Headphones,
  BellRing,
  LogOut,
  Lock,
  Mail,
  Search,
  Info,
  EyeOff,
  Save,
  ArrowLeft,
} from "lucide-react";

type SettingsTab = "account" | "privacy" | "notifications" | "ai" | "support";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  // Account Settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("user@anonchat.com");

  // Privacy & Matching Settings
  const [matchingPreference, setMatchingPreference] = useState("everyone");
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [languagePreference, setLanguagePreference] = useState("english");
  const [locationPreference, setLocationPreference] = useState("global");
  const [showLocation, setShowLocation] = useState(true);

  // AI Features
  const [smartIcebreakers, setSmartIcebreakers] = useState(true);
  const [contentFilter, setContentFilter] = useState(true);

  const handleUpdatePassword = () => {
    console.log("Update password");
  };

  const handleVerifyEmail = () => {
    console.log("Verify email");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Delete account");
    }
  };

  const handleSaveChanges = () => {
    console.log("Save all changes");
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#16162a] border-r border-white/10 p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white text-xl" />
            </div>
            <span className="text-white font-bold text-lg">AnonChat</span>
          </div>
          <h1 className="text-white text-xl font-bold mb-1">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your preferences</p>
        </div>

        <nav className="space-y-1">
          <SettingsNavItem
            icon={<User />}
            label="Account"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
          <SettingsNavItem
            icon={<Shield />}
            label="Privacy & Matching"
            active={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
          />
          <SettingsNavItem
            icon={<Bell />}
            label="Notifications"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <SettingsNavItem
            icon={<Sparkles />}
            label="AI Features"
            active={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
          />
          <SettingsNavItem
            icon={<Headphones />}
            label="Support"
            active={activeTab === "support"}
            onClick={() => setActiveTab("support")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="text-lg" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <BellRing className="text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <LogOut className="text-gray-400" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  Account Settings
                </h2>
                <p className="text-gray-400 text-sm">
                  Manage your password and account details.
                </p>
              </div>

              {/* Change Password */}
              <div className="bg-[#1e1e32] rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="text-white" />
                  <h3 className="text-white font-semibold">Change Password</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full bg-[#252540] text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full bg-[#252540] text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Retype new password"
                      className="w-full bg-[#252540] text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdatePassword}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Recovery Email */}
              <div className="bg-[#1e1e32] rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="text-white" />
                  <h3 className="text-white font-semibold">Recovery Email</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Optional. Used only for account recovery if you lose your
                  password.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="flex-1 bg-[#252540] text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={handleVerifyEmail}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-950/20 rounded-2xl border border-red-500/30 p-6">
                <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2.5 bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 font-semibold rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Privacy & Matching Settings */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  Privacy & Matching
                </h2>
                <p className="text-gray-400 text-sm">
                  Control who you chat with and how much you share.
                </p>
              </div>

              {/* Matching Preference */}
              <SettingCard
                title="Matching Preference"
                description="Select who you would prefer to be matched with in random chats."
              >
                <select
                  value={matchingPreference}
                  onChange={(e) => setMatchingPreference(e.target.value)}
                  className="w-full bg-[#252540] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="everyone">Everyone</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </SettingCard>

              {/* Age Range Preference */}
              <SettingCard
                title="Age Range Preference"
                description="Specify the age range for matches."
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-400 font-semibold">18</span>
                    <span className="text-white font-semibold">
                      {ageRange[0]} - {ageRange[1]}
                    </span>
                    <span className="text-purple-400 font-semibold">65+</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={ageRange[1]}
                    onChange={(e) =>
                      setAgeRange([ageRange[0], parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-[#252540] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                  />
                </div>
              </SettingCard>

              {/* Language Preference */}
              <SettingCard
                title="Language Preference"
                description="Match with users who speak your language."
              >
                <select
                  value={languagePreference}
                  onChange={(e) => setLanguagePreference(e.target.value)}
                  className="w-full bg-[#252540] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </SettingCard>

              {/* Location Preference */}
              <SettingCard
                title="Location Preference"
                description="Match with users in specific locations like your country, city, or district."
              >
                <div className="space-y-3">
                  <select
                    value={locationPreference}
                    onChange={(e) => setLocationPreference(e.target.value)}
                    className="w-full bg-[#252540] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  >
                    <option value="global">Global (No Preference)</option>
                    <option value="country">My Country</option>
                    <option value="city">My City</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                    <input
                      type="text"
                      placeholder="City or District..."
                      className="w-full bg-[#252540] text-white placeholder-gray-500 pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
              </SettingCard>

              {/* Show Approximate Location */}
              <SettingCard
                title="Show Approximate Location"
                description="Display your city/country to match with locals."
                icon={<Info />}
              >
                <Toggle enabled={showLocation} onChange={setShowLocation} />
              </SettingCard>
            </div>
          )}

          {/* AI Features Settings */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-2xl font-bold">AI Features</h2>
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded font-semibold">
                  BETA
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Enhance your chat experience with AI tools.
              </p>

              {/* Smart Icebreakers */}
              <SettingCard
                icon={<Sparkles />}
                iconBg="bg-purple-600"
                title="Smart Icebreakers"
                description="Suggest conversation starters based on context."
              >
                <Toggle
                  enabled={smartIcebreakers}
                  onChange={setSmartIcebreakers}
                />
              </SettingCard>

              {/* Sensitive Content Filter */}
              <SettingCard
                icon={<EyeOff />}
                iconBg="bg-purple-600"
                title="Sensitive Content Filter"
                description="Blur images that might contain sensitive material."
              >
                <Toggle enabled={contentFilter} onChange={setContentFilter} />
              </SettingCard>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">
                  Notifications
                </h2>
                <p className="text-gray-400 text-sm">
                  Manage your notification preferences.
                </p>
              </div>
              <div className="text-gray-400 text-center py-12">
                Coming soon...
              </div>
            </div>
          )}

          {/* Support */}
          {activeTab === "support" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-2xl font-bold mb-2">Support</h2>
                <p className="text-gray-400 text-sm">
                  Get help and contact us.
                </p>
              </div>
              <div className="text-gray-400 text-center py-12">
                Coming soon...
              </div>
            </div>
          )}

          {/* Save Button */}
          {(activeTab === "account" ||
            activeTab === "privacy" ||
            activeTab === "ai") && (
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <Save />
                <span>Save All Changes</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface SettingsNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SettingsNavItem({
  icon,
  label,
  active,
  onClick,
}: SettingsNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active
          ? "bg-purple-600 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

interface SettingCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconBg?: string;
  children: React.ReactNode;
}

function SettingCard({
  title,
  description,
  icon,
  iconBg,
  children,
}: SettingCardProps) {
  return (
    <div className="bg-[#1e1e32] rounded-2xl border border-white/10 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon && (
              <div
                className={`w-8 h-8 ${
                  iconBg || "bg-purple-600/20"
                } rounded-lg flex items-center justify-center`}
              >
                <div
                  className={`text-xl ${
                    iconBg ? "text-white" : "text-purple-400"
                  }`}
                >
                  {icon}
                </div>
              </div>
            )}
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? "bg-purple-600" : "bg-gray-600"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          enabled ? "right-0.5" : "left-0.5"
        }`}
      />
    </button>
  );
}
