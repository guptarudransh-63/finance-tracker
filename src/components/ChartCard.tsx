import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function ChartCard({ title, icon: Icon, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
