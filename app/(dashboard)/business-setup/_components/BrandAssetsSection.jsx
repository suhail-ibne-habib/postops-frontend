"use client";

import { ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccordionSection } from "./AccordionSection";
import { LogoDropZone } from "./LogoDropZone";

export function BrandAssetsSection({
  form,
  handleChange,
  onLogoFileSelect,
  logoUploading,
  brandOpen,
  setBrandOpen,
}) {
  return (
    <AccordionSection
      icon={ImageIcon}
      title="Brand Assets"
      open={brandOpen}
      onToggle={() => setBrandOpen((v) => !v)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Left column: Brand Name + Business Contact */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-300 font-medium">Brand Name</Label>
            <Input
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              placeholder="Your brand name"
              className="bg-[#0e131f] border-[#1f293d] text-slate-200 placeholder:text-slate-500/70 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 font-medium">Business Contact</Label>
            <Input
              name="businessContact"
              value={form.businessContact}
              onChange={handleChange}
              placeholder="contact@yourbusiness.com or +1 234 567 8900"
              className="bg-[#0e131f] border-[#1f293d] text-slate-200 placeholder:text-slate-500/70 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-xl h-10"
            />
          </div>
        </div>

        {/* Right column: Brand Logo */}
        <div className="space-y-1.5">
          <Label className="text-slate-300 font-medium">Brand Logo</Label>
          <LogoDropZone
            uploaded={form.logoUploaded}
            fileName={form.logoFileName}
            logoUrl={form.logoUrl}
            onFileSelect={onLogoFileSelect}
            uploading={logoUploading}
          />
        </div>
      </div>
    </AccordionSection>
  );
}
