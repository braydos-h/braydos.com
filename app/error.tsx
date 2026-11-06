"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { ButtonLink } from "@/components/button-link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="error-page">
      <div className="site-container">
        <div className="error-panel">
          <p className="page-kicker">
            <span className="page-kicker-index">500</span>
            <span className="page-kicker-line" aria-hidden="true" />
            Unexpected interruption
          </p>
          <div className="error-code" aria-hidden="true">
            !
          </div>
          <h1>That page hit a broken edge.</h1>
          <p>
            Something failed while rendering this view. The public index and the
            rest of the site are still available; try again or head back home.
          </p>
          <div className="not-found-actions">
            <button type="button" className="button button-primary" onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" />
              Try again
            </button>
            <ButtonLink href="/" variant="secondary" className="button-secondary">
              Back home
            </ButtonLink>
          </div>
          <Link href="/projects" className="text-link">
            Or browse all public projects
          </Link>
        </div>
      </div>
    </section>
  );
}
