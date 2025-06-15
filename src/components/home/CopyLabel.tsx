import React, { useState } from "react";
import { Button } from "../ui/button";
import { Copy, Check } from "lucide-react";

const CopyLabel = ({ text }: { text: string }) => {
  const [label, setLabel] = useState("copy");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy the text: ", err);
    }
  };

  const handleClick = () => {
    copyToClipboard(text);
    setLabel("copied!");
    setCopied(true);
    setTimeout(() => {
      setLabel("copy");
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="h-8 px-3 bg-gradient-to-r from-accent/10 to-primary/10 hover:from-accent/20 hover:to-primary/20 border-accent/20 hover:border-accent/40 transition-all duration-200"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 mr-1.5 text-green-500" />
          <span className="text-xs font-medium text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 mr-1.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Copy</span>
        </>
      )}    </Button>
  );
};

export default CopyLabel;
