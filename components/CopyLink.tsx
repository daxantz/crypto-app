"use client";
import React, { useState } from "react";
import { Link as LinkImage } from "lucide-react";
import { Copy } from "lucide-react";
import Link from "next/link";
const CopyLink = ({ url }: { url: string }) => {
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
  return (
    <div className="bg-[#1E1932] py-4 px-6 rounded-lg flex gap-4 items-center justify-center">
      <Link
        className="flex gap-4"
        href="https://www.example.com"
        target="_blank"
      >
        <LinkImage width={20} height={20} />
        <span>{url}</span>
      </Link>
      <button disabled={isCopied} onClick={() => copyToClipboard(url)}>
        <Copy width={20} height={20} />
      </button>
      <p>{isCopied && "Copied!"}</p>
    </div>
  );
};

export default CopyLink;
