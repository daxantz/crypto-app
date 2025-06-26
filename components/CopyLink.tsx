"use client";
import React, { useState } from "react";
import { Link as LinkImage } from "lucide-react";
import { Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { toast } from "sonner";
const CopyLink = ({ url }: { url: string | undefined }) => {
  const [isCopied, setIsCopied] = useState(false);
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("error copying url");
      }
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }
  if (!url) return <p>URL not found</p>;
  return (
    <div className="bg-[#6161d680] dark:bg-[#1E1932] text-white py-4 px-6 rounded-lg flex gap-4 items-center justify-center font-medium">
      <Link className="flex gap-4" href={url} target="_blank">
        <LinkImage width={20} height={20} />
        <span>{url}</span>
      </Link>
      <Button
        className="dark:bg-transparent bg-transparent"
        disabled={isCopied}
        onClick={() => {
          copyToClipboard(url);
          toast("Copied!", {
            action: {
              label: "close",
              onClick: () => {
                return;
              },
            },
          });
        }}
      >
        <Copy color="white" width={20} height={20} />
      </Button>
    </div>
  );
};

export default CopyLink;
