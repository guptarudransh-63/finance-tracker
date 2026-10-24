import { useState } from "react";
import { ChartCard } from "@/components/ChartCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Building2, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const mockMerchants = [
  { id: 1, name: "Starbucks", category: "Food & Dining", totalSpent: 456, transactions: 23, avgTransaction: 19.83 },
  { id: 2, name: "Amazon", category: "Shopping", totalSpent: 1234, transactions: 15, avgTransaction: 82.27 },
  { id: 3, name: "Shell Gas Station", category: "Transportation", totalSpent: 340, transactions: 8, avgTransaction: 42.50 },
  { id: 4, name: "Netflix", category: "Entertainment", totalSpent: 45, transactions: 3, avgTransaction: 15.00 },
  { id: 5, name: "Whole Foods", category: "Groceries", totalSpent: 567, transactions: 12, avgTransaction: 47.25 },
  { id: 6, name: "Uber", category: "Transportation", totalSpent: 234, transactions: 18, avgTransaction: 13.00 },
];

const mockMerchantTrend = [
  { month: "Jan", amount: 76 },
  { month: "Feb", amount: 89 },
  { month: "Mar", amount: 65 },
  { month: "Apr", amount: 95 },
  { month: "May", amount: 78 },
  { month: "Jun", amount: 53 },
];

const mockRecentTransactions = [
  { id: 1, date: "2024-01-18", amount: 24.50, category: "Coffee" },
  { id: 2, date: "2024-01-15", amount: 18.75, category: "Coffee" },
  { id: 3, date: "2024-01-12", amount: 32.10, category: "Food" },
  { id: 4, date: "2024-01-10", amount: 15.60, category: "Coffee" },
  { id: 5, date: "2024-01-08", amount: 27.85, category: "Food" },
];

export default function Merchants() {
  const [selectedMerchant, setSelectedMerchant] = useState<typeof mockMerchants[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMerchantClick = (merchant: typeof mockMerchants[0]) => {
    setSelectedMerchant(merchant);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Merchant Insights</h1>
        <p className="text-muted-foreground">Analyze spending patterns by merchant</p>
      </div>

      <ChartCard title="Top Merchants" icon={Building2}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Transactions</TableHead>
              <TableHead className="text-right">Avg. Transaction</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMerchants.map((merchant) => (
              <TableRow 
                key={merchant.id} 
                className="cursor-pointer"
                onClick={() => handleMerchantClick(merchant)}
              >
                <TableCell className="font-medium">{merchant.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{merchant.category}</Badge>
                </TableCell>
                <TableCell className="text-right">{merchant.transactions}</TableCell>
                <TableCell className="text-right">₹{merchant.avgTransaction.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">
                  ₹{merchant.totalSpent.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {selectedMerchant?.name}
            </SheetTitle>
          </SheetHeader>
          
          {selectedMerchant && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹{selectedMerchant.totalSpent.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{selectedMerchant.transactions}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  Spending Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockMerchantTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Recent Transactions</h3>
                <div className="space-y-2">
                  {mockRecentTransactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="font-medium">{transaction.date}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                      </div>
                      <p className="font-semibold">₹{transaction.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-primary/10 p-4">
                <h4 className="mb-2 font-semibold text-primary">💡 AI Suggestion</h4>
                <p className="text-sm text-muted-foreground">
                  You visit {selectedMerchant.name} frequently. Consider using their rewards program 
                  to save money on future purchases.
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
