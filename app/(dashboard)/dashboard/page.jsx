"use client";

import Link from "next/link";
import {
  Sparkles,
  Layers,
  Share2,
  Calendar,
  ChevronRight,
  TrendingUp,
  Plus,
  MessageSquare,
  Image as ImageIcon,
  Briefcase,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ─── Static data ────────────────────────────────────────────────────────────

const METRICS = [
  { label: "Active Campaigns",      value: "6",          change: "+2 this month",            positive: true,  icon: Layers    },
  { label: "Content Generated",     value: "48 posts",   change: "24 captions · 24 images",  positive: true,  icon: Sparkles  },
  { label: "Published Posts",       value: "128",        change: "99.2% success rate",        positive: true,  icon: Calendar  },
  { label: "Connected Channels",    value: "4",          change: "2 Facebook · 2 Instagram",  positive: true,  icon: Share2    },
];

const POSTS = [
  {
    id: 1,
    campaign: "Summer Sale Launch",
    channel: "Instagram",
    status: "Scheduled",
    date: "Today, 4:00 PM",
    preview: "Unveiling our biggest collection yet. Ready to level up your summer wardrobe? ☀️🔥",
  },
  {
    id: 2,
    campaign: "Weekly Tech Tips",
    channel: "Facebook",
    status: "Draft",
    date: "June 10, 10:00 AM",
    preview: "Did you know that automating your workspace could save up to 10 hours a week?",
  },
  {
    id: 3,
    campaign: "Brand Milestone",
    channel: "Instagram",
    status: "Published",
    date: "Yesterday, 2:15 PM",
    preview: "We just hit 50,000 customers! Thank you to everyone who supported us. 🎉",
  },
];

const STATUS_STYLES = {
  Scheduled: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Draft:      "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Published:  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const QUICK_LINKS = [
  { href: "/ai-editor?tool=caption", label: "Caption Writer",     description: "Write social captions",    icon: MessageSquare },
  { href: "/ai-editor?tool=image",   label: "Creative Designer",  description: "Generate post graphics",   icon: ImageIcon     },
  { href: "/business-setup",          label: "Business Setup",     description: "Configure brand context",  icon: Briefcase     },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PostRow({ post }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 py-4 first:pt-0 last:pb-0">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-[10px] font-semibold">
            {post.channel}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.campaign}</span>
        </div>
        <p className="text-sm font-medium truncate">{post.preview}</p>
        <p className="text-xs text-muted-foreground">{post.date}</p>
      </div>

      <span className={`self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[post.status]}`}>
        {post.status}
      </span>
    </div>
  );
}

function QuickLinkRow({ href, label, description, icon: Icon }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors duration-150"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

      <PageHeader
        title="Dashboard"
        description="Monitor and orchestrate your social content operations."
      >
        <Button asChild size="sm">
          <Link href="/campaigns?new=true">
            <Plus className="h-4 w-4" />
            New Campaign
          </Link>
        </Button>
      </PageHeader>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <StatCard key={m.label} {...m} />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Scheduled posts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-base">Scheduled Operations</CardTitle>
              <CardDescription>Recent content queued for publishing.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link href="/campaigns">
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {POSTS.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick tools */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Access</CardTitle>
            <CardDescription>Jump to frequently used tools.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {QUICK_LINKS.map((link) => (
              <QuickLinkRow key={link.href} {...link} />
            ))}

            <Separator className="my-3" />

            {/* Channel indicators */}
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold pb-2">
              Connected Channels
            </p>
            <div className="flex gap-2">
              {/* Facebook */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20">
                <svg className="h-4 w-4 fill-[#1877F2]" viewBox="0 0 24 24" aria-label="Facebook">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </div>
              {/* Instagram */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/20">
                <svg className="h-4 w-4 stroke-[#E1306C] fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              {/* X / Twitter */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/5 border border-border">
                <svg className="h-4 w-4 fill-foreground" viewBox="0 0 24 24" aria-label="X">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
