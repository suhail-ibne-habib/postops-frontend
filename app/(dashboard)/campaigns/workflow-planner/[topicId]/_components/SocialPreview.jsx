"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/api";
import { Play, ThumbsUp, MessageSquare, Share2, Globe } from "lucide-react";

export function SocialPreview({ title, content, hashtags, imageUrl }) {
  const { getToken } = useAuth();
  const [fbName, setFbName] = useState("Engr Habibullah");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/facebook-setting", { method: "GET" }, getToken);
        if (res.data && res.data.name) {
          setFbName(res.data.name);
        }
      } catch (err) {
        console.error("Failed to fetch FB settings for preview", err);
      }
    })();
  }, [getToken]);

  return (
    <div className="w-full md:w-72 shrink-0">
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Preview</p>
      <div className="bg-[#1c1e21] rounded-xl border border-[#3a3b3c] overflow-hidden text-sm font-sans">
        <PreviewHeader fbName={fbName} />
        <PreviewBody content={content} hashtags={hashtags} />
        <PreviewImage title={title} imageUrl={imageUrl} />
        <PreviewStats />
        <PreviewActions />
      </div>
    </div>
  );
}

function PreviewHeader({ fbName }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg shrink-0 relative">
        {fbName.charAt(0).toUpperCase()}
        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#1c1e21] flex items-center justify-center">
          <Play className="h-2.5 w-2.5 text-red-500 fill-current" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-[13px] leading-tight">{fbName}</p>
        <div className="flex items-center gap-1 text-[#b0b3b8] text-[11px] mt-0.5">
          <span>Just now</span>
          <span>·</span>
          <Globe className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

function PreviewBody({ content, hashtags }) {
  return (
    <div className="px-3 pb-3 text-[#e4e6eb] text-[13px] leading-relaxed whitespace-pre-wrap">
      {content || <span className="text-[#b0b3b8] italic">Your post will appear here…</span>}
      {hashtags && <span className="text-blue-400"> {hashtags}</span>}
    </div>
  );
}

function PreviewImage({ title, imageUrl }) {
  if (!title && !imageUrl) return null;
  return (
    <div className="mx-3 mb-3 rounded-lg overflow-hidden border border-[#3a3b3c] bg-black">
      {imageUrl ? (
        <img src={imageUrl} alt={title || "Generated image"} className="w-full object-cover" />
      ) : (
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
          <p className="text-white font-bold text-center text-[13px] leading-snug">{title}</p>
        </div>
      )}
    </div>
  );
}

function PreviewStats() {
  return (
    <div className="px-3 py-1.5 flex items-center justify-between text-[#b0b3b8] text-[12px] border-t border-[#3a3b3c]">
      <div className="flex items-center gap-1">
        <span className="flex -space-x-1">
          <span className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px]">👍</span>
          <span className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[9px]">❤️</span>
        </span>
        <span>24</span>
      </div>
      <div className="flex items-center gap-2">
        <span>3 comments</span>
        <span>1 share</span>
      </div>
    </div>
  );
}

function PreviewActions() {
  const actions = [
    { icon: ThumbsUp, label: "Like" },
    { icon: MessageSquare, label: "Comment" },
    { icon: Share2, label: "Share" },
  ];
  return (
    <div className="flex border-t border-[#3a3b3c]">
      {actions.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[#b0b3b8] hover:bg-[#3a3b3c]/60 transition-colors text-[12px] font-semibold"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
