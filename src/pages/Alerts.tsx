import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, TrendingUp, Repeat, Wallet, Bell } from "lucide-react";

const alertTypes = [
  {
    id: "overspending",
    icon: TrendingUp,
    title: "Overspending Alert",
    description: "Get notified when you exceed your budget in any category",
    defaultEnabled: true,
  },
  {
    id: "unusual",
    icon: AlertCircle,
    title: "Unusual Transaction",
    description: "Receive alerts for transactions that seem unusual or suspicious",
    defaultEnabled: true,
  },
  {
    id: "subscriptions",
    icon: Repeat,
    title: "Subscription Renewals",
    description: "Be reminded 3 days before a subscription is about to renew",
    defaultEnabled: true,
  },
  {
    id: "low-balance",
    icon: Wallet,
    title: "Low Balance Warning",
    description: "Get notified when your account balance falls below a threshold",
    defaultEnabled: false,
  },
  {
    id: "large-transaction",
    icon: TrendingUp,
    title: "Large Transaction",
    description: "Receive instant alerts for transactions over a certain amount",
    defaultEnabled: true,
  },
  {
    id: "weekly-summary",
    icon: Bell,
    title: "Weekly Summary",
    description: "Get a weekly email summary of your spending and budget status",
    defaultEnabled: false,
  },
  {
    id: "goal-milestone",
    icon: TrendingUp,
    title: "Goal Milestones",
    description: "Celebrate when you reach 25%, 50%, 75%, and 100% of your savings goals",
    defaultEnabled: true,
  },
  {
    id: "duplicate",
    icon: AlertCircle,
    title: "Duplicate Charges",
    description: "Be alerted if the same merchant charges you multiple times in a short period",
    defaultEnabled: false,
  },
];

export default function Alerts() {
  const [alertStates, setAlertStates] = useState<Record<string, boolean>>(
    alertTypes.reduce((acc, alert) => ({
      ...acc,
      [alert.id]: alert.defaultEnabled,
    }), {})
  );

  const handleToggle = (alertId: string) => {
    setAlertStates(prev => ({
      ...prev,
      [alertId]: !prev[alertId],
    }));
  };

  const enabledCount = Object.values(alertStates).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Manage how you want to be notified about your finances
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Summary</CardTitle>
          <CardDescription>
            You have {enabledCount} alert{enabledCount !== 1 ? 's' : ''} enabled out of {alertTypes.length}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {alertTypes.map((alert) => {
          const Icon = alert.icon;
          const isEnabled = alertStates[alert.id];

          return (
            <Card key={alert.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${isEnabled ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-5 w-5 ${isEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Label 
                          htmlFor={alert.id}
                          className="text-base font-semibold cursor-pointer"
                        >
                          {alert.title}
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                      </div>
                      <Switch
                        id={alert.id}
                        checked={isEnabled}
                        onCheckedChange={() => handleToggle(alert.id)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            All notifications will be sent via email and push notifications if you have the mobile app installed. 
            You can customize the frequency and delivery method in your account settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
