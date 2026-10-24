import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChartCard } from "@/components/ChartCard";
import { StatCard } from "@/components/StatCard";
import { DollarSign, TrendingUp, CreditCard, PieChart } from "lucide-react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const categoryData = [
  { name: "Groceries", value: 1240, color: "hsl(var(--chart-1))" },
  { name: "Transportation", value: 850, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", value: 420, color: "hsl(var(--chart-3))" },
  { name: "Utilities", value: 650, color: "hsl(var(--chart-4))" },
  { name: "Dining", value: 780, color: "hsl(var(--chart-5))" },
];

const monthlyData = [
  { month: "Jan", amount: 3200 },
  { month: "Feb", amount: 2800 },
  { month: "Mar", amount: 3500 },
  { month: "Apr", amount: 3100 },
  { month: "May", amount: 3900 },
  { month: "Jun", amount: 3940 },
];

const topMerchants = [
  { name: "Whole Foods", amount: 540 },
  { name: "Shell Gas", amount: 420 },
  { name: "Netflix", amount: 15.99 },
  { name: "Starbucks", amount: 180 },
  { name: "Amazon", amount: 650 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Overview of your spending and transactions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Spending"
          value="₹3,940"
          change="+12.5% from last month"
          changeType="negative"
          icon={DollarSign}
        />
        <StatCard
          title="Transactions"
          value="247"
          change="+8 from last week"
          changeType="positive"
          icon={CreditCard}
        />
        <StatCard
          title="Categories"
          value="12"
          icon={PieChart}
        />
        <StatCard
          title="Avg. per Transaction"
          value="₹15.95"
          change="-2.3% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Spending by Category" icon={PieChart}>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                className="text-xs"
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8 }}
                fill="url(#colorAmount)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Top Merchants" icon={DollarSign}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topMerchants} layout="vertical">
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--chart-2))" />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis 
              type="number" 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              className="text-xs" 
              width={100}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="amount" 
              fill="url(#colorBar)" 
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
