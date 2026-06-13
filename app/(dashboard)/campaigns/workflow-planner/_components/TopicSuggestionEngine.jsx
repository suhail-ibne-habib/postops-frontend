"use client";

import { Sparkles, Hash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PromptInput } from "@/app/(dashboard)/business-setup/_components/PromptInput";

const COUNTS = [1, 2, 3, 4, 5, 6, 7];

export function TopicSuggestionEngine({ value, onChange, onSubmit, loading, count, onCountChange }) {
  return (
    <div className="border border-[#1f293d] rounded-2xl p-6 bg-[#131926] space-y-5 shadow-lg shadow-black/10 relative overflow-hidden">
      {/* Decorative bg sparkle */}
      <Sparkles className="absolute top-4 right-4 h-24 w-24 text-purple-500/5 rotate-12 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white leading-none">Topic Suggestion Engine</h3>
          <p className="text-xs text-purple-400 font-medium mt-1">AI-Powered Campaign Generator</p>
        </div>
      </div>

      {/* Count selector */}
      <div className="space-y-2.5 relative z-10">
        <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Hash className="h-3 w-3" />
          Number of Topics to Generate
        </Label>
        <div className="flex items-center gap-2 flex-wrap">
          {COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onCountChange(n)}
              className={`h-9 w-9 rounded-xl text-sm font-bold transition-all duration-150 border ${
                count === n
                  ? "bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-500/20"
                  : "bg-[#0b0f19] border-[#1f293d] text-slate-400 hover:border-purple-500/50 hover:text-white"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-xs text-slate-500 ml-1">topic{count !== 1 ? "s" : ""} selected</span>
        </div>
      </div>

      {/* Prompt input */}
      <div className="space-y-2.5 relative z-10">
        <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Describe Your Campaign Goal
        </Label>
        <PromptInput
          name="campaignGoal"
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={loading}
          disabled={loading}
          placeholder="e.g. 'Winter sale announcement focusing on sustainable outdoor gear for high-altitude trekking'..."
        />
        <p className="text-[11px] text-slate-500 italic">
          Press Enter or click ↵ to generate {count} topic{count !== 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
}
