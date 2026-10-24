import { useState } from "react";
import { TransactionTable, Transaction } from "@/components/TransactionTable";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    merchant: "Big Bazaar",
    amount: -1274.50,
    category: "Groceries",
    confidence: 95,
  },
  {
    id: "2",
    date: "2024-01-14",
    merchant: "Indian Oil Petrol",
    amount: -523.00,
    category: "Transportation",
    confidence: 88,
  },
  {
    id: "3",
    date: "2024-01-14",
    merchant: "Netflix",
    amount: -649.00,
    category: "Entertainment",
    confidence: 98,
  },
  {
    id: "4",
    date: "2024-01-13",
    merchant: "Cafe Coffee Day",
    amount: -275.00,
    category: "Dining",
    confidence: 92,
  },
  {
    id: "5",
    date: "2024-01-12",
    merchant: "Amazon India",
    amount: -2499.00,
    category: "Shopping",
    confidence: 65,
  },
  {
    id: "6",
    date: "2024-01-12",
    merchant: "Uber",
    amount: -245.00,
    category: "Transportation",
    confidence: 90,
  },
  {
    id: "7",
    date: "2024-01-11",
    merchant: "Reliance Fresh",
    amount: -1562.30,
    category: "Shopping",
    confidence: 78,
  },
  {
    id: "8",
    date: "2024-01-10",
    merchant: "Electricity Board",
    amount: -1426.70,
    category: "Utilities",
    confidence: 96,
  },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const { toast } = useToast();

  const handleCategoryChange = (id: string, category: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, category, confidence: 100 } : t))
    );
    toast({
      title: "Category updated",
      description: "Transaction category has been successfully updated.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting transactions",
      description: "Your transaction data is being prepared for download.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your categorized transactions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <TransactionTable
        transactions={transactions}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}
