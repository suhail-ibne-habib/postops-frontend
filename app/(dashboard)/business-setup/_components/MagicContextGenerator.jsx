"use client";

import { Sparkles, Info, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptInput } from "./PromptInput";

export function MagicContextGenerator({
  value,
  onChange,
  onSubmit,
  loading,
  generatedData,
  onApply,
  onDiscard,
  currentContext,
}) {
  return (
    <div className="border border-[#1f293d] rounded-2xl p-6 bg-[#131926] space-y-5 shadow-lg shadow-black/10">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#241a42] border border-[#4c1d95]/40 text-[#a78bfa]">
          <Sparkles className="h-5 w-5 fill-[#a78bfa]/10" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white leading-none">Magic Context Generator</h3>
          <p className="text-xs text-[#a78bfa] font-medium mt-1">Advanced AI Data Extraction</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <Label className="text-slate-400 text-xs font-semibold">Website URL or Brand Description</Label>
        <PromptInput
          name="websiteUrl"
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          disabled={loading}
          loading={loading}
          placeholder="https://yourbrand.com or Describe what your business does..."
        />
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400 italic mt-2">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          Populates business info, tone, and audience automatically.
        </p>
      </div>

      {/* ── Generated AI Suggestions Card ───────────────────────────────── */}
      {generatedData && (
        <div className="border border-purple-500/20 bg-[#161329] rounded-xl p-5 space-y-4 shadow-md shadow-purple-500/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#a78bfa]" />
              <span className="text-sm font-bold text-slate-100">Proposed AI Suggestions</span>
            </div>
            <span className="text-[10px] font-bold text-[#a78bfa] uppercase bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              Extracted
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[9px]">
                Business Summary
              </span>
              <p className="text-slate-200 leading-relaxed font-normal bg-[#0b0f19] p-3 rounded-lg border border-[#1f293d]/50">
                {generatedData.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[9px]">
                  Suggested Tone
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {generatedData.tone.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="text-purple-300 bg-purple-500/10 border-purple-500/20 px-2.5 py-0.5 text-[10px] rounded-lg"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[9px]">
                  Target Audience
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {generatedData.audience.map((a) => (
                    <Badge
                      key={a}
                      variant="outline"
                      className="text-blue-300 bg-blue-500/10 border-blue-500/20 px-2.5 py-0.5 text-[10px] rounded-lg"
                    >
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1f293d]/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDiscard}
              className="text-slate-400 hover:text-white hover:bg-transparent text-xs font-semibold px-3 h-8 border-0"
            >
              Discard
            </Button>
            <Button
              size="sm"
              onClick={onApply}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 h-8 rounded-lg shadow-sm border-0 transition-all duration-200"
            >
              Apply Suggestions
            </Button>
          </div>
        </div>
      )}

      {/* ── Active Saved Context Card ───────────────────────────────────── */}
      {currentContext && currentContext.description && !generatedData && (
        <div className="border border-[#1f293d] bg-[#0b0f19]/40 rounded-xl p-4.5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-bold text-slate-200">Active Brand Context</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <p className="text-slate-300 leading-relaxed font-normal bg-[#0b0f19]/20 p-3 rounded-lg border border-[#1f293d]/20">
                {currentContext.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentContext.tone && currentContext.tone.length > 0 && (
                <div className="space-y-1">
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[9px]">
                    Brand Tone
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentContext.tone.split(",").map((t) => (
                      <Badge
                        key={t.trim()}
                        variant="outline"
                        className="text-slate-300 bg-slate-800 border-slate-700/50 px-2 py-0.5 text-[10px] rounded-lg animate-fade-in"
                      >
                        {t.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {currentContext.audience && currentContext.audience.length > 0 && (
                <div className="space-y-1">
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[9px]">
                    Target Audience
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentContext.audience.split(",").map((a) => (
                      <Badge
                        key={a.trim()}
                        variant="outline"
                        className="text-slate-300 bg-slate-800 border-slate-700/50 px-2 py-0.5 text-[10px] rounded-lg animate-fade-in"
                      >
                        {a.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
