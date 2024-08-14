"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ClipboardButton = () => {
  const { toast } = useToast();

  return (
    <Button
      variant="default"
      className=""
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Event link copied",
        });
      }}
    >
      <Copy className="h-4 w-4" /> <span className="hidden sm:block ml-2">Get link</span>
    </Button>
  );
};
export default ClipboardButton;
