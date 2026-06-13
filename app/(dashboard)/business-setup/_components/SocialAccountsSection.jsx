"use client";

import { Share2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccordionSection } from "./AccordionSection";

export function SocialAccountsSection({
  form,
  handleChange,
  socialOpen,
  setSocialOpen,
}) {
  return (
    <AccordionSection
      icon={Share2}
      title="Social Accounts"
      open={socialOpen}
      onToggle={() => setSocialOpen((v) => !v)}
    >
      <div className="grid grid-cols-1 gap-4 mt-4">
        <div className="space-y-1.5">
          <Label className="text-slate-300 font-medium">Facebook Page URL</Label>
          <Input
            name="facebookPage"
            value={form.facebookPage}
            onChange={handleChange}
            placeholder="https://facebook.com/yourpage"
            className="bg-[#0e131f] border-[#1f293d] text-slate-200 placeholder:text-slate-500/70 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-sm h-10"
          />
        </div>
      </div>
    </AccordionSection>
  );
}
