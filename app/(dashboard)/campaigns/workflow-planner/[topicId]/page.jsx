"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { TopicContentManager } from "./_components/TopicContentManager";

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTopic() {
      try {
        // Fetch all campaigns and find the specific one by ID since there's no single GET endpoint yet
        const res = await apiFetch("/campaigns", { method: "GET" }, getToken);
        const allTopics = res.data || [];
        const found = allTopics.find(t => t._id === params.topicId);
        
        if (found) {
          setTopic(found);
        } else {
          // If we can't find it via API (or it's a mock ID during dev), we'll mock the header data
          setTopic({
            _id: params.topicId,
            topic: "Selected Campaign Topic",
            goal: "Brand Awareness",
            status: "draft"
          });
        }
      } catch (err) {
        console.error(err);
        // Fallback for dev purposes if API is unlinked
        setTopic({
          _id: params.topicId,
          topic: "Selected Campaign Topic",
          goal: "Brand Awareness",
          status: "draft"
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (params.topicId) {
      loadTopic();
    }
  }, [params.topicId, getToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 pb-12">
      {/* Back navigation */}
      <Button 
        variant="ghost" 
        onClick={() => router.push("/campaigns/workflow-planner")}
        className="text-slate-400 hover:text-white -ml-4 px-4 h-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Planner
      </Button>

      {/* Dynamic Header based on the topic */}
      <PageHeader
        title={topic?.topic || "Topic Details"}
        description={`Goal: ${topic?.goal || "Manage content for this topic"}`}
      />

      {/* Main Content Area */}
      <TopicContentManager topicId={params.topicId} />
    </div>
  );
}
