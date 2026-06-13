"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground mt-1 text-sm">Monitor campaign engagement rates and social growth stats.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">Followers Gained</p>
          <p className="text-2xl font-extrabold mt-1 text-foreground">+1,240</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">Impressions</p>
          <p className="text-2xl font-extrabold mt-1 text-foreground">48,320</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground">Engagement Rate</p>
          <p className="text-2xl font-extrabold mt-1 text-foreground">5.8%</p>
        </div>
      </div>
    </div>
  );
}
