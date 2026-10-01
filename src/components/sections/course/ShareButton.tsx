"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** Opens the native share sheet, or copies the page link where sharing is unsupported. */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button size="sm" onClick={handleShare} className="self-start">
      {copied ? <Check aria-hidden className="size-4" /> : <Share2 aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </Button>
  );
}
