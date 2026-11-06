import Link from "next/link";

import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-grid-bg" aria-hidden="true" />
      <div className="site-container">
        <div className="not-found-inner">
          <p className="page-kicker">
            <span className="page-kicker-index">404</span>
            <span className="page-kicker-line" aria-hidden="true" />
            Route not found
          </p>

          <div className="not-found-display" aria-hidden="true">
            404
          </div>

          <div className="not-found-copy">
            <h1>No signal on this route.</h1>
            <p>
              The page you asked for is not part of the public index. It may have
              moved, never existed, or only lives somewhere deeper in the source.
            </p>
            <div className="terminal-card">
              <p>
                <span className="terminal-prompt">$</span> locate requested-page
              </p>
              <p className="terminal-muted">no matches in public index</p>
              <p>
                <span className="terminal-prompt">$</span>
                <span className="terminal-cursor">_</span>
              </p>
            </div>
            <div className="not-found-actions">
              <ButtonLink href="/" className="button-primary">
                Back home
              </ButtonLink>
              <ButtonLink
                href="/projects"
                variant="secondary"
                className="button-secondary"
              >
                Browse projects
              </ButtonLink>
            </div>
            <p className="not-found-hint">
              Or search from anywhere with <kbd>Ctrl</kbd> + <kbd>K</kbd>.
            </p>
            <Link href="/" className="sr-only">
              Return to the homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
