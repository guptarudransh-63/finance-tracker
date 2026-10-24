import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Finance Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Track your expenses, manage subscriptions, and analyze your spending patterns
        </p>
        <Button onClick={() => navigate("/auth")} size="lg" className="mt-4">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
