import { ArrowRight, ArrowUpRight, Github } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { GITHUB_PROFILE_URL } from "@/lib/constants";

const STACK = [
  { name: "Rust", color: "rust" },
  { name: "Go", color: "go" },
  { name: "TypeScript", color: "typescript" },
  { name: "Python", color: "python" },
  { name: "Bash", color: "shell" },
];

export function Hero({ repositoryCount }: { repositoryCount: number }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid-bg" />
        <div className="hero-glow hero-glow-blue" />
        <div className="hero-glow hero-glow-violet" />
        <div className="hero-edge-mark hero-edge-mark-left" />
        <div className="hero-edge-mark hero-edge-mark-right" />
      </div>

      <div className="site-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Brayden Habets
              <span className="hero-eyebrow-divider" aria-hidden="true" />
              <span>github.com/braydos-h</span>
            </p>

            <h1 id="hero-title" className="hero-title">
              <span className="hero-hello">Hey, I&apos;m</span>
              <span className="hero-name">
                Brayden
                <span className="hero-name-dot" aria-hidden="true" />
              </span>
            </h1>

            <p className="hero-lead">
              I build things for security, networking, and the internet.
            </p>

            <p className="hero-support">
              I&apos;m drawn to the layer where things actually happen: how a
              packet crosses the wire, where a permission boundary fails, or why
              an automated run cannot prove its own result. Most of what I build
              starts with taking a system apart to understand it.
            </p>

            <div className="hero-actions">
              <ButtonLink href="/projects" className="button-primary">
                View my projects
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={GITHUB_PROFILE_URL}
                external
                variant="secondary"
                className="button-secondary"
              >
                <Github size={15} strokeWidth={1.8} aria-hidden="true" />
                GitHub profile
                <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </ButtonLink>
            </div>

            <div className="hero-stack">
              <span className="hero-stack-label">Working across</span>
              <ul className="hero-stack-list" aria-label="Core technologies">
                {STACK.map((tech) => (
                  <li key={tech.name}>
                    <span className={`tech-dot tech-dot-${tech.color}`} aria-hidden="true" />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <HeroInstrument />
        </div>

        <dl className="hero-meta">
          <div>
            <dt>Public repositories</dt>
            <dd>{repositoryCount.toString().padStart(2, "0")} indexed</dd>
          </div>
          <div>
            <dt>Core stack</dt>
            <dd>Rust / Go / TypeScript</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Security / networks / systems</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>
              <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer noopener">
                github.com/braydos-h
                <ArrowUpRight size={11} aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function HeroInstrument() {
  return (
    <div className="hero-visual-wrap" aria-hidden="true">
      <div className="hero-visual-glow" />
      <div className="signal-panel">
        <div className="signal-panel-top">
          <span className="signal-panel-label">
            <span className="signal-status-dot" />
            public profile
          </span>
          <span className="signal-panel-id">FIELD / 01</span>
        </div>

        <div className="signal-stage">
          <div className="signal-grid" />
          <div className="signal-scan" />
          <svg
            className="signal-svg"
            viewBox="0 0 520 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="260" cy="170" r="74" stroke="currentColor" strokeOpacity="0.14" />
            <circle cx="260" cy="170" r="126" stroke="currentColor" strokeOpacity="0.08" />
            <circle cx="260" cy="170" r="184" stroke="currentColor" strokeOpacity="0.04" />
            <path
              d="M260 46V295M110 170H410"
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeDasharray="2 6"
            />
            <path
              className="signal-dash"
              d="M140 238C186 213 205 119 282 96C337 79 391 119 402 164"
              stroke="url(#signal-line)"
              strokeWidth="1.1"
              strokeDasharray="5 8"
            />
            <path
              d="M382 250C339 224 319 272 260 170C221 103 187 136 124 113"
              stroke="currentColor"
              strokeOpacity="0.13"
            />
            <defs>
              <linearGradient id="signal-line" x1="140" y1="238" x2="402" y2="164">
                <stop stopColor="rgb(var(--cyan))" stopOpacity="0.8" />
                <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          <span className="signal-coordinate signal-coordinate-tl">NET / 01</span>
          <span className="signal-coordinate signal-coordinate-br">SYS / 03</span>

          <div className="signal-center">
            <span className="signal-orbit signal-orbit-outer" />
            <span className="signal-orbit signal-orbit-inner" />
            <span className="signal-center-mark">b.</span>
          </div>

          <span className="signal-node signal-node-security">
            <span className="signal-node-line" />
            <span className="signal-node-index">01</span>
            SECURITY
          </span>
          <span className="signal-node signal-node-networking">
            <span className="signal-node-line" />
            <span className="signal-node-index">02</span>
            NETWORKS
          </span>
          <span className="signal-node signal-node-systems">
            <span className="signal-node-line" />
            <span className="signal-node-index">03</span>
            SYSTEMS
          </span>
        </div>

        <div className="signal-readouts">
          <div>
            <span>method</span>
            <strong>understand / build / verify</strong>
          </div>
          <div>
            <span>mode</span>
            <strong>local-first</strong>
          </div>
        </div>

        <div className="signal-terminal">
          <div className="signal-terminal-command">
            <span className="terminal-prompt">$</span>
            <span>cat ~/.bio</span>
          </div>
          <p>
            i break stuff, then fix it
            <span className="terminal-cursor">_</span>
          </p>
        </div>

        <div className="signal-panel-bottom">
          <span>braydos-h</span>
          <span className="signal-panel-bottom-line" />
          <span>PUBLIC / OPEN SOURCE</span>
        </div>
      </div>
    </div>
  );
}
