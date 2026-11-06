import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("section-heading", className)}>
      <div className="section-kicker">
        <span className="section-index">{index}</span>
        <span className="section-rule" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>

      <div className="section-heading-row">
        <div>
          <h2 className="section-title">{title}</h2>
          {description ? (
            <p className="section-description">{description}</p>
          ) : null}
        </div>
        {action ? <div className="section-action">{action}</div> : null}
      </div>
    </div>
  );
}
