import Link from "next/link";

import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="braydos.com — home" className={cn("brand-mark", className)}>
      <span>b</span>
      <span className="brand-dot" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
