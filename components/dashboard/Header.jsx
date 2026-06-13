"use client";

import { Search, Bell, History, Sun, Moon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { MobileMenuTrigger } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur-md z-10 shrink-0">
      {/* Left — mobile trigger + search */}
      <div className="flex items-center gap-3 flex-1">
        <MobileMenuTrigger />
        <div className="relative hidden sm:block max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search operations..."
            className="pl-10 pr-4 h-9 text-xs bg-[#0F172A]/40 border-slate-800 rounded-full text-slate-200 placeholder-slate-500 focus-visible:border-slate-700 focus-visible:ring-1 focus-visible:ring-slate-700 w-full"
          />
        </div>
      </div>

      {/* Right — actions + user */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notification bell */}
        <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-destructive rounded-full" />
        </Button>

        {/* Activity history */}
        <Button variant="ghost" size="icon-sm" aria-label="Activity">
          <History className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-2 h-5" />

        {/* Clerk user button */}
        <UserButton
          afterSignOutUrl="/login"
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8 rounded-lg border border-border",
            },
          }}
        />
      </div>
    </header>
  );
}
