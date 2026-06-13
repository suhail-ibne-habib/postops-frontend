"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { apiFetch } from "@/lib/api";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { AccountsSidebar } from "./AccountsSidebar";
import { PostEditor } from "./PostEditor";
import { SocialPreview } from "./SocialPreview";
import { DialogFooter } from "./DialogFooter";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// ScheduleDialog — root
// ─────────────────────────────────────────────────────────────────────────────
export function ScheduleDialog({ open, onOpenChange, post, topicId }) {
  const { getToken } = useAuth();
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Sync content when a different post is opened
  useEffect(() => {
    setContent(post?.content || "");
    setImageUrl(post?.imageUrl || null);
  }, [post?.id]);

  if (!post) return null;

  async function handlePublish() {
    if (!post?.designId) {
      alert("Error: Missing design reference. Please regenerate image first.");
      return;
    }
    setIsPublishing(true);
    try {
      await apiFetch(
        "/scheduled-posts",
        {
          method: "POST",
          body: JSON.stringify({
            designId: post.designId,
            publishAt: new Date().toISOString(),
          }),
        },
        getToken
      );
      alert("Post scheduled successfully!");
      onOpenChange(false);
    } catch (err) {
      console.error("Publish failed:", err);
      alert(`Publish failed: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleRewrite(e) {
    e?.preventDefault();
    if (!prompt.trim()) return;
    setIsRegenerating(true);
    try {
      const res = await apiFetch(
        `/campaigns/${topicId}/posts/${post.id}/rewrite`,
        {
          method: "POST",
          body: JSON.stringify({ instruction: prompt, currentContent: content }),
        },
        getToken
      );
      setContent(res.data.caption || content);
      setPrompt("");
    } catch (err) {
      console.error("Rewrite failed:", err);
    } finally {
      setIsRegenerating(false);
    }
  }

  async function handleRegenerateImage() {
    setIsGeneratingImage(true);
    try {
      const res = await apiFetch(
        `/campaigns/${topicId}/posts/${post.id}/image`,
        { method: "POST" },
        getToken
      );
      if (res.data?.imageUrl) {
        setImageUrl(res.data.imageUrl);
        // Sync back to parent state if possible, though ScheduleDialog closing might reset unless we lift state.
        // For now, the user sees it immediately here.
      }
    } catch (err) {
      console.error("Image generation failed:", err);
      alert(`Image generation failed: ${err.message}`);
    } finally {
      setIsGeneratingImage(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0b0f19] border-[#1f293d] text-white w-full max-w-5xl p-0 overflow-hidden flex flex-col h-[85vh]">

        {/* Header */}
        <div className="p-4 border-b border-[#1f293d] flex items-center justify-between shrink-0">
          <DialogTitle className="text-xl font-bold">Schedule post</DialogTitle>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden min-w-0">
          <AccountsSidebar />

          <div className="flex-1 flex flex-col bg-[#0b0f19] overflow-y-auto overflow-x-hidden min-w-0">
            <div className="p-4 md:p-6 flex-1 w-full max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-5">

                <PostEditor
                  title={post.title}
                  content={content}
                  onChange={setContent}
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  onRewrite={handleRewrite}
                  isRegenerating={isRegenerating}
                />

                <div className="flex flex-col gap-3 shrink-0">
                  <SocialPreview
                    title={post.title}
                    content={content}
                    hashtags={post.hashtags}
                    imageUrl={imageUrl}
                  />
                  <Button
                    onClick={handleRegenerateImage}
                    disabled={isGeneratingImage}
                    variant="outline"
                    className="w-full bg-[#1c1e21] border-[#3a3b3c] text-white hover:bg-slate-800 transition-colors"
                  >
                    {isGeneratingImage ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Cooking Image...</>
                    ) : (
                      <><ImageIcon className="h-4 w-4 mr-2 text-blue-400" /> Regenerate Image</>
                    )}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <DialogFooter onPublish={handlePublish} isPublishing={isPublishing} />
      </DialogContent>
    </Dialog>
  );
}
