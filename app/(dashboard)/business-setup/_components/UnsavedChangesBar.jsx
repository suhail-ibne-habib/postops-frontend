"use client";

import { Button } from "@/components/ui/button";

export function UnsavedChangesBar({ saving, onSave, onDiscard }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#131926]/95 backdrop-blur border border-[#1f293d] rounded-2xl shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
          </span>
          <span className="text-sm font-semibold text-slate-100">Unsaved configuration changes</span>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDiscard} 
            className="text-slate-300 hover:text-white hover:bg-transparent border-0 font-medium px-4 h-9"
          >
            Discard
          </Button>
          <Button 
            size="sm" 
            disabled={saving} 
            onClick={onSave} 
            className="bg-[#C7D2FE] text-[#1E1B4B] hover:bg-[#B4C3FE] border-0 font-semibold px-5 h-9 rounded-xl transition-all duration-200 shadow-md shadow-indigo-500/10"
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
