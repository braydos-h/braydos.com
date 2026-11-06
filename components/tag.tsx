import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return <span className={cn("tag", className)}>{children}</span>;
}

export function StatusPill({
  status,
  archived,
  className,
}: {
  status: string | null;
  archived?: boolean;
  className?: string;
}) {
  if (archived) {
    return (
      <span className={cn("status-pill status-pill-warning", className)}>
        <span className="status-dot" aria-hidden="true" />
        Archived
      </span>
    );
  }

  if (!status) return null;

  const variant =
    status === "Active"
      ? "status-pill-positive"
      : status === "Experimental"
        ? "status-pill-violet"
        : status === "Meta"
          ? "status-pill-muted"
          : "status-pill-accent";

  return (
    <span className={cn("status-pill", variant, className)}>
      <span className="status-dot" aria-hidden="true" />
      {status}
    </span>
  );
}
