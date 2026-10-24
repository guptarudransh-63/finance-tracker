import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, DollarSign, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mockCalendarData = [
  { day: 1, amount: 45, hasSalary: false, hasSubscription: false },
  { day: 2, amount: 120, hasSalary: false, hasSubscription: false },
  { day: 3, amount: 67, hasSalary: false, hasSubscription: false },
  { day: 4, amount: 89, hasSalary: false, hasSubscription: false },
  { day: 5, amount: 234, hasSalary: false, hasSubscription: true },
  { day: 6, amount: 156, hasSalary: false, hasSubscription: false },
  { day: 7, amount: 78, hasSalary: false, hasSubscription: false },
  { day: 8, amount: 45, hasSalary: false, hasSubscription: false },
  { day: 9, amount: 190, hasSalary: false, hasSubscription: false },
  { day: 10, amount: 123, hasSalary: false, hasSubscription: false },
  { day: 11, amount: 267, hasSalary: false, hasSubscription: false },
  { day: 12, amount: 98, hasSalary: false, hasSubscription: false },
  { day: 13, amount: 145, hasSalary: false, hasSubscription: false },
  { day: 14, amount: 67, hasSalary: false, hasSubscription: false },
  { day: 15, amount: 5234, hasSalary: true, hasSubscription: false },
  { day: 16, amount: 89, hasSalary: false, hasSubscription: false },
  { day: 17, amount: 156, hasSalary: false, hasSubscription: false },
  { day: 18, amount: 234, hasSalary: false, hasSubscription: false },
  { day: 19, amount: 78, hasSalary: false, hasSubscription: false },
  { day: 20, amount: 345, hasSalary: false, hasSubscription: true },
  { day: 21, amount: 123, hasSalary: false, hasSubscription: false },
  { day: 22, amount: 189, hasSalary: false, hasSubscription: false },
  { day: 23, amount: 267, hasSalary: false, hasSubscription: false },
  { day: 24, amount: 98, hasSalary: false, hasSubscription: false },
  { day: 25, amount: 145, hasSalary: false, hasSubscription: false },
  { day: 26, amount: 234, hasSalary: false, hasSubscription: false },
  { day: 27, amount: 89, hasSalary: false, hasSubscription: false },
  { day: 28, amount: 156, hasSalary: false, hasSubscription: false },
  { day: 29, amount: 78, hasSalary: false, hasSubscription: false },
  { day: 30, amount: 123, hasSalary: false, hasSubscription: false },
];

const mockDayTransactions = [
  { id: 1, merchant: "Starbucks", amount: 5.75, category: "Food & Dining" },
  { id: 2, merchant: "Uber", amount: 23.50, category: "Transportation" },
  { id: 3, merchant: "Amazon", amount: 67.89, category: "Shopping" },
  { id: 4, merchant: "Netflix", amount: 15.99, category: "Entertainment" },
];

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsDrawerOpen(true);
  };

  const getHeatmapColor = (amount: number) => {
    if (amount === 0) return "bg-muted";
    if (amount < 100) return "bg-success/20";
    if (amount < 200) return "bg-success/40";
    if (amount < 300) return "bg-warning/40";
    if (amount < 500) return "bg-warning/60";
    return "bg-destructive/40";
  };

  // Pad the beginning of the month
  const firstDayOfWeek = 3; // Example: starts on Wednesday
  const paddedDays = Array(firstDayOfWeek).fill(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cash Flow Calendar</h1>
          <p className="text-muted-foreground">Visualize your daily spending patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-[120px] text-center font-semibold">
            January 2024
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-semibold text-muted-foreground"
              >
                {day}
              </div>
            ))}
            
            {paddedDays.map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {mockCalendarData.map((dayData) => (
              <div
                key={dayData.day}
                onClick={() => handleDayClick(dayData.day)}
                className={cn(
                  "relative cursor-pointer rounded-lg p-3 transition-all hover:ring-2 hover:ring-primary",
                  getHeatmapColor(dayData.amount)
                )}
              >
                <div className="mb-1 text-sm font-semibold">{dayData.day}</div>
                <div className="text-xs font-medium">
                  ₹{dayData.amount.toLocaleString()}
                </div>
                <div className="mt-1 flex gap-1">
                  {dayData.hasSalary && (
                    <DollarSign className="h-3 w-3 text-success" />
                  )}
                  {dayData.hasSubscription && (
                    <Repeat className="h-3 w-3 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Salary Day</span>
              </div>
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Subscription</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Spending:</span>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-success/20" />
                <span className="text-xs">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-warning/40" />
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded bg-destructive/40" />
                <span className="text-xs">High</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>January {selectedDay}, 2024</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Total Spending</p>
              <p className="text-2xl font-bold">
                ₹{mockCalendarData.find(d => d.day === selectedDay)?.amount.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Transactions</h3>
              <div className="space-y-2">
                {mockDayTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{transaction.merchant}</p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>
                    <p className="font-semibold">₹{transaction.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
