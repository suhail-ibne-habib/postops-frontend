"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export function AccordionSection({ icon: Icon, title, open, onToggle, children }) {
  return (
    <div className="border border-[#1f293d] rounded-sm overflow-hidden bg-[#131926]">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-[#1e293b]/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-slate-300" />
          <span className="font-bold text-sm text-slate-200">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-5 pt-4 border-t border-[#1f293d]">
          {children}
        </div>
      )}
    </div>
  );
}
