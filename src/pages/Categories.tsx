import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialCategories = [
  { id: 1, name: "Food & Dining", icon: "🍔", color: "#FF6B6B", transactionCount: 145 },
  { id: 2, name: "Transportation", icon: "🚗", color: "#4ECDC4", transactionCount: 67 },
  { id: 3, name: "Entertainment", icon: "🎬", color: "#95E1D3", transactionCount: 43 },
  { id: 4, name: "Shopping", icon: "🛍️", color: "#F38181", transactionCount: 89 },
  { id: 5, name: "Utilities", icon: "⚡", color: "#FEC89A", transactionCount: 24 },
  { id: 6, name: "Healthcare", icon: "🏥", color: "#A8E6CF", transactionCount: 12 },
  { id: 7, name: "Education", icon: "📚", color: "#FFD93D", transactionCount: 8 },
  { id: 8, name: "Travel", icon: "✈️", color: "#6BCF7F", transactionCount: 15 },
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("🏷️");
  const [categoryColor, setCategoryColor] = useState("#FF6B6B");
  const { toast } = useToast();

  const handleCreateCategory = () => {
    if (!categoryName.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
      });
      return;
    }

    const newCat = {
      id: Date.now(),
      name: categoryName.trim(),
      icon: categoryIcon || "🏷️",
      color: categoryColor,
      transactionCount: 0,
    };

    setCategories((prev) => [...prev, newCat]);
    setCategoryName("");
    setCategoryIcon("🏷️");
    setIsModalOpen(false);

    toast({
      title: "Category created",
      description: `Category "${newCat.name}" has been created.`,
    });
  };

  const handleDeleteCategory = (id: number, name: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Category removed",
      description: `Category "${name}" has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Manager</h1>
          <p className="text-muted-foreground">Organize and customize your transaction categories</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Subscriptions"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-icon">Icon (Emoji)</Label>
                <Input
                  id="category-icon"
                  placeholder="📱"
                  value={categoryIcon}
                  maxLength={4}
                  onChange={(e) => setCategoryIcon(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-color">Color</Label>
                <Input
                  id="category-color"
                  type="color"
                  value={categoryColor}
                  onChange={(e) => setCategoryColor(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleCreateCategory}>
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <GripVertical className="h-4 w-4" />
            Drag and drop to reorder categories
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
              >
                <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
                
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.transactionCount} transactions
                  </p>
                </div>

                <div
                  className="h-4 w-4 rounded-full border-2 border-background"
                  style={{ backgroundColor: category.color }}
                />

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    aria-label={`Delete ${category.name}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            💡 Tip: Organize categories in the order you use them most. Categories at the top 
            will appear first in dropdowns and filters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
