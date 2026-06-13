"use client";

import { Button } from "@/components/ui/button";
import { CalendarClock, ChevronLeft } from "lucide-react";

export function DialogFooter({ onPublish, isPublishing }) {
  return (
    <div className="border-t border-[#1f293d] bg-[#0b0f19] p-4 flex items-center justify-between shrink-0">
      <Button variant="outline" className="bg-[#131926] border-[#1f293d] text-white hover:bg-slate-800">
        <ChevronLeft className="h-4 w-4 mr-1" /> Bulk schedule
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="bg-[#131926] border-[#1f293d] text-white hover:bg-slate-800">
          <CalendarClock className="h-4 w-4 mr-2" /> Select time
        </Button>
        <Button 
          className="bg-white text-black hover:bg-gray-200 font-bold px-8"
          onClick={onPublish}
          disabled={isPublishing}
        >
          {isPublishing ? "Publishing..." : "Publish now"}
        </Button>
      </div>
    </div>
  );
}
