"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Check, Play, LayoutTemplate } from "lucide-react";

export function AccountsSidebar() {
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
        console.error("Failed to fetch FB settings for sidebar", err);
      }
    })();
  }, [getToken]);

  return (
    <div className="hidden sm:flex w-60 md:w-72 border-r border-[#1f293d] bg-[#131926] p-4 flex-col shrink-0">
      <p className="text-sm text-slate-400 mb-6">
        Select the social accounts you would like to post from. You may select
        multiple accounts from the same social platforms.
      </p>

      <Button
        variant="outline"
        className="w-full bg-[#0b0f19] border-[#1f293d] text-white hover:bg-slate-800 hover:text-white mb-4"
      >
        <Plus className="h-4 w-4 mr-2" /> Add account
      </Button>

      {/* All-platforms option */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-[#1f293d] bg-[#0b0f19] mb-4 cursor-pointer hover:border-purple-500/50 transition-colors">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-4 w-4 text-slate-400" />
          <span className="font-semibold text-sm">All platforms</span>
        </div>
        <Check className="h-4 w-4 text-slate-400" />
      </div>

      {/* Connected account */}
      <div className="space-y-1">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold relative">
              {fbName.charAt(0).toUpperCase()}
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#0b0f19] flex items-center justify-center">
                <Play className="h-2.5 w-2.5 text-red-500 fill-current" />
              </div>
            </div>
            <span className="text-sm font-medium group-hover:text-white text-slate-300">
              {fbName}
            </span>
          </div>
          <Check className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}
