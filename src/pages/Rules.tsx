import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Rule {
  id: string;
  condition: string;
  keyword: string;
  category: string;
}

const categories = [
  "Groceries",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Dining",
  "Travel",
  "Other",
];

const mockRules: Rule[] = [
  { id: "1", condition: "contains", keyword: "UBER", category: "Transportation" },
  { id: "2", condition: "contains", keyword: "NETFLIX", category: "Entertainment" },
  { id: "3", condition: "contains", keyword: "WHOLE FOODS", category: "Groceries" },
];

export default function Rules() {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [newRule, setNewRule] = useState({
    condition: "contains",
    keyword: "",
    category: "",
  });
  const { toast } = useToast();

  const handleAddRule = () => {
    if (!newRule.keyword || !newRule.category) {
      toast({
        title: "Invalid rule",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const rule: Rule = {
      id: Date.now().toString(),
      ...newRule,
    };

    setRules([...rules, rule]);
    setNewRule({ condition: "contains", keyword: "", category: "" });
    
    toast({
      title: "Rule added",
      description: "Your categorization rule has been created.",
    });
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
    toast({
      title: "Rule deleted",
      description: "The categorization rule has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categorization Rules</h1>
        <p className="mt-2 text-muted-foreground">
          Create rules to automatically categorize transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Condition</Label>
              <Select
                value={newRule.condition}
                onValueChange={(value) =>
                  setNewRule({ ...newRule, condition: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="startsWith">Starts with</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Keyword</Label>
              <Input
                placeholder="e.g., UBER"
                value={newRule.keyword}
                onChange={(e) =>
                  setNewRule({ ...newRule, keyword: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={newRule.category}
                onValueChange={(value) =>
                  setNewRule({ ...newRule, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleAddRule} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Rule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    If description{" "}
                    <span className="font-semibold text-foreground">
                      {rule.condition}
                    </span>{" "}
                    <span className="font-semibold text-primary">
                      "{rule.keyword}"
                    </span>
                  </p>
                  <p className="mt-1 text-sm">
                    → Categorize as{" "}
                    <span className="font-semibold text-foreground">
                      {rule.category}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
