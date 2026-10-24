import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  nextCharge: string;
  active: boolean;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    amount: 649.00,
    frequency: "Monthly",
    nextCharge: "2024-02-01",
    active: true,
  },
  {
    id: "2",
    name: "Spotify",
    amount: 119.00,
    frequency: "Monthly",
    nextCharge: "2024-02-05",
    active: true,
  },
  {
    id: "3",
    name: "Amazon Prime",
    amount: 1499.00,
    frequency: "Yearly",
    nextCharge: "2024-02-10",
    active: true,
  },
  {
    id: "4",
    name: "Adobe Creative Cloud",
    amount: 1675.00,
    frequency: "Monthly",
    nextCharge: "2024-02-15",
    active: false,
  },
];

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const { toast } = useToast();

  const totalMonthly = subscriptions
    .filter((s) => s.active)
    .reduce((sum, s) => sum + (s.frequency === "Yearly" ? s.amount / 12 : s.amount), 0);

  const handleToggle = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    toast({
      title: "Subscription updated",
      description: "Subscription status has been changed.",
    });
  };

  const handleDelete = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    toast({
      title: "Subscription deleted",
      description: "The subscription has been removed from tracking.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <p className="mt-2 text-muted-foreground">
          Track and manage your recurring payments
        </p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Total Monthly Spending</h3>
            <p className="text-2xl font-bold text-primary">
              ₹{totalMonthly.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Active subscriptions</p>
            <p className="text-2xl font-bold">
              {subscriptions.filter((s) => s.active).length}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {subscriptions.map((sub) => (
          <Card key={sub.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {sub.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{sub.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ₹{sub.amount} · {sub.frequency}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next charge</p>
                  <p className="font-medium">
                    {new Date(sub.nextCharge).toLocaleDateString()}
                  </p>
                </div>

                <Badge variant={sub.active ? "default" : "secondary"}>
                  {sub.active ? "Active" : "Inactive"}
                </Badge>

                <Switch
                  checked={sub.active}
                  onCheckedChange={() => handleToggle(sub.id)}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(sub.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
