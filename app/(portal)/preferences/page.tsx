"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GenderPreference = "male" | "female" | "non-binary" | "surprise";

export default function PreferencesPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] =
    useState<GenderPreference>("surprise");
  const [aiIcebreakers, setAiIcebreakers] = useState(true);

  const handleFindMatch = () => {
    // TODO: Implement match finding logic
    console.log({ selectedGender, aiIcebreakers });
    router.push("/chat"); // Navigate to chat page
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">


      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Preferences Card */}
          <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-400 text-2xl">
                  tune
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-white text-2xl font-bold mb-2">
                Match Preferences
              </h1>
              <p className="text-gray-400 text-sm">
                Who would you like to connect ?
              </p>
            </div>

            {/* Gender Selection Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <GenderButton
                icon="male"
                label="Male"
                selected={selectedGender === "male"}
                onClick={() => setSelectedGender("male")}
              />
              <GenderButton
                icon="female"
                label="Female"
                selected={selectedGender === "female"}
                onClick={() => setSelectedGender("female")}
              />
              <GenderButton
                icon="transgender"
                label="Non-binary"
                selected={selectedGender === "non-binary"}
                onClick={() => setSelectedGender("non-binary")}
              />
              <GenderButton
                icon="auto_awesome"
                label="Surprise Me"
                selected={selectedGender === "surprise"}
                onClick={() => setSelectedGender("surprise")}
              />
            </div>

            {/* AI Icebreakers Toggle */}
            <div className="bg-[#252540] rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    AI Icebreakers
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Get AI help to start the chat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiIcebreakers(!aiIcebreakers)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  aiIcebreakers ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    aiIcebreakers ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Find Match Button */}
            <button
              onClick={handleFindMatch}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4"
            >
              <span>Find a Match</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            {/* Privacy Notice */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Chats are end-to-end encrypted & anonymous</span>
            </div>
          </div>

          {/* Cancel Link */}
          <div className="text-center mt-6">
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Cancel & go back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

interface GenderButtonProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function GenderButton({ icon, label, selected, onClick }: GenderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl transition-all duration-300 ${
        selected
          ? "bg-purple-600/20 border-2 border-purple-600"
          : "bg-[#2a2a44] border-2 border-transparent hover:border-white/10"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <span
          className={`material-symbols-outlined text-3xl ${
            selected ? "text-purple-400" : "text-gray-400"
          }`}
        >
          {icon}
        </span>
        <span
          className={`text-sm font-medium ${
            selected ? "text-white" : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
