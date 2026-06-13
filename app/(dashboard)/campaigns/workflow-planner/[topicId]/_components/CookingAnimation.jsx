"use client";

import { Sparkles, Loader2, Image as ImageIcon, Wand2 } from "lucide-react";

export function CookingAnimation({ message = "AI is cooking your content..." }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 flex flex-col items-center justify-center text-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10 animate-pulse" />
      
      {/* Icons container */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative z-10 bg-[#0b0f19] border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4">
          <Wand2 className="h-6 w-6 text-purple-400 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1s" }} />
          <ImageIcon className="h-6 w-6 text-blue-400 animate-bounce" style={{ animationDelay: "150ms", animationDuration: "1s" }} />
          <Sparkles className="h-6 w-6 text-yellow-400 animate-bounce" style={{ animationDelay: "300ms", animationDuration: "1s" }} />
        </div>
      </div>

      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Working Magic
        </h3>
        <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-[250px] mx-auto">
          {message}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 text-xs text-slate-400 bg-black/40 px-4 py-2 rounded-full border border-white/5">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-purple-400" />
        <span>This usually takes 20-30 seconds</span>
      </div>
    </div>
  );
}
