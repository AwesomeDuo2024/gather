"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ClipboardButton = () => {
  const { toast } = useToast();

  return (
    <Button
      variant="default"
      className="mb-4"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Event link copied",
        });
      }}
    >
      <Copy className="mr-2 h-4 w-4" /> Copy Event Link
    </Button>
  );
};
export default ClipboardButton;

