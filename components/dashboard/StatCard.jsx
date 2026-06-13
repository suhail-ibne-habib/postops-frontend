import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A single metric card shown on the dashboard overview.
 * @param {string} label - Metric name
 * @param {string|number} value - The primary metric value
 * @param {string} [change] - e.g. "+12% this week"
 * @param {boolean} [positive] - Green if true, red if false
 * @param {React.ElementType} icon - Lucide icon component
 */
export function StatCard({ label, value, change, positive = true, icon: Icon }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {change && (
              <p className={cn("text-xs font-medium", positive ? "text-emerald-500" : "text-destructive")}>
                {change}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
