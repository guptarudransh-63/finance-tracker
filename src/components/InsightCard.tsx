import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  trend?: "up" | "down" | "neutral";
  value?: string;
}

export function InsightCard({ icon: Icon, title, description, trend, value }: InsightCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {value && (
              <p className={cn("text-sm font-medium", trend && trendColors[trend])}>
                {value}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
