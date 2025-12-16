import React from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Bot, Heart } from "lucide-react";
import { LocaleText } from "@/components/ui/locale-text";

export const LandingPage = () => {
  const router = useRouter();
  const handleStartNowClick = () => {
    router.push("/login"); // Implement email sign-in logic here
  };
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display overflow-hidden bg-[#1a1a2e]">
      {/* Background Blobs */}
      <div className="blob bg-purple-600 w-[600px] h-[600px] rounded-full top-[-200px] left-[-200px] opacity-20"></div>
      <div className="blob bg-purple-500 w-[500px] h-[500px] rounded-full bottom-[-150px] right-[-150px] animation-delay-2000 opacity-15"></div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12 md:py-24">
        <div className="flex flex-col items-center max-w-[800px] w-full text-center space-y-8 animate-fade-in-up">
          {/* Online Count Badge */}
          <div className="flex items-center justify-center gap-x-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 py-2 px-4 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <p className="text-sm font-medium text-white">
              <LocaleText k="usersOnline" vars={{ count: 14205 }} />
            </p>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="tracking-tight text-5xl md:text-7xl font-black leading-[1.1] text-white">
              <LocaleText k="heroTitleLine1" /> <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-500 to-indigo-500">
                <LocaleText k="heroTitleLine2" />
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
              <LocaleText k="heroSubtitle" />
            </p>
          </div>

          {/* CTA Card */}
          <div className="w-full max-w-md backdrop-blur-md shadow-2xl rounded-2xl p-8 mt-8">
            <div className="flex flex-col gap-4">
              <button
                onClick={handleStartNowClick}
                className="group relative flex w-max-content cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300"
              >
                <span className="text-base font-semibold">
                  <LocaleText k="startNow" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] px-4 w-full">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#242438]/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 hover:bg-[#242438]/60 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-xl bg-linear-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <EyeOff />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">
              <LocaleText k="totalAnonymity" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <LocaleText k="totalAnonymityDesc" />
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#242438]/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 hover:bg-[#242438]/60 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-xl bg-linear-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <Bot />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">
              <LocaleText k="aiIcebreakers" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <LocaleText k="aiIcebreakersDesc" />
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#242438]/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 hover:bg-[#242438]/60 transition-all duration-300 group">
            <div className="h-16 w-16 rounded-xl bg-linear-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
              <Heart />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">
              <LocaleText k="smartMatching" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <LocaleText k="smartMatchingDesc" />
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-8 text-center backdrop-blur-sm">
        <div className="flex justify-center gap-8 mb-4">
          <FooterLink href="#">
            <LocaleText k="terms" />
          </FooterLink>
          <FooterLink href="#">
            <LocaleText k="privacyPolicy" />
          </FooterLink>
          <FooterLink href="#">
            <LocaleText k="communityGuidelines" />
          </FooterLink>
        </div>
        <p className="text-xs text-gray-500">
          © 2025 AnonChat Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    className="text-sm font-medium text-gray-500 hover:text-purple-400 transition-colors"
    href={href}
  >
    {children}
  </a>
);
