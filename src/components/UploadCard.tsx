import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  onUpload: (file: File) => Promise<void>;
}

export function UploadCard({ onUpload }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.type === "application/pdf")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      await onUpload(file);
      setProgress(100);
      setTimeout(() => {
        setFile(null);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      clearInterval(interval);
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-lg border-2 border-dashed p-12 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          )}
        >
          {!file ? (
            <>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Drop your files here
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                CSV or PDF files up to 10MB
              </p>
              <input
                type="file"
                accept=".csv,.pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="mt-4" asChild>
                  <span className="cursor-pointer">Browse Files</span>
                </Button>
              </label>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFile(null)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {uploading && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Uploading... {progress}%
                  </p>
                </div>
              )}

              {!uploading && (
                <Button onClick={handleUpload} className="mt-4 w-full">
                  Upload & Process
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
