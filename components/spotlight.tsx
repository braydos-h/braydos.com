"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

import { cn } from "@/lib/cn";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("spotlight-card", className)}
    >
      {children}
    </article>
  );
}
