import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Upload from "./pages/Upload";
import Rules from "./pages/Rules";
import Subscriptions from "./pages/Subscriptions";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Budgets from "./pages/Budgets";
import Insights from "./pages/Insights";
import Income from "./pages/Income";
import Goals from "./pages/Goals";
import Merchants from "./pages/Merchants";
import Export from "./pages/Export";
import Categories from "./pages/Categories";
import Alerts from "./pages/Alerts";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isPublicPage = location.pathname === "/auth" || location.pathname === "/";

  if (isPublicPage) {
    return (
      <main className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-64">
        <Topbar />
        <main className="flex-1 p-6 pt-24">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
            <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
            <Route path="/merchants" element={<ProtectedRoute><Merchants /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/rules" element={<ProtectedRoute><Rules /></ProtectedRoute>} />
            <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
            <Route path="/export" element={<ProtectedRoute><Export /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
