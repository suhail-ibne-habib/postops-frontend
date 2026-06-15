"use client";

import { Button } from "@/components/ui/button";
import { CalendarClock, ChevronLeft } from "lucide-react";

export function DialogFooter({ onPublish, isPublishing }) {
  return (
    <div className="border-t border-[#1f293d] bg-[#0b0f19] p-4 flex items-center justify-between shrink-0">
      <div></div>
      <div className="flex items-center gap-3">
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
