import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, FileDown, Calculator, Clock } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

const exportOptions = [
  {
    icon: FileText,
    title: "Export to CSV",
    description: "Download your transactions in a spreadsheet-friendly format",
    format: "CSV",
    color: "text-chart-1",
  },
  {
    icon: FileDown,
    title: "Export to PDF",
    description: "Generate a formatted PDF report of your finances",
    format: "PDF",
    color: "text-chart-2",
  },
  {
    icon: FileSpreadsheet,
    title: "Export to Excel",
    description: "Get an Excel workbook with detailed transaction data",
    format: "XLSX",
    color: "text-chart-3",
  },
  {
    icon: Calculator,
    title: "Tax Report",
    description: "Generate a comprehensive report for tax filing purposes",
    format: "Tax Report",
    color: "text-chart-4",
  },
];

export default function Export() {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format}`,
      description: `Your ${format} report is being prepared for download.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Export Center</h1>
        <p className="text-muted-foreground">Download your financial data in various formats</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {exportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.format} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => handleExport(option.format)}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export {option.format}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            We're working on additional export features to make managing your finances even easier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Automated monthly report scheduling
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Custom date range selection
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Export templates for different use cases
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-primary" />
            Integration with accounting software
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
