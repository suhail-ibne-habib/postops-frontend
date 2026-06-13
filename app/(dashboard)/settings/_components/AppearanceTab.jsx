"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function ThemeButton({ mode, label, icon: Icon, current, onSelect }) {
  return (
    <button
      onClick={() => onSelect(mode)}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-5 border rounded-xl transition-all duration-200 w-full",
        current === mode
          ? "border-primary bg-primary/5 text-primary"
          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">Theme</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose how PostOps looks on your screen.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-xs">
        <ThemeButton mode="light" label="Light" icon={Sun}  current={theme} onSelect={setTheme} />
        <ThemeButton mode="dark"  label="Dark"  icon={Moon} current={theme} onSelect={setTheme} />
      </div>

      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium">Reduce Motion</p>
            <p className="text-xs text-muted-foreground">Minimise animations across the dashboard.</p>
          </div>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border text-primary cursor-pointer"
          />
        </CardContent>
      </Card>
    </div>
  );
}
