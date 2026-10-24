import { ChartCard } from "@/components/ChartCard";
import { InsightCard } from "@/components/InsightCard";
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Target, ShoppingBag, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockTrendData = [
  { month: "Jan", spending: 2400 },
  { month: "Feb", spending: 2210 },
  { month: "Mar", spending: 2800 },
  { month: "Apr", spending: 2650 },
  { month: "May", spending: 3100 },
  { month: "Jun", spending: 2900 },
];

const mockCategoryData = [
  { category: "Food", amount: 1200 },
  { category: "Transport", amount: 450 },
  { category: "Shopping", amount: 890 },
  { category: "Entertainment", amount: 320 },
  { category: "Utilities", amount: 560 },
];

const mockInsights = [
  {
    icon: TrendingUp,
    title: "Food Spending Increased",
    description: "Your food spending is up 22% this month compared to last month.",
    trend: "up" as const,
    value: "+₹186",
  },
  {
    icon: TrendingDown,
    title: "Transport Savings",
    description: "You've saved 15% on transportation this month. Great job!",
    trend: "down" as const,
    value: "-₹67",
  },
  {
    icon: AlertCircle,
    title: "Shopping Budget Alert",
    description: "You've exceeded your shopping budget by ₹1,200 this month.",
    trend: "up" as const,
    value: "+₹1,200",
  },
  {
    icon: Target,
    title: "Savings Goal Progress",
    description: "You're 78% of the way to your vacation savings goal.",
    trend: "neutral" as const,
    value: "₹39,000 / ₹50,000",
  },
  {
    icon: ShoppingBag,
    title: "Most Frequent Merchant",
    description: "Starbucks was your most visited merchant with 12 transactions.",
    trend: "neutral" as const,
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestion",
    description: "Consider meal prepping to reduce food delivery expenses.",
    trend: "neutral" as const,
  },
];

export default function Insights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Financial Insights</h1>
        <p className="text-muted-foreground">AI-powered analysis of your spending patterns</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Monthly Spending Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrendData}>
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
                dataKey="spending" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Comparison" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockCategoryData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">AI Insights Feed</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockInsights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
