"use client";

import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ClipboardButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      variant="default"
      className="sm:w-[7rem]"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
      }}
    >
      {isCopied ? (
        <CheckCheck className="h-5 w-5" />
      ) : (
        <Copy className="h-4 w-4" />
      )}{" "}
      <span className="hidden sm:block ml-2">
        {isCopied ? "Copied" : "Get link"}
      </span>
    </Button>
  );
};
export default ClipboardButton;
