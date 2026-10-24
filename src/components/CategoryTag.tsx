import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category: string;
  confidence: number;
}

export function CategoryTag({ category, confidence }: CategoryTagProps) {
  const getConfidenceColor = () => {
    if (confidence >= 80) return "bg-success/10 text-success border-success/20";
    if (confidence >= 50) return "bg-warning/10 text-warning border-warning/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="font-medium">
        {category}
      </Badge>
      <Badge
        variant="outline"
        className={cn("text-xs font-semibold", getConfidenceColor())}
      >
        {confidence}%
      </Badge>
    </div>
  );
}
