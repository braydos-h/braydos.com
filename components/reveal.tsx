import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  return (
    <div className={cn("reveal", className)} data-reveal data-delay={delay} data-y={y}>
      {children}
    </div>
  );
}
