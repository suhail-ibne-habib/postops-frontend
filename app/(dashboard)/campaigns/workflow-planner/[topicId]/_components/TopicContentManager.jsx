"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { EmptyState } from "./EmptyState";
import { GenerateDialog } from "./GenerateDialog";
import { PostCard } from "./PostCard";
import { ScheduleDialog } from "./ScheduleDialog";

export function TopicContentManager({ topicId }) {
  const { getToken } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  // Fetch existing content for this topic on mount
  const loadPosts = useCallback(async () => {
    if (!topicId) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/campaigns/${topicId}/content`, { method: "GET" }, getToken);
      const fetched = res.data || [];
      // Normalise DB shape → PostCard shape
      setPosts(fetched.map((p) => ({
        id: p._id,
        topicId,
        title: p.title || "Untitled Post",
        content: p.caption,
        hashtags: p.hashtags,
        cta: p.cta,
        imageUrl: p.imageUrl,
        designId: p.designId,
      })));
    } catch {
      // If none found yet, remain empty — user can generate
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [topicId, getToken]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function handleGenerateSuccess(newPosts) {
    // Normalise freshly generated posts
    setPosts(
      newPosts.map((p) => ({
        id: p._id,
        topicId,
        title: p.title || "Untitled Post",
        content: p.caption,
        hashtags: p.hashtags,
        cta: p.cta,
        imageUrl: p.imageUrl,
        designId: p.designId,
      }))
    );
    setDialogOpen(false);
  }

  function handlePostClick(post) {
    setActivePost(post);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <EmptyState type="Posts" onGenerate={() => setDialogOpen(true)} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))}
          </div>
          {/* Allow re-generation */}
          <div className="flex justify-end">
            <button
              onClick={() => setDialogOpen(true)}
              className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
            >
              Regenerate Posts
            </button>
          </div>
        </>
      )}

      <GenerateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        type="Posts"
        topicId={topicId}
        onGenerateSuccess={handleGenerateSuccess}
      />

      <ScheduleDialog
        open={!!activePost}
        onOpenChange={(val) => !val && setActivePost(null)}
        post={activePost}
        topicId={topicId}
      />
    </div>
  );
}
