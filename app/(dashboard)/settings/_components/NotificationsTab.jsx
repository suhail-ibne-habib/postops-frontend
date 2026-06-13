"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// ─── Single toggle row ───────────────────────────────────────────────────────

function NotificationRow({ label, description, enabled, onToggle }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <button
          role="switch"
          aria-checked={enabled}
          onClick={onToggle}
          className={`relative h-6 w-11 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
            enabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <div className={`h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`} />
        </button>
      </CardContent>
    </Card>
  );
}

// ─── Notifications list data ─────────────────────────────────────────────────

const NOTIFICATION_ITEMS = [
  {
    key: "publishSuccess",
    label: "Publish Success Alert",
    description: "Get notified when a post publishes successfully to Meta Graph API.",
    defaultEnabled: true,
  },
  {
    key: "weeklyReport",
    label: "Weekly Operations Digest",
    description: "Receive a weekly summary email with campaign performance stats.",
    defaultEnabled: false,
  },
  {
    key: "systemAlerts",
    label: "Critical System Alerts",
    description: "Important notifications about API status or token expiry.",
    defaultEnabled: true,
  },
];

// ─── Main tab ────────────────────────────────────────────────────────────────

export function NotificationsTab() {
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(NOTIFICATION_ITEMS.map((n) => [n.key, n.defaultEnabled]))
  );

  function toggle(key) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold">Notification Preferences</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose when PostOps sends you alerts.
        </p>
      </div>

      {NOTIFICATION_ITEMS.map((item) => (
        <NotificationRow
          key={item.key}
          label={item.label}
          description={item.description}
          enabled={prefs[item.key]}
          onToggle={() => toggle(item.key)}
        />
      ))}
    </div>
  );
}
