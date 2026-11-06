import { ArrowUpRight, Github } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { GITHUB_PROFILE_URL } from "@/lib/constants";

export function SiteCta() {
  return (
    <section className="site-cta-section" aria-labelledby="cta-title">
      <div className="site-container">
        <div className="site-cta">
          <div className="site-cta-grid" aria-hidden="true" />
          <div className="site-cta-copy">
            <p className="site-cta-kicker">
              <span className="site-cta-dot" aria-hidden="true" />
              Open source / public work
            </p>
            <h2 id="cta-title">
              Read the code.
              <br />
              Follow the next build.
            </h2>
            <p>
              Most of what I make ends up public. Browse the repositories, read
              the source, or follow along as the next thing takes shape.
            </p>
            <ButtonLink
              href={GITHUB_PROFILE_URL}
              external
              variant="primary"
              className="button-primary"
            >
              <Github size={15} strokeWidth={1.8} aria-hidden="true" />
              github.com/braydos-h
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="site-cta-art" aria-hidden="true">
            <span className="site-cta-orbit site-cta-orbit-one" />
            <span className="site-cta-orbit site-cta-orbit-two" />
            <span className="site-cta-cross site-cta-cross-horizontal" />
            <span className="site-cta-cross site-cta-cross-vertical" />
            <span className="site-cta-mark">b.</span>
            <span className="site-cta-coordinate site-cta-coordinate-top">
              SOURCE / PUBLIC
            </span>
            <span className="site-cta-coordinate site-cta-coordinate-bottom">
              @braydos-h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
