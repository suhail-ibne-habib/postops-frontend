"use client";

import { Download, CalendarClock, Share2, ImageIcon, Play, FileText, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const SOCIAL_ICONS = {
  linkedin: { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  twitter: { icon: MessageSquare, color: "text-sky-400", bg: "bg-sky-400/10" },
  threads: { icon: Share2, color: "text-purple-400", bg: "bg-purple-400/10" },
  instagram: { icon: ImageIcon, color: "text-pink-500", bg: "bg-pink-500/10" },
  facebook: { icon: FileText, color: "text-blue-600", bg: "bg-blue-600/10" },
  youtube: { icon: Play, color: "text-red-500", bg: "bg-red-500/10" },
};

export function PostCard({ post, onClick }) {
  // const platform = post.platform?.toLowerCase() || "linkedin";
  const { icon: Icon, color } = SOCIAL_ICONS.facebook;

  return (
    <div
      onClick={() => onClick?.(post)}
      className="group cursor-pointer border border-[#1f293d] rounded-2xl bg-[#131926] overflow-hidden flex flex-col transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-[#0b0f19] overflow-hidden border-b border-[#1f293d]">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform group-hover:scale-105 duration-500"
          />
        ) : (
          <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-600 to-blue-400" />
        )}

        <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#0b0f19]/80 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-[#1f293d]">
          <Icon className={`h-3 w-3 ${color}`} />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {post.platform}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="text-white font-bold text-lg leading-tight mb-2">
          {post.title}
        </h4>
        <p className="text-sm text-slate-400 line-clamp-3 mb-3">
          {post.content || "This is a placeholder for the generated post content. It will contain engaging copy tailored for the selected platform."}
        </p>
        <div className="mt-auto pt-2">
          <p className="text-xs text-purple-400 font-medium">
            {post.hashtags || "#Campaign #Marketing #Growth"}
          </p>
        </div>
      </div>

      {/* ── Actions ───────────────────────────────────────────────────── */}
      <div className="p-4 flex items-center justify-between bg-[#0b0f19] border-t border-[#1f293d]" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9 bg-[#131926] border-[#1f293d] text-slate-400 hover:text-white hover:bg-slate-800" title="Download Media">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9 bg-[#131926] border-[#1f293d] text-slate-400 hover:text-white hover:bg-slate-800" title="Schedule" onClick={() => onClick?.(post)}>
            <CalendarClock className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="h-9 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 shadow-md shadow-blue-600/20"
          onClick={() => onClick?.(post)}
        >
          <Send className="h-4 w-4 mr-2" />
          Post Now
        </Button>
      </div>
    </div>
  );
}
