import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockIncomeTransactions = [
  { id: 1, date: "2024-01-15", source: "Salary - Tech Corp", amount: 5000, category: "Salary" },
  { id: 2, date: "2024-01-10", source: "Freelance Project", amount: 1200, category: "Freelance" },
  { id: 3, date: "2024-01-08", source: "Cashback Rewards", amount: 45, category: "Cashback" },
  { id: 4, date: "2024-01-05", source: "Investment Dividends", amount: 230, category: "Investment" },
  { id: 5, date: "2024-01-03", source: "Rental Income", amount: 800, category: "Rental" },
];

const mockIncomeTrend = [
  { month: "Jan", income: 7275 },
  { month: "Feb", income: 6800 },
  { month: "Mar", income: 7500 },
  { month: "Apr", income: 7100 },
  { month: "May", income: 8200 },
  { month: "Jun", income: 7800 },
];

const mockIncomeBreakdown = [
  { name: "Salary", value: 5000, color: "hsl(var(--chart-1))" },
  { name: "Freelance", value: 1200, color: "hsl(var(--chart-2))" },
  { name: "Rental", value: 800, color: "hsl(var(--chart-3))" },
  { name: "Investment", value: 230, color: "hsl(var(--chart-4))" },
  { name: "Cashback", value: 45, color: "hsl(var(--chart-5))" },
];

export default function Income() {
  const totalIncome = mockIncomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const salaryIncome = mockIncomeTransactions.filter(t => t.category === "Salary").reduce((sum, t) => sum + t.amount, 0);
  const otherIncome = totalIncome - salaryIncome;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Income Tracking</h1>
        <p className="text-muted-foreground">Monitor all your income sources</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString()}`}
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Salary Income"
          value={`₹${salaryIncome.toLocaleString()}`}
          change="68.7% of total"
          changeType="positive"
          icon={Wallet}
        />
        <StatCard
          title="Other Income"
          value={`₹${otherIncome.toLocaleString()}`}
          change="31.3% of total"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Income Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockIncomeTrend}>
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
                dataKey="income" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Income Breakdown" icon={DollarSign}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockIncomeBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockIncomeBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Recent Income Transactions">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIncomeTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell className="font-medium">{transaction.source}</TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-success">
                  +₹{transaction.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  );
}
