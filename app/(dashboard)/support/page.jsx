"use client";

import React from "react";
import { HelpCircle, Mail, MessageCircle, FileText } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Support</h2>
        <p className="text-muted-foreground mt-1 text-sm">Need help? Get support and view platform guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 text-center shadow-sm">
          <Mail className="mx-auto h-6 w-6 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Email Support</h3>
          <p className="text-xs text-muted-foreground">Receive answers directly in your inbox.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 text-center shadow-sm">
          <MessageCircle className="mx-auto h-6 w-6 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Live Chat</h3>
          <p className="text-xs text-muted-foreground">Talk with support specialists in real-time.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3 text-center shadow-sm">
          <FileText className="mx-auto h-6 w-6 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Documentation</h3>
          <p className="text-xs text-muted-foreground">Browse guides and API references.</p>
        </div>
      </div>
    </div>
  );
}
