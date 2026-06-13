"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { apiFetch } from "@/lib/api";
import { TopicSuggestionEngine } from "./_components/TopicSuggestionEngine";
import { TopicsTable } from "./_components/TopicsTable";

export default function WorkflowPlannerPage() {
  const { getToken } = useAuth();

  const [goal, setGoal] = useState("");
  const [count, setCount] = useState(3);
  const [generating, setGenerating] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Load existing topics on mount ──────────────────────────────────────────
  const loadTopics = useCallback(async () => {
    try {
      const res = await apiFetch("/campaigns", { method: "GET" }, getToken);
      setTopics(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // ── Generate topics via AI ─────────────────────────────────────────────────
  async function handleGenerate() {
    if (!goal.trim()) return;
    setGenerating(true);
    setError(null);

    try {
      const res = await apiFetch(
        "/campaigns/generate",
        {
          method: "POST",
          body: JSON.stringify({ campaignGoal: goal, count }),
        },
        getToken
      );
      // Prepend new topics to the list
      setTopics((prev) => [...(res.data || []), ...prev]);
      setGoal("");
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }


  // ── Delete a topic ─────────────────────────────────────────────────────────
  async function handleDelete(id) {
    try {
      await apiFetch(`/campaigns/${id}`, { method: "DELETE" }, getToken);
      setTopics((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 pb-12">
      <PageHeader
        title="Campaign Planning"
        description="Design your multi-channel content strategy with AI-driven topic generation."
      />

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ── Topic Suggestion Engine ────────────────────────────────────── */}
      <TopicSuggestionEngine
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        onSubmit={handleGenerate}
        loading={generating}
        count={count}
        onCountChange={setCount}
      />

      {/* ── Generated Topics Table ─────────────────────────────────────── */}
      <TopicsTable topics={topics} onDelete={handleDelete} />
    </div>
  );
}
