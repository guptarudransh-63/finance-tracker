import { UploadCard } from "@/components/UploadCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "@/lib/api";

export default function Upload() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    try {
      await uploadFile(file);
      toast({
        title: "Upload successful",
        description: "Your file has been processed and transactions are ready to view.",
      });
      navigate("/transactions");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Upload Bank Statement</h1>
        <p className="mt-2 text-muted-foreground">
          Upload your CSV or PDF bank statement to categorize transactions
        </p>
      </div>
      <UploadCard onUpload={handleUpload} />
    </div>
  );
}
