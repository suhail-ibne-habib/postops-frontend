"use client";

import { useRef, useState, useCallback } from "react";
import { ImagePlus, CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AccordionSection } from "./AccordionSection";

function InspirationSlot({ index, image, onFile, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) onFile(index, file);
  }, [index, onFile]);

  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Inspiration {index + 1}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(index, f);
          e.target.value = "";
        }}
      />

      {image ? (
        <div className="relative group aspect-square rounded-xl overflow-hidden border border-[#1f293d]">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
            <Button
              size="sm"
              variant="ghost"
              className="w-full gap-1.5 text-white hover:text-white hover:bg-white/20"
              onClick={() => inputRef.current?.click()}
            >
              <CloudUpload className="h-3.5 w-3.5" />
              Replace
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-full gap-1.5 text-white hover:text-white hover:bg-red-500/70"
              onClick={() => onRemove(index)}
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
          {/* File name strip */}
          <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-2 py-1">
            <p className="text-[9px] text-white/80 truncate">{image.name}</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200",
            dragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-[#1f293d] bg-[#0e131f] hover:border-blue-500/50 hover:bg-[#0e131f]/80"
          )}
        >
          <div className={cn("p-2.5 rounded-xl transition-colors", dragging ? "bg-primary/20" : "bg-slate-800")}>
            <ImagePlus className={cn("h-5 w-5 transition-colors", dragging ? "text-primary" : "text-slate-400")} />
          </div>
          <div className="text-center px-2">
            <p className="text-xs font-semibold text-slate-200">Drop image here</p>
            <p className="text-[10px] text-slate-400">or click to browse</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function InspirationsSection({
  inspirations,
  inspirationCount,
  handleInspirationFile,
  handleInspirationRemove,
  inspOpen,
  setInspOpen,
}) {
  return (
    <AccordionSection
      icon={ImagePlus}
      title={`Inspirations${inspirationCount > 0 ? ` (${inspirationCount}/3)` : ""}`}
      open={inspOpen}
      onToggle={() => setInspOpen((v) => !v)}
    >
      <div className="mt-4 space-y-4">
        <p className="text-xs text-slate-400">
          Upload up to 3 reference images. Our AI agents will analyse these to match the visual
          style, colours, and layout of your generated content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {inspirations.map((img, i) => (
            <InspirationSlot
              key={i}
              index={i}
              image={img}
              onFile={handleInspirationFile}
              onRemove={handleInspirationRemove}
            />
          ))}
        </div>
      </div>
    </AccordionSection>
  );
}
