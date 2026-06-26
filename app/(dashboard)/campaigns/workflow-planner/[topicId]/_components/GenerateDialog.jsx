"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { CookingAnimation } from "./CookingAnimation";

export function GenerateDialog({ open, onOpenChange, type, topicId, onGenerateSuccess }) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setStatusMessage(`Crafting the perfect ${type.toLowerCase()} copy...`);
    
    try {
      // 1. Trigger post content generation (returns quickly)
      const res = await apiFetch(
        `/campaigns/${topicId}/content`,
        { method: "POST" },
        getToken
      );
      let posts = res.data || [];

      // 2. Poll the GET content endpoint until images are ready
      setStatusMessage("Generating high-quality studio images...");
      
      const maxPolls = 15; // 30 seconds max timeout
      let pollCount = 0;
      let imagesReady = false;

      while (pollCount < maxPolls && !imagesReady) {
        // Wait 2 seconds between polls
        await new Promise((resolve) => setTimeout(resolve, 2000));
        pollCount++;

        try {
          const pollRes = await apiFetch(
            `/campaigns/${topicId}/content`,
            { method: "GET" },
            getToken
          );
          const currentPosts = pollRes.data || [];
          
          if (currentPosts.length > 0) {
            // Check if all posts have an imageUrl
            const allHaveImages = currentPosts.every(p => p.imageUrl);
            if (allHaveImages) {
              posts = currentPosts;
              imagesReady = true;
            }
          }
        } catch (pollErr) {
          console.error("Polling error:", pollErr);
        }
      }

      onGenerateSuccess(posts);
    } catch (err) {
      setError(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => !loading && onOpenChange(val)}>
      <DialogContent className="bg-[#0b0f19] border-[#1f293d] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-purple-400" />
            Generate {type}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Our AI will analyse your business persona and the selected topic to generate high-converting {type.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="w-full pb-4">
              <CookingAnimation message={statusMessage || `Crafting the perfect ${type.toLowerCase()}...`} />
            </div>
          ) : (
            <div className="space-y-4 w-full">
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 text-left">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="p-4 bg-[#131926] border border-[#1f293d] rounded-xl text-sm text-slate-300 text-left">
                <p><strong>Topic Context:</strong> Will be automatically applied.</p>
                <p className="mt-2"><strong>Target Audience:</strong> Will be automatically applied.</p>
              </div>
              <Button
                onClick={handleGenerate}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold h-12 shadow-lg shadow-purple-600/20"
              >
                Start Generation
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
