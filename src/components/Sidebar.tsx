import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Receipt,
  Upload,
  Settings,
  MessageSquare,
  Filter,
  Repeat,
  PiggyBank,
  Lightbulb,
  DollarSign,
  Target,
  Building2,
  FileDown,
  Layers,
  Bell,
  Calendar,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Income", href: "/income", icon: DollarSign },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Merchants", href: "/merchants", icon: Building2 },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Categories", href: "/categories", icon: Layers },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Rules", href: "/rules", icon: Filter },
  { name: "Subscriptions", href: "/subscriptions", icon: Repeat },
  { name: "Export", href: "/export", icon: FileDown },
  { name: "AI Assistant", href: "/chat", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Receipt className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">FinanceAI</h1>
          <p className="text-xs text-sidebar-foreground/60">Smart Categorizer</p>
        </div>
      </div>
      
      <nav className="space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/dashboard"}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
            activeClassName="bg-sidebar-accent text-sidebar-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
