"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ type, onGenerate }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-[#1f293d] rounded-2xl bg-[#0b0f19]/50">
      <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
        <Sparkles className="h-8 w-8 text-purple-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        No {type} Yet
      </h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto mb-8">
        You don't have any {type.toLowerCase()} for this topic. Generate AI-powered content to get started.
      </p>
      <Button 
        onClick={onGenerate}
        className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 h-11 shadow-lg shadow-purple-600/20"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Generate {type}
      </Button>
    </div>
  );
}
