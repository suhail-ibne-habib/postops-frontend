"use client";

import { Sun, User, Bell, Cpu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { AppearanceTab }    from "./_components/AppearanceTab";
import { ProfileTab }       from "./_components/ProfileTab";
import { AITab }            from "./_components/AITab";
import { NotificationsTab } from "./_components/NotificationsTab";

// Tab definitions — add/remove a tab here and everything else follows
const TABS = [
  { value: "appearance",    label: "Appearance",       icon: Sun,      content: <AppearanceTab /> },
  { value: "profile",       label: "Profile",          icon: User,     content: <ProfileTab /> },
  { value: "ai",            label: "AI Orchestration", icon: Cpu,      content: <AITab /> },
  { value: "notifications", label: "Notifications",    icon: Bell,     content: <NotificationsTab /> },
];

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences, branding inspirations, and notification rules."
      />

      <Tabs defaultValue="appearance">
        {/* Tab nav */}
        <TabsList className="mb-6 flex flex-wrap gap-1 h-auto bg-muted/50 p-1 rounded-xl">
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab panels */}
        {TABS.map(({ value, content }) => (
          <TabsContent
            key={value}
            value={value}
            className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-80 mt-0"
          >
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
