import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface MerchantCardProps {
  name: string;
  category: string;
  totalSpent: string;
  transactions: number;
  onClick?: () => void;
}

export function MerchantCard({ name, category, totalSpent, transactions, onClick }: MerchantCardProps) {
  return (
    <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{totalSpent}</p>
            <p className="text-sm text-muted-foreground">{transactions} transactions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
