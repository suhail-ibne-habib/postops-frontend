"use client";

import { Button } from "@/components/ui/button";
import { Wand2, Loader2, Send } from "lucide-react";

export function PostEditor({
  title,
  content,
  onChange,
  prompt,
  onPromptChange,
  onRewrite,
  isRegenerating,
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col bg-[#131926] border border-[#1f293d] rounded-xl overflow-hidden">
        {/* Post title */}
        <div className="px-4 pt-4 pb-2 border-b border-[#1f293d]">
          <h4 className="font-bold text-white text-sm">{title}</h4>
        </div>

        {/* Editable caption */}
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-full min-h-[160px] p-4 bg-transparent text-sm text-slate-300 resize-none outline-none leading-relaxed placeholder:text-slate-600"
          placeholder="Write your copy here…"
        />

        {/* AI prompt bar */}
        <form
          onSubmit={onRewrite}
          className="p-2 bg-[#0b0f19] border-t border-[#1f293d] flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4 text-purple-400 shrink-0" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            disabled={isRegenerating}
            placeholder='Ask AI… e.g. "make it shorter" or "more formal tone"'
            className="flex-1 bg-transparent text-sm text-slate-300 outline-none placeholder:text-slate-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isRegenerating || !prompt.trim()}
            className="p-1.5 rounded-md bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 disabled:opacity-30 transition-colors"
          >
            {isRegenerating
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <Send className="h-3.5 w-3.5" />}
          </button>
        </form>
      </div>

      {/* Full regenerate button */}
      <Button
        onClick={onRewrite}
        disabled={isRegenerating}
        variant="outline"
        className="mt-3 w-full bg-[#131926] border-[#1f293d] text-white hover:bg-slate-800 hover:text-purple-300 gap-2 transition-colors"
      >
        {isRegenerating
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Rewriting…</>
          : <><Wand2 className="h-4 w-4 text-purple-400" /> Rewrite</>}
      </Button>
    </div>
  );
}
