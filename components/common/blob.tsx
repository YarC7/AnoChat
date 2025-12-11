import React from "react";

const Blob = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white relative overflow-hidden">
      {/* Blobs for ambiance */}
      <div className="blob bg-primary w-[600px] h-[600px] rounded-full top-[-10%] left-[-10%] opacity-20 animate-pulse"></div>

      <div className="z-10 flex flex-col items-center space-y-8 p-8 max-w-md w-full text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary/30 flex items-center justify-center animate-[spin_3s_linear_infinite]">
            <div className="w-20 h-20 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-[spin_1s_linear_infinite]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-white">
              search
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Looking for a partner...
          </h2>
          <p className="text-gray-400 text-sm">
            Connecting you with someone who shares your interests.
          </p>
        </div>

        <div className="w-full bg-surface-accent rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-primary animate-[translateX_1.5s_ease-in-out_infinite] w-1/3 rounded-full"></div>
        </div>

        <button
        //   onClick={() => setView("landing")}
          className="text-gray-500 hover:text-white text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Blob;
