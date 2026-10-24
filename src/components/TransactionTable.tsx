import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryTag } from "./CategoryTag";
import { Edit2 } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  confidence: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onCategoryChange?: (id: string, category: string) => void;
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

export function TransactionTable({ transactions, onCategoryChange }: TransactionTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const toggleSelectAll = () => {
    if (selected.size === transactions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(transactions.map((t) => t.id)));
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selected.size === transactions.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selected.has(transaction.id)}
                  onCheckedChange={() => toggleSelect(transaction.id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.merchant}</TableCell>
              <TableCell className="font-semibold">
                ₹{Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>
                {editingId === transaction.id ? (
                  <Select
                    defaultValue={transaction.category}
                    onValueChange={(value) => {
                      onCategoryChange?.(transaction.id, value);
                      setEditingId(null);
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <CategoryTag
                    category={transaction.category}
                    confidence={transaction.confidence}
                  />
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingId(transaction.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
