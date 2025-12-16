"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  Users,
  Crown,
  Settings,
  User,
  VolumeX,
  Flag,
  SkipForward,
  Sparkles,
  Smile,
  PlusCircle,
  Send,
} from "lucide-react";
import { LocaleText } from "@/components/ui/locale-text";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  id: number;
  text: string;
  sender: "stranger" | "user";
  timestamp?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm trying out the AI icebreakers, they're pretty cool. Have you used them yet?",
      sender: "stranger",
    },
    {
      id: 2,
      text: "Oh really? Which one did you get? I've been getting some funny ones lately. 😂",
      sender: "user",
    },
    {
      id: 3,
      text: 'It asked me "If animals could talk, which would be the rudest?". I think cats, definitely. They judge us silently already. 😼',
      sender: "stranger",
    },
    {
      id: 4,
      text: "Haha absolutely! Although a Llama spitting facts would be pretty brutal too. 🦙",
      sender: "user",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleAiStarter = (text: string) => {
    setInputMessage(text);
  };

  const handleNextStranger = () => {
    // TODO: Implement next stranger logic
    router.push("/preferences");
  };

  return (
    <div className="flex h-screen bg-[#1a1a2e] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#16162a] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white text-xl" />
            </div>
            <span className="text-white font-bold text-lg">
              <LocaleText k="appName" />
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon={<MessageCircle />}
            label={<LocaleText k="nav_activeChat" />}
            active
            onClick={() => router.push("/chat")}
          />
          <NavItem
            icon={<Users />}
            label={<LocaleText k="nav_matches" />}
            badge="2"
            onClick={() => router.push("/matches")}
          />
          <NavItem
            icon={<Crown />}
            label={<LocaleText k="nav_premium" />}
            onClick={() => router.push("/premium")}
          />
          <NavItem
            icon={<Settings />}
            label={<LocaleText k="nav_settings" />}
            onClick={() => router.push("/settings")}
          />
        </nav>

        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#16162a]"></div>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Sarah_99</p>
              <p className="text-green-500 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <LocaleText k="online" />
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-[#16162a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2a2a44] flex items-center justify-center">
              <User className="text-gray-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-semibold">Stranger #4291</h2>
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded font-medium">
                  <LocaleText k="matched" />
                </span>
              </div>
              <p className="text-xs text-gray-400">
                <LocaleText k="interestMatchPrefix" />{" "}
                <span className="text-purple-400">Sci-Fi Movies</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <VolumeX className="text-gray-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Flag className="text-gray-400" />
            </button>
            <button
              onClick={handleNextStranger}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <span>
                <LocaleText k="nextStranger" />
              </span>
              <SkipForward className="text-lg" />
            </button>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 my-scroll-container">
          {/* Timestamp */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-500 bg-[#16162a] px-3 py-1 rounded-full">
              TODAY 10:23 AM
            </span>
          </div>

          {/* System Message */}
          <div className="flex justify-center">
            <p className="text-sm text-gray-400 bg-[#16162a] px-4 py-2 rounded-lg">
              You are now chatting with a random stranger. Say hi! 👋
            </p>
          </div>

          {/* Chat Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === "stranger"
                    ? "bg-[#2a2a44] text-white"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#2a2a44] flex items-center justify-center">
                  <User className="text-gray-400 text-sm" />
                </div>
              </div>
              <div className="bg-[#2a2a44] px-5 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          {/* AI Conversation Starters */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-purple-400 text-sm" />
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <LocaleText k="aiIcebreakers" />
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <StarterButton
                icon={<Smile />}
                text={<LocaleText k="starter_dad_joke" />}
                onClick={() => handleAiStarter("Tell me a dad joke")}
              />
              <StarterButton
                text={<LocaleText k="starter_would_you_rather" />}
                onClick={() => handleAiStarter("Would you rather...?")}
              />
              <StarterButton
                text={<LocaleText k="starter_best_travel" />}
                onClick={() =>
                  handleAiStarter("What's your best travel story?")
                }
              />
              <StarterButton
                text={<LocaleText k="starter_movie_recommendation" />}
                onClick={() => handleAiStarter("Any movie recommendations?")}
              />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#16162a] border-t border-white/10 px-6 py-2">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <PlusCircle className="text-gray-400" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={t("placeholder_type_message")}
              className="flex-1 bg-[#2a2a44] text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Smile className="text-gray-400" />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors"
            >
              <Send className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick: () => void;
}

function NavItem({ icon, label, active, badge, onClick }: NavItemProps) {
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
      <span className="font-medium text-sm flex-1 text-left">{label}</span>
      {badge && (
        <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

interface StarterButtonProps {
  icon?: React.ReactNode;
  text: string;
  onClick: () => void;
}

function StarterButton({ icon, text, onClick }: StarterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#2a2a44] hover:bg-[#323252] text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
    >
      {icon && <div className="text-base">{icon}</div>}
      <span>{text}</span>
    </button>
  );
}
