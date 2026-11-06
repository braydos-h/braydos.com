import {
  ArrowRight,
  ArrowUpRight,
  Bolt,
  Camera,
  Database,
  FileText,
  Fingerprint,
  GitBranch,
  Globe2,
  Network,
  Radio,
  Ruler,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import { cn } from "@/lib/cn";
import type { ProjectVisual as ProjectVisualVariant } from "@/lib/types";

type ProjectVisualProps = {
  variant: ProjectVisualVariant;
  large?: boolean;
  name?: string;
  tech?: string[];
};

export function ProjectVisual({
  variant,
  large = false,
  name,
  tech = [],
}: ProjectVisualProps) {
  switch (variant) {
    case "breachpilot":
      return <BreachPilotVisual large={large} />;
    case "axion":
      return <AxionVisual large={large} />;
    case "xray":
      return <XrayVisual large={large} />;
    case "vless":
      return <VlessVisual large={large} />;
    case "aif":
      return <AifVisual large={large} />;
    case "mullvad":
      return <MullvadVisual large={large} />;
    case "skill":
      return <SkillVisual large={large} />;
    case "website":
      return <WebsiteVisual large={large} />;
    case "profile":
      return <ProfileVisual large={large} />;
    default:
      return <GenericVisual large={large} name={name} tech={tech} />;
  }
}

function VisualTop({
  label,
  code,
  icon: Icon = Terminal,
}: {
  label: string;
  code: string;
  icon?: typeof Terminal;
}) {
  return (
    <div className="pv-top">
      <span className="pv-top-label">
        <Icon size={11} strokeWidth={1.8} aria-hidden="true" />
        {label}
      </span>
      <span className="pv-top-code">{code}</span>
    </div>
  );
}

function BreachPilotVisual({ large }: { large: boolean }) {
  const phases = [
    { index: "01", label: "SCOPE", detail: "allowlist + mission gate" },
    { index: "02", label: "EXECUTE", detail: "contained operator loop" },
    { index: "03", label: "VERIFY", detail: "stored evidence probes" },
    { index: "04", label: "REPORT", detail: "findings + audit trail" },
  ];

  return (
    <div className={cn("pv", "pv-breachpilot", large && "pv-large")}>
      <VisualTop label="Operational loop" code="BP / 01" icon={ShieldCheck} />

      <div className="pv-breach-body">
        <div className="pv-breach-track">
          {phases.map((phase, index) => (
            <div className="pv-breach-phase" key={phase.label}>
              <span className="pv-breach-phase-index">{phase.index}</span>
              <span className="pv-breach-phase-dot" aria-hidden="true" />
              <div>
                <strong>{phase.label}</strong>
                <span>{phase.detail}</span>
              </div>
              {index < phases.length - 1 ? (
                <span className="pv-breach-phase-line" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <div className="pv-breach-side">
          <div className="pv-breach-chip">
            <span className="status-dot" />
            evidence linked
          </div>
          <div className="pv-breach-mini-panel">
            <span className="pv-mono-label">CONTAINMENT</span>
            <strong>Docker worker</strong>
            <span>default-drop network</span>
          </div>
          <div className="pv-breach-mini-panel">
            <span className="pv-mono-label">TRAIL</span>
            <strong>SHA-256 chain</strong>
            <span>every action recorded</span>
          </div>
        </div>
      </div>

      <div className="pv-terminal">
        <div className="pv-terminal-command">
          <span className="pv-prompt">$</span>
          <span>bp --target 10.0.0.50 --mode recon</span>
        </div>
        <span className="pv-terminal-note">authorized targets only</span>
      </div>

      <span className="pv-watermark" aria-hidden="true">
        01
      </span>
    </div>
  );
}

function AxionVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-axion", large && "pv-large")}>
      <VisualTop label="Passive observation" code="AX / FLOW" icon={Radio} />

      <div className="pv-axion-body">
        <div className="pv-radar">
          <span className="pv-radar-ring pv-radar-ring-1" />
          <span className="pv-radar-ring pv-radar-ring-2" />
          <span className="pv-radar-ring pv-radar-ring-3" />
          <span className="pv-radar-crosshair" />
          <span className="pv-radar-sweep" />
          <span className="pv-radar-node pv-radar-node-1" />
          <span className="pv-radar-node pv-radar-node-2" />
          <span className="pv-radar-node pv-radar-node-3" />
          <span className="pv-radar-label pv-radar-label-1">CLIENT HELLO</span>
          <span className="pv-radar-label pv-radar-label-2">SNI / TLS</span>
          <div className="pv-radar-core">
            <Fingerprint size={20} strokeWidth={1.25} />
          </div>
          <span className="pv-radar-coordinate">FLOW / LOOPBACK</span>
        </div>

        <div className="pv-axion-meta">
          <div className="pv-data-row">
            <span>Capture</span>
            <strong>TCP / UDP</strong>
          </div>
          <div className="pv-data-row">
            <span>Mode</span>
            <strong>passive</strong>
          </div>
          <div className="pv-data-row">
            <span>Decrypts</span>
            <strong>nothing</strong>
          </div>
          <div className="pv-data-row">
            <span>Dashboard</span>
            <strong>127.0.0.1</strong>
          </div>
        </div>
      </div>

      <div className="pv-footer-strip">
        <span>
          <Network size={11} /> packets in
        </span>
        <ArrowRight size={12} className="text-faint" />
        <span>flows</span>
        <ArrowRight size={12} className="text-faint" />
        <span>visible metadata</span>
      </div>
      <span className="pv-watermark" aria-hidden="true">
        02
      </span>
    </div>
  );
}

function XrayVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-xray", large && "pv-large")}>
      <VisualTop label="Transport path" code="WS / TLS" icon={Globe2} />

      <div className="pv-hop-chain">
        <div className="pv-hop">
          <span className="pv-hop-icon">
            <ArrowUpRight size={15} />
          </span>
          <strong>CLIENT</strong>
          <span>VLESS</span>
        </div>
        <div className="pv-hop-link">
          <span className="pv-hop-packet" />
        </div>
        <div className="pv-hop">
          <span className="pv-hop-icon">
            <Globe2 size={15} />
          </span>
          <strong>CDN</strong>
          <span>optional</span>
        </div>
        <div className="pv-hop-link">
          <span className="pv-hop-packet pv-hop-packet-delayed" />
        </div>
        <div className="pv-hop">
          <span className="pv-hop-icon">
            <Network size={15} />
          </span>
          <strong>NGINX</strong>
          <span>:443 / TLS</span>
        </div>
        <div className="pv-hop-link">
          <span className="pv-hop-packet pv-hop-packet-slow" />
        </div>
        <div className="pv-hop">
          <span className="pv-hop-icon">
            <Bolt size={15} />
          </span>
          <strong>XRAY</strong>
          <span>:10000 / local</span>
        </div>
      </div>

      <div className="pv-xray-notes">
        <span>
          <span className="pv-small-dot" />
          cover site on /
        </span>
        <span>
          <span className="pv-small-dot" />
          websocket proxy
        </span>
        <span>
          <span className="pv-small-dot" />
          systemd services
        </span>
      </div>

      <div className="pv-terminal">
        <div className="pv-terminal-command">
          <span className="pv-prompt">$</span>
          <span>sudo ./setup.sh</span>
        </div>
        <span className="pv-terminal-note">12 steps / ~3 min</span>
      </div>
      <span className="pv-watermark" aria-hidden="true">
        03
      </span>
    </div>
  );
}

function VlessVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-vless", large && "pv-large")}>
      <VisualTop label="Deployment state" code="REALITY / VISION" icon={GitBranch} />

      <div className="pv-generation">
        <div className="pv-generation-row">
          <span className="pv-generation-label">previous</span>
          <div className="pv-generation-block">
            <span>generation 04</span>
            <span className="pv-generation-hash">preserved</span>
          </div>
        </div>

        <div className="pv-generation-switch" aria-hidden="true">
          <span />
          <ArrowRight size={12} />
        </div>

        <div className="pv-generation-row pv-generation-row-current">
          <span className="pv-generation-label">live</span>
          <div className="pv-generation-block">
            <span>generation 05</span>
            <span className="pv-generation-hash">current →</span>
          </div>
        </div>
      </div>

      <div className="pv-lifecycle">
        {["preflight", "validate", "atomic switch", "rollback ready"].map(
          (step, index) => (
            <div className="pv-lifecycle-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ),
        )}
      </div>

      <div className="pv-terminal">
        <div className="pv-terminal-command">
          <span className="pv-prompt">$</span>
          <span>xray-reality-bootstrap diagnose</span>
        </div>
        <span className="pv-terminal-note">secrets redacted</span>
      </div>
      <span className="pv-watermark" aria-hidden="true">
        04
      </span>
    </div>
  );
}

function AifVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-aif", large && "pv-large")}>
      <VisualTop label="Weight estimate" code="PHOTO + TAPE" icon={Camera} />

      <div className="pv-aif-body">
        <div className="pv-aif-photo">
          <span className="pv-aif-corner pv-aif-corner-tl" />
          <span className="pv-aif-corner pv-aif-corner-tr" />
          <span className="pv-aif-corner pv-aif-corner-bl" />
          <span className="pv-aif-corner pv-aif-corner-br" />
          <span className="pv-aif-crosshair" />
          <span className="pv-aif-photo-label">PHOTO / AI ESTIMATE</span>
          <span className="pv-aif-photo-sub">approximate ±10%</span>
        </div>

        <div className="pv-aif-readout">
          <div className="pv-aif-meter">
            <div className="pv-aif-meter-head">
              <span>
                <Camera size={11} /> PHOTO
              </span>
              <strong>±10%</strong>
            </div>
            <div className="pv-aif-bar">
              <span style={{ width: "68%" }} />
            </div>
          </div>
          <div className="pv-aif-meter">
            <div className="pv-aif-meter-head">
              <span>
                <Ruler size={11} /> TAPE
              </span>
              <strong>±5%</strong>
            </div>
            <div className="pv-aif-bar pv-aif-bar-tape">
              <span style={{ width: "42%" }} />
            </div>
          </div>
          <p className="pv-aif-warning">
            Cross-check disagreement &gt;20% is flagged.
          </p>
        </div>
      </div>

      <div className="pv-footer-strip">
        <span>
          <Ruler size={11} /> Schaeffer formula
        </span>
        <span className="pv-footer-divider" />
        <span>
          <Database size={11} /> owner-scoped records
        </span>
      </div>
      <span className="pv-watermark" aria-hidden="true">
        05
      </span>
    </div>
  );
}

function MullvadVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-mullvad", large && "pv-large")}>
      <VisualTop label="Endpoint check" code="SOCKS5 / 1080" icon={Radio} />
      <div className="pv-mullvad-body">
        <div className="pv-endpoint-grid">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "pv-endpoint",
                index === 4 || index === 11 || index === 19
                  ? "pv-endpoint-active"
                  : "pv-endpoint-idle",
              )}
            />
          ))}
          <span className="pv-endpoint-scan" />
        </div>
        <div className="pv-mullvad-readout">
          <div className="pv-data-row">
            <span>Transport</span>
            <strong>curl over SOCKS5</strong>
          </div>
          <div className="pv-data-row">
            <span>Checks</span>
            <strong>parallel workers</strong>
          </div>
          <div className="pv-data-row">
            <span>Output</span>
            <strong>CSV export</strong>
          </div>
        </div>
      </div>
      <div className="pv-footer-strip">
        <span>
          <Radio size={11} /> reachability
        </span>
        <span className="pv-footer-divider" />
        <span>public IP</span>
        <span className="pv-footer-divider" />
        <span>server identity</span>
      </div>
    </div>
  );
}

function SkillVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-skill", large && "pv-large")}>
      <VisualTop label="Portable agent skill" code="SKILL / MD" icon={FileText} />
      <div className="pv-skill-body">
        <div className="pv-doc-stack">
          <div className="pv-doc pv-doc-back" />
          <div className="pv-doc pv-doc-mid" />
          <div className="pv-doc pv-doc-front">
            <span className="pv-doc-kicker">BREACHPILOT-MINDSET</span>
            <strong>SKILL.md</strong>
            <div className="pv-doc-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className="pv-doc-path">references/</span>
          </div>
        </div>
        <div className="pv-skill-steps">
          {["scope", "observe", "hypothesize", "verify"].map((step, index) => (
            <div key={step} className="pv-skill-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              {index < 3 ? <ArrowRight size={11} /> : <ShieldCheck size={12} />}
            </div>
          ))}
        </div>
      </div>
      <div className="pv-footer-strip">
        <span>Claude Code</span>
        <span className="pv-footer-divider" />
        <span>Codex</span>
        <span className="pv-footer-divider" />
        <span>plain Markdown</span>
      </div>
    </div>
  );
}

function WebsiteVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-website", large && "pv-large")}>
      <VisualTop label="Public site" code="STATIC / ISR" icon={Globe2} />
      <div className="pv-browser">
        <div className="pv-browser-bar">
          <span className="pv-browser-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="pv-browser-url">braydos.com</span>
          <span className="pv-browser-lock" />
        </div>
        <div className="pv-browser-page">
          <div className="pv-browser-nav">
            <span className="pv-browser-brand">b.</span>
            <span className="pv-browser-links">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className="pv-browser-hero">
            <span className="pv-browser-kicker" />
            <span className="pv-browser-title" />
            <span className="pv-browser-title pv-browser-title-short" />
            <span className="pv-browser-copy" />
            <span className="pv-browser-button" />
          </div>
          <div className="pv-browser-cards">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="pv-footer-strip">
        <span>Next.js App Router</span>
        <span className="pv-footer-divider" />
        <span>GitHub API</span>
        <span className="pv-footer-divider" />
        <span>local overrides</span>
      </div>
    </div>
  );
}

function ProfileVisual({ large }: { large: boolean }) {
  return (
    <div className={cn("pv", "pv-profile", large && "pv-large")}>
      <VisualTop label="GitHub profile" code="README / PUBLIC" icon={FileText} />
      <div className="pv-profile-body">
        <div className="pv-profile-avatar">b.</div>
        <div className="pv-profile-copy">
          <span className="pv-mono-label">GITHUB / BRAYDOS-H</span>
          <strong>Brayden Habets</strong>
          <p>Minimal profile README. The real work lives in the repositories.</p>
        </div>
      </div>
      <div className="pv-footer-strip">
        <span>Public by default</span>
        <span className="pv-footer-divider" />
        <span>Source first</span>
      </div>
    </div>
  );
}

function GenericVisual({
  large,
  name,
  tech,
}: {
  large: boolean;
  name?: string;
  tech: string[];
}) {
  const initials = (name ?? "repo")
    .split(/[\s._-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("pv", "pv-generic", large && "pv-large")}>
      <VisualTop label="Public repository" code="GITHUB / SYNC" icon={GitBranch} />
      <div className="pv-generic-body">
        <span className="pv-generic-mark">{initials}</span>
        <div className="pv-generic-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="pv-generic-tech">
          {tech.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <div className="pv-footer-strip">
        <span>
          <GitBranch size={11} /> synced from GitHub
        </span>
        <span className="pv-footer-divider" />
        <span>public metadata</span>
      </div>
    </div>
  );
}
