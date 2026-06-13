"use client";

import { useRef } from "react";
import { Check, CloudUpload, Loader2 } from "lucide-react";

export function LogoDropZone({ uploaded, fileName, logoUrl, onFileSelect, uploading }) {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={handleChange}
        aria-label="Upload brand logo"
      />
      <div
        onClick={uploading ? undefined : handleClick}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-36 group transition-all
          ${uploading
            ? "border-[#1f293d] cursor-not-allowed opacity-60"
            : "border-[#1f293d] hover:border-blue-500/50 bg-[#0e131f] hover:bg-[#0e131f]/80 cursor-pointer"
          }`}
      >
        {uploading ? (
          <div className="text-center space-y-1.5">
            <Loader2 className="mx-auto h-8 w-8 text-blue-400 animate-spin" />
            <p className="text-xs font-semibold text-slate-400">Uploading…</p>
          </div>
        ) : uploaded ? (
          <div className="flex items-center gap-4 text-left w-full justify-center">
            {logoUrl && (
              <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-800 border border-[#1f293d] flex items-center justify-center p-1.5">
                <img src={logoUrl} alt="Brand Logo Preview" className="h-full w-full object-contain" />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-200 max-w-[150px] truncate">{fileName || "logo"}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Uploaded
              </p>
              <p className="text-[10px] text-slate-400 group-hover:underline">Click to replace</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-1.5">
            <CloudUpload className="mx-auto h-8 w-8 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
            <p className="text-xs font-semibold text-slate-200">Click to upload</p>
            <p className="text-[10px] text-slate-400">PNG, JPG, SVG supported</p>
          </div>
        )}
      </div>
    </>
  );
}
