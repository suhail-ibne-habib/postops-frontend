"use client";

import { CornerDownLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromptInput({ name, value, onChange, placeholder, onSubmit, disabled, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onSubmit && value?.trim() && !loading && !disabled) onSubmit();
    }
  };

  return (
    <div className="relative border border-[#1f293d] rounded-2xl bg-[#0b0f19] p-3 flex flex-col focus-within:ring-1 focus-within:ring-purple-500/30 transition-all duration-200 w-full">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "https://yourbrand.com or Describe what you do..."}
        className="w-full bg-transparent resize-none outline-none border-0 text-slate-200 placeholder:text-slate-500/60 text-sm py-2 px-3 min-h-[70px] focus:ring-0"
        disabled={disabled || loading}
      />
      <div className="flex items-center justify-end mt-1">
        <Button
          onClick={onSubmit}
          disabled={disabled || loading || !value?.trim()}
          type="button"
          className="h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 transition-all duration-200 p-0 cursor-pointer shadow-md disabled:bg-slate-800 disabled:text-slate-500"
          aria-label="Submit prompt"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CornerDownLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
