"use client";

import React from "react";
import { Sparkles, MessageSquare, Image as ImageIcon, Send } from "lucide-react";

export default function AIEditorPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">AI Editor</h2>
        <p className="text-muted-foreground mt-1 text-sm">Draft, optimize, and polish captions and creative assets using AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Copywriter Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">AI Copywriter</h3>
            <p className="text-xs text-muted-foreground">Draft high-conversion captions using DeepSeek models.</p>
          </div>
          <button className="w-full py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary/95 rounded-xl transition-all">
            Launch Copywriter
          </button>
        </div>

        {/* Graphics Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">AI Creative Studio</h3>
            <p className="text-xs text-muted-foreground">Generate matching social graphics via OpenAI DALL-E.</p>
          </div>
          <button className="w-full py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all">
            Launch Creative Studio
          </button>
        </div>
      </div>
    </div>
  );
}
