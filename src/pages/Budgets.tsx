import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const initialBudgets = [
  { id: 1, category: "Food & Dining", limit: 8000, spent: 6200, icon: "🍔" },
  { id: 2, category: "Transportation", limit: 3000, spent: 2800, icon: "🚗" },
  { id: 3, category: "Entertainment", limit: 2000, spent: 1500, icon: "🎬" },
  { id: 4, category: "Shopping", limit: 5000, spent: 5200, icon: "🛍️" },
  { id: 5, category: "Utilities", limit: 4000, spent: 3850, icon: "⚡" },
  { id: 6, category: "Healthcare", limit: 2500, spent: 1200, icon: "🏥" },
];

const categoryIcons: Record<string, string> = {
  "Food & Dining": "🍔",
  "Transportation": "🚗",
  "Entertainment": "🎬",
  "Shopping": "🛍️",
  "Utilities": "⚡",
  "Healthcare": "🏥",
  "Other": "📦",
};

export default function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("Food & Dining");
  const [limit, setLimit] = useState("");
  const { toast } = useToast();

  const handleCreateBudget = () => {
    const numLimit = parseFloat(limit);
    if (!limit || isNaN(numLimit) || numLimit <= 0) {
      toast({
        title: "Invalid limit",
        description: "Please enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }

    const newBudget = {
      id: Date.now(),
      category,
      limit: numLimit,
      spent: 0,
      icon: categoryIcons[category] || "💰",
    };

    setBudgets((prev) => [...prev, newBudget]);
    setLimit("");
    setIsModalOpen(false);
    toast({
      title: "Budget created",
      description: `New budget for ${category} has been set.`,
    });
  };

  const getUsageStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return "Over budget";
    if (percentage >= 80) return "Approaching limit";
    return "On track";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">Track your spending across categories</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Budget Limit (₹)</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="5000"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleCreateBudget}>
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const status = getUsageStatus(budget.spent, budget.limit);

          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{budget.icon}</span>
                  {budget.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-semibold">₹{budget.spent.toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={cn(
                      "h-2",
                      percentage >= 100 && "[&>div]:bg-destructive",
                      percentage >= 80 && percentage < 100 && "[&>div]:bg-warning",
                    )}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-semibold">₹{budget.limit.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className={cn(
                      "text-lg font-bold",
                      remaining < 0 ? "text-destructive" : "text-foreground"
                    )}>
                      ₹{Math.abs(remaining).toFixed(2)}
                    </p>
                  </div>
                  <div className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    percentage >= 100 && "bg-destructive/10 text-destructive",
                    percentage >= 80 && percentage < 100 && "bg-warning/10 text-warning",
                    percentage < 80 && "bg-success/10 text-success",
                  )}>
                    {status}
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  {percentage.toFixed(0)}% of budget used
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
