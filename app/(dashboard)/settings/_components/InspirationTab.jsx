"use client";

import { useRef, useState, useCallback } from "react";
import { ImagePlus, UploadCloud, X, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Single upload slot ──────────────────────────────────────────────────────

function ImageSlot({ index, image, onFile, onRemove }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) onFile(index, file);
  }, [index, onFile]);

  if (image) {
    return (
      /* Filled slot */
      <div className="relative group aspect-square rounded-xl overflow-hidden border border-border bg-muted/20">
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
            <UploadCloud className="h-3.5 w-3.5" />
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
      </div>
    );
  }

  /* Empty drop zone */
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200",
        dragging
          ? "border-primary bg-primary/10 scale-[1.02]"
          : "border-border/70 bg-muted/10 hover:border-primary/50 hover:bg-muted/20"
      )}
    >
      <div className={cn("p-3 rounded-xl transition-colors", dragging ? "bg-primary/20" : "bg-muted")}>
        <ImagePlus className={cn("h-5 w-5 transition-colors", dragging ? "text-primary" : "text-muted-foreground")} />
      </div>
      <div className="text-center px-2">
        <p className="text-xs font-semibold">Drop image here</p>
        <p className="text-[10px] text-muted-foreground">or click to browse</p>
        <p className="text-[9px] text-muted-foreground/60 mt-0.5">PNG · JPG · WEBP</p>
      </div>

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
    </div>
  );
}

// ─── Main tab ────────────────────────────────────────────────────────────────

export function InspirationTab() {
  const [images, setImages] = useState([null, null, null]);

  const handleFile = useCallback((index, file) => {
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      const next = [...prev];
      next[index] = { url, name: file.name };
      return next;
    });
  }, []);

  const handleRemove = useCallback((index) => {
    setImages((prev) => {
      const next = [...prev];
      if (next[index]?.url) URL.revokeObjectURL(next[index].url);
      next[index] = null;
      return next;
    });
  }, []);

  const uploadedCount = images.filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">Inspiration Images</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload up to 3 reference images that guide the visual style of your content.
          </p>
        </div>
        <span className={cn(
          "text-xs font-bold px-2.5 py-1 rounded-full shrink-0",
          uploadedCount === 3
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-muted text-muted-foreground"
        )}>
          {uploadedCount} / 3
        </span>
      </div>

      {/* Three slots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Inspiration {i + 1}
            </p>
            <ImageSlot
              index={i}
              image={img}
              onFile={handleFile}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>

      {/* Usage hint */}
      <Card className="border-primary/15 bg-primary/5">
        <CardContent className="flex gap-3 p-4">
          <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-xs font-semibold">How inspirations are used</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Our agents analyse these images to match visual style, colour palette, and layout
              when generating campaign assets for your brand.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save button — only visible when at least one image is uploaded */}
      {uploadedCount > 0 && (
        <div className="flex justify-end">
          <Button size="sm">
            Save {uploadedCount} Inspiration{uploadedCount > 1 ? "s" : ""}
          </Button>
        </div>
      )}
    </div>
  );
}
