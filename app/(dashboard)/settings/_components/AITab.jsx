"use client";

import { Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// AI integration points — UI only, no backend calls yet
const AI_INTEGRATIONS = [
  {
    name: "DeepSeek",
    description: "Caption & copy generation for social posts.",
    status: "configured",
  },
  {
    name: "OpenAI DALL·E",
    description: "Creative image generation for campaign assets.",
    status: "configured",
  },
  {
    name: "Meta Graph API",
    description: "Automated publishing to Facebook & Instagram.",
    status: "connected",
  },
];

const STATUS_STYLES = {
  configured: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  connected:  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending:    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function IntegrationRow({ name, description, status }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize shrink-0 ml-4 ${STATUS_STYLES[status]}`}>
        {status}
      </span>
    </div>
  );
}

export function AITab() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg shrink-0 mt-0.5">
          <Cpu className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold">AI Orchestration</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Overview of the AI services powering your content operations.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 divide-y divide-border">
          {AI_INTEGRATIONS.map((item) => (
            <IntegrationRow key={item.name} {...item} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-muted bg-muted/20">
        <CardContent className="p-4 flex gap-3 items-start">
          <Badge variant="secondary" className="shrink-0 mt-0.5">Coming soon</Badge>
          <p className="text-xs text-muted-foreground leading-relaxed">
            API credential management and model configuration will be available
            in a future update. Integrations are currently managed server-side.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
