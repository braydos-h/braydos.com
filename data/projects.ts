import type { ProjectConfig } from "@/lib/types";

/**
 * Edit this list to change which projects appear on the homepage and in what
 * order. Any repository not in this list still appears on /projects.
 * Add `hidden: true` to a repository below to remove it from the site.
 */
export const FEATURED_ORDER = [
  "BreachPilot",
  "Axion",
  "xray-vless-ws-cdn-installer",
  "vless-xtls-vision-installer",
  "aif-project",
] as const;

/**
 * Local editorial overrides. GitHub supplies live repository metadata; this
 * file supplies the parts that should not be guessed from a repo name:
 * descriptions, categories, status, technical context, and verified links.
 */
export const PROJECT_OVERRIDES: Record<string, ProjectConfig> = {
  BreachPilot: {
    displayName: "BreachPilot",
    slug: "breachpilot",
    summary:
      "An autonomous security-testing operator that plans, executes, verifies, and reports authorized assessments — with scope enforcement and evidence at every step.",
    category: "Security",
    status: "Active",
    tech: ["Go", "Rust", "TypeScript", "React", "Docker", "MCP"],
    visual: "breachpilot",
    demo: {
      label: "Visit the BreachPilot site",
      href: "https://breachpilot-site.vercel.app/",
      kind: "site",
    },
    demos: [
      {
        label: "BreachPilot public site",
        href: "https://breachpilot-site.vercel.app/",
        kind: "site",
      },
      {
        label: "Architecture and safety docs",
        href: "https://github.com/braydos-h/BreachPilot/tree/main/docs",
        kind: "docs",
      },
    ],
    details: {
      tagline: "Autonomy inside a boundary.",
      overview: [
        "BreachPilot is an open-source agentic operator for authorized security assessments. It moves a target through reconnaissance, exploitation, post-exploitation, finding verification, and reporting in one run — from a local WebUI or a scriptable CLI.",
        "The project is built as a native Go control plane and a Rust execution plane, with a React and TypeScript interface on top. Its focus is not how many tools it can list, but whether a result can be reproduced and whether every action stayed inside scope.",
      ],
      why:
        "Autonomous security work is only useful when its conclusions survive scrutiny. BreachPilot is designed around the checks that surround those decisions: a target allowlist, a mission scope gate, disposable workers, fail-closed sandbox errors, and a tamper-evident audit trail. Execution success is tracked separately from evidential success.",
      highlights: [
        {
          title: "End-to-end assessment loop",
          description:
            "Reconnaissance, exploitation, privilege escalation, lateral movement, verification, and reporting through one operator surface.",
        },
        {
          title: "Evidence-linked findings",
          description:
            "Stored verification probes are re-executed. Findings resolve to VERIFIED, HOLDING, or INCONCLUSIVE instead of relying on an agent's claim.",
        },
        {
          title: "Containment by default",
          description:
            "Attack commands run in disposable, capability-dropped Docker workers with a default-DROP network boundary. Sandbox failures block execution.",
        },
        {
          title: "Multi-agent orchestration",
          description:
            "A six-specialist swarm for high-value targets and a persistent campaign queue for multi-target, multi-phase runs.",
        },
        {
          title: "Native control and execution planes",
          description:
            "Go drives the control plane, Rust runs the execution sidecar over protobuf IPC, and the React interface speaks the same API.",
        },
        {
          title: "Reports with provenance",
          description:
            "Markdown and HTML reports, attack graphs, MITRE ATT&CK Navigator export, and issue creation for Jira and GitHub.",
        },
      ],
      architecture: {
        intro:
          "A run passes through separate surfaces for authorization, execution, evidence, and reporting.",
        steps: [
          {
            title: "Operator surface",
            description:
              "The WebUI or CLI submits a target and mode to the Go run service. The target allowlist and mission scope gate remain in the path.",
          },
          {
            title: "Agent loop",
            description:
              "The exploit agent calls gated MCP tools, optionally fanning out to the specialist swarm or campaign orchestrator.",
          },
          {
            title: "Contained execution",
            description:
              "Commands execute inside a per-run Docker worker with a read-only root filesystem, dropped capabilities, and an egress firewall.",
          },
          {
            title: "Evidence and audit",
            description:
              "Results return as evidence-linked findings. Every action lands in a SHA-256-chained JSONL audit trail.",
          },
        ],
      },
      notes: [
        "Authorized testing only. Run the operator from an isolated, throwaway machine or VM.",
        "Linux is the primary platform for the full tool arsenal and Docker network containment. Windows has native bp.exe and bp-sidecar.exe support.",
        "The repository avoids headline reliability claims until its hermetic evaluation produces live numbers. The existing GitHub release is an asset-less beta prerelease; installing from a checkout is currently the documented path.",
      ],
    },
  },

  Axion: {
    displayName: "Axion",
    slug: "axion",
    summary:
      "A Rust application that turns passive packet captures into flow-level network intelligence and a local view of visible TLS handshakes.",
    category: "Networking",
    status: "Active",
    tech: ["Rust", "libpcap", "Workers AI", "JavaScript", "Linux"],
    visual: "axion",
    details: {
      tagline: "Watch the handshake. Leave the wire alone.",
      overview: [
        "Axion is a passive network traffic intelligence application written in Rust. It groups observed TCP and UDP packets into flows, extracts visible TLS ClientHello metadata, and presents local heuristics and optional Cloudflare Workers AI assessments in an embedded dashboard.",
        "It can observe a live interface, replay a PCAP, or generate simulated demo data. Live capture needs libpcap or Npcap permissions; replay and demo do not. The dashboard binds to loopback by default.",
      ],
      why:
        "Shallow traffic views either stop at raw packets or hide their judgment inside a black box. Axion keeps the observation local and explainable: reconstructed flows, visible handshake fields, local heuristics, and an optional AI assessment with identity sharing disabled by default. It observes copies of traffic; it does not inject, modify, block, or decrypt packets.",
      highlights: [
        {
          title: "Flow-level reconstruction",
          description:
            "TCP and UDP packets are grouped into bounded, expiring flows instead of being presented as an undifferentiated packet stream.",
        },
        {
          title: "Visible TLS metadata",
          description:
            "ClientHello fields are surfaced without decryption, alongside local heuristics and a separate cloud model score when enabled.",
        },
        {
          title: "Three ways to observe",
          description:
            "Use live packet capture, deterministic demo traffic marked as simulated, or an offline PCAP replay.",
        },
        {
          title: "Local-first dashboard",
          description:
            "Embedded web assets, loopback-only binding by default, host and origin checks, and no built-in remote authentication surface.",
        },
        {
          title: "Bounded cloud analysis",
          description:
            "Optional Workers AI requests travel through a rate-limited queue. Raw payloads are never sent, and IP addresses and SNI are omitted unless explicitly enabled.",
        },
        {
          title: "Release discipline",
          description:
            "Native Linux x86-64 and ARM64 archives are built and tested in CI, with checksums published alongside the binaries.",
        },
      ],
      architecture: {
        intro:
          "The capture path stays separate from the interface and from the optional cloud path.",
        steps: [
          {
            title: "Capture a copy",
            description:
              "Axion opens a local interface through libpcap or Npcap. Demo and replay modes bypass capture permissions entirely.",
          },
          {
            title: "Group and inspect",
            description:
              "A flow worker groups packets, bounds memory and expiry, and extracts visible TLS ClientHello metadata without decrypting payloads.",
          },
          {
            title: "Serve locally",
            description:
              "The embedded dashboard is served from a loopback address. CLI flags, environment variables, and saved settings resolve in that order.",
          },
          {
            title: "Assess selectively",
            description:
              "When enabled, a bounded queue sends selected flow metadata to Cloudflare Workers AI. Credentials stay in the server-side process environment.",
          },
        ],
      },
      notes: [
        "Detection is heuristic. A fingerprint, SNI, port, or model score does not prove that a connection uses a particular protocol, and no validated detection rate is claimed.",
        "ECH, midstream capture, packet loss, fragmentation, or an incomplete handshake can hide metadata. QUIC and UDP payloads are not decrypted.",
        "Windows and macOS release archives are not currently provided; Linux is the primary supported platform. Windows source builds require the Npcap SDK.",
      ],
    },
  },

  "xray-vless-ws-cdn-installer": {
    displayName: "Xray VLESS + WebSocket",
    slug: "xray-vless-ws-cdn-installer",
    summary:
      "A one-command installer for Xray VLESS over WebSocket, with Nginx, TLS, a generated cover site, and optional CDN fronting.",
    category: "Networking",
    status: "Maintained",
    tech: ["Bash", "Xray-core", "Nginx", "systemd", "Cloudflare"],
    visual: "xray",
    demo: {
      label: "Read the setup guide",
      href: "https://xray-vless-ws-guide.braydos.chatgpt.site/",
      kind: "docs",
    },
    demos: [
      {
        label: "Read the source-linked setup guide",
        href: "https://xray-vless-ws-guide.braydos.chatgpt.site/",
        kind: "docs",
      },
      {
        label: "Watch the automated install",
        href: "https://github.com/braydos-h/xray-vless-ws-cdn-installer/blob/main/before.mp4",
        kind: "video",
      },
      {
        label: "Watch the deployed endpoint",
        href: "https://github.com/braydos-h/xray-vless-ws-cdn-installer/blob/main/after.mp4",
        kind: "video",
      },
    ],
    details: {
      tagline: "A transport stack in one command.",
      overview: [
        "This installer turns a fresh Ubuntu host into a working Xray VLESS-over-WebSocket endpoint. It provisions TLS, configures Nginx as the public TLS terminator, registers the Xray systemd service, and prints an import-ready VLESS URI.",
        "The architecture is CDN-friendly. A CDN can terminate public TLS and forward WebSocket traffic to Nginx, while Xray listens only on loopback. A generated business-style cover page gives the origin an ordinary HTTPS front.",
      ],
      why:
        "A manual Xray deployment is easy to get mostly right and difficult to make repeatable. This project packages DNS checks, certificate fallback, config validation, service setup, firewall changes, and a clear post-install summary into one script.",
      highlights: [
        {
          title: "Twelve explicit install steps",
          description:
            "A live progress bar covers package setup, certificate selection, cover-site generation, Xray installation, Nginx proxy configuration, and service startup.",
        },
        {
          title: "Certificate fallback chain",
          description:
            "Certbot is preferred, acme.sh is the fallback, and a self-signed certificate keeps the installer from ending without TLS.",
        },
        {
          title: "CDN-ready by design",
          description:
            "Nginx terminates origin TLS and proxies the configured WebSocket path to Xray on 127.0.0.1:10000, ready for Cloudflare or a similar front.",
        },
        {
          title: "Cover traffic",
          description:
            "An optional static business-style page is served on port 443 so a shallow HTTPS inspection sees a normal website.",
        },
        {
          title: "Scriptable",
          description:
            "Every prompt has a CLI flag and matching environment variable, with a non-interactive mode for repeatable provisioning.",
        },
        {
          title: "Operational output",
          description:
            "The final summary includes the domain, WebSocket path, UUID, configuration paths, and a URL-encoded VLESS URI.",
        },
      ],
      architecture: {
        intro:
          "Each layer owns one job: public TLS, local reverse proxying, and proxy execution.",
        steps: [
          {
            title: "Validate inputs",
            description:
              "The script checks the domain, WebSocket path, UUID format, resolver state, and DNS/IP agreement before making changes.",
          },
          {
            title: "Terminate TLS",
            description:
              "Nginx listens on port 443, serves the generated cover site, and owns the certificate. Xray never binds to a public interface.",
          },
          {
            title: "Proxy the WebSocket path",
            description:
              "Nginx forwards the configured path to Xray on loopback port 10000 with the correct Host header.",
          },
          {
            title: "Register and summarize",
            description:
              "Xray config is validated with jq, systemd starts both services, optional UFW rules are applied, and the import URI is printed.",
          },
        ],
      },
      notes: [
        "The installer targets Ubuntu 22.04+ with apt and systemd. Root access, a domain pointing at the host, and outbound package access are required.",
        "CDN fronting and a cover site make shallow inspection look like normal HTTPS traffic. The project does not claim universal DPI resistance or anonymity.",
        "The README records a full run at roughly 2m41s on a 1 vCPU / 1 GB RAM VPS. Real timing depends on the host and package mirrors.",
      ],
    },
  },

  "vless-xtls-vision-installer": {
    displayName: "VLESS + REALITY Vision",
    slug: "vless-xtls-vision-installer",
    summary:
      "A recoverable Xray installer and lifecycle manager for VLESS over REALITY with XTLS Vision, built around safe rollouts and restoration.",
    category: "Networking",
    status: "Active",
    tech: ["Bash", "Xray-core", "REALITY", "XTLS Vision", "nftables", "systemd"],
    visual: "vless",
    demo: {
      label: "Watch the 78-second demo",
      href: "https://youtu.be/hHB1BeUME8I",
      kind: "video",
    },
    demos: [
      {
        label: "Watch the full setup demo",
        href: "https://youtu.be/hHB1BeUME8I",
        kind: "video",
      },
      {
        label: "Testing and validation scope",
        href: "https://github.com/braydos-h/vless-xtls-vision-installer/blob/main/docs/TESTING.md",
        kind: "docs",
      },
    ],
    details: {
      tagline: "Infrastructure that knows the way back.",
      overview: [
        "This project deploys and manages a single Xray endpoint using VLESS over REALITY with xtls-rprx-vision. It targets fresh Debian and Ubuntu hosts, but treats installation as only the first lifecycle operation.",
        "The same bootstrap handles preflight, client management, updates, diagnostics, backups, restoration, repair, and controlled uninstall. Configuration is validated before activation, deployment generations are immutable, and the current deployment switches atomically.",
      ],
      why:
        "A one-shot proxy script can leave a running service with no safe path back. This implementation emphasizes least privilege, versioned state, operation locking, atomic rollouts, and diagnostics that redact secrets. Host-impacting firewall and SSH changes are separate, explicit actions.",
      highlights: [
        {
          title: "Recoverable deployment model",
          description:
            "Versioned JSON state, automatic backups, durable journals, operation locks, and rollback-aware transitions.",
        },
        {
          title: "Atomic activation",
          description:
            "Config and profile validation happen before activation. A current-generation symlink switches atomically to the new deployment.",
        },
        {
          title: "Reduced host blast radius",
          description:
            "Xray runs under a dedicated no-login account with only CAP_NET_BIND_SERVICE and a hardened systemd unit.",
        },
        {
          title: "Complete client lifecycle",
          description:
            "Add, remove, list, show, rotate, export, and reprint clients, including a migration window for global shortId rotation.",
        },
        {
          title: "Explicit host changes",
          description:
            "Firewall changes are additive-only. SSH hardening is a separate transaction that requires fresh-session confirmation.",
        },
        {
          title: "Built for verification",
          description:
            "The documented test suite covers 20 Python tests and 90 Bats tests, including interactive navigation, validation, rollback paths, and reproducibility.",
        },
      ],
      architecture: {
        intro:
          "The lifecycle is built around preflight checks and a reversible activation boundary.",
        steps: [
          {
            title: "Preflight the host",
            description:
              "The installer checks platform support, root access, dependencies, storage, address family, profile validity, and listener ownership.",
          },
          {
            title: "Build an immutable generation",
            description:
              "The profile is validated, the Xray configuration is generated and tested, and a new immutable deployment directory is written.",
          },
          {
            title: "Switch atomically",
            description:
              "The current symlink moves to the new generation and the service restarts. Interrupted or failed activation can roll back.",
          },
          {
            title: "Operate it",
            description:
              "Structured diagnostics, exports, backups, updates, and recovery remain available through the installed helper.",
          },
        ],
      },
      notes: [
        "The project explicitly does not claim guaranteed censorship bypass, anonymity, universal DPI resistance, or universal client compatibility.",
        "The README documents exact validation boundaries. The full five-OS VM matrix, ARM runtime integration, and hosted CI were not part of the most recent repair run.",
        "Firewall changes do not flush existing rules or reset UFW. Cloud-provider firewall policy remains the administrator's responsibility.",
      ],
    },
  },

  "aif-project": {
    displayName: "AIF Project",
    slug: "aif-project",
    summary:
      "Rust and SwiftUI cattle-management apps built around photo weight estimates, offline tape math, and owner-scoped records.",
    category: "Applied AI",
    status: "Active",
    tech: ["Rust", "SwiftUI", "SQLite", "Ollama", "JavaScript"],
    visual: "aif",
    details: {
      tagline: "An estimate with its limits attached.",
      overview: [
        "AIF Project contains two independent cattle-management applications. The web app pairs a Rust server and browser interface with photo-based weight estimates through Ollama, offline tape calculations, batch uploads, animal histories, and private records. The iOS app is a native SwiftUI companion for offline animal records and tape estimates, with optional user-configured AI.",
        "The web photo estimate is presented as an AI estimate, never a replacement for a scale, veterinary advice, or an official livestock record. Results carry ranges and explicit dosing warnings.",
      ],
      why:
        "The project explores the full path from a photo to a usable estimate: uncertain AI output, a deterministic offline cross-check, consent and account boundaries, background jobs, and deployment details. Its web server is a Rust-only implementation with auth, rate limits, SSRF protection, and a separate production profile.",
      highlights: [
        {
          title: "Photo and tape together",
          description:
            "Photo estimates carry a ±10% range; the offline Schaeffer tape formula carries ±5%. The UI warns when the two disagree by more than 20%.",
        },
        {
          title: "Batch workflow",
          description:
            "Select or drop up to 20 images, watch per-file progress, retry failures, and keep a session-only history with a trend chart and CSV export.",
        },
        {
          title: "Rust-only web stack",
          description:
            "The backend, API, persistence, tests, and compiled static assets all live in one Rust server with no Python runtime.",
        },
        {
          title: "Privacy-shaped defaults",
          description:
            "Auth is required in production, accounts are invite-only, histories are owner-scoped, and optional photo retention is off by default.",
        },
        {
          title: "Operational guardrails",
          description:
            "CSRF checks, login rate limits, an SSRF guard for remote images, bounded jobs, idempotency keys, and a reduced production /info response.",
        },
        {
          title: "Offline iPhone app",
          description:
            "The separate SwiftUI app keeps animal records and tape estimates usable without the web backend.",
        },
      ],
      architecture: {
        intro:
          "The web and iOS products share a domain, not a runtime.",
        steps: [
          {
            title: "Browser surface",
            description:
              "Plain HTML, CSS, and JavaScript provide the WebUI, router, batch uploads, account pages, and offline tape calculator.",
          },
          {
            title: "Rust application server",
            description:
              "The aif-backend binary validates images, serves static assets, authenticates sessions, owns SQLite storage, and runs background estimate jobs.",
          },
          {
            title: "Estimation path",
            description:
              "Photo requests go to Ollama Cloud when configured or to a deterministic local fallback. Tape estimates never leave the browser or server's local formula.",
          },
          {
            title: "Native companion",
            description:
              "The SwiftUI iPhone app stores records locally and can optionally use a provider chosen by the user, without requiring the web backend.",
          },
        ],
      },
      notes: [
        "Photo weight estimates are approximate and must not be used to dose medication. Verify with a scale and consult a veterinarian.",
        "Ollama Cloud requires an API key. The deterministic `none` backend makes local demos possible without a network request.",
        "The web app and iOS app are independent deployables with separate documentation and build paths.",
      ],
    },
  },

  "Mullvad-Proxy-Checker": {
    displayName: "Mullvad Proxy Checker",
    slug: "mullvad-proxy-checker",
    summary:
      "A small Tkinter desktop utility for batch-checking Mullvad SOCKS5 exit nodes with curl and exporting the results.",
    category: "Security",
    status: "Maintained",
    tech: ["Python", "Tkinter", "SOCKS5", "curl", "GitHub Actions"],
    visual: "mullvad",
    details: {
      tagline: "Filter the list before you trust it.",
      overview: [
        "Mullvad Proxy Checker is a Python desktop utility for validating Mullvad SOCKS5 proxies. Paste a list or load a file, run checks with parallel workers, and see whether each endpoint is reachable, which public IP it reports, and whether it identifies as a Mullvad server.",
        "Results are visible as the checks complete and can be exported to CSV for later use. The app intentionally stays small: Python's standard library, Tkinter, and the system curl binary.",
      ],
      why:
        "Long proxy lists decay quickly. Checking each endpoint by hand is tedious and error-prone, so this tool turns a routine operational check into a short desktop workflow without introducing a service or database.",
      highlights: [
        {
          title: "Batch verification",
          description:
            "Parse pasted addresses or load a list from a file, then run concurrent SOCKS5 reachability checks.",
        },
        {
          title: "Useful evidence",
          description:
            "Each result records reachability, the public IP reported through the proxy, and the Mullvad server identity when recognized.",
        },
        {
          title: "Exportable output",
          description:
            "Completed batches can be exported as CSV for filtering, reporting, or comparison.",
        },
        {
          title: "Packaged for Windows",
          description:
            "A GitHub Actions workflow builds a downloadable Windows executable artifact while keeping curl as the runtime check.",
        },
      ],
      architecture: {
        intro: "One GUI, one worker pool, and one familiar network primitive.",
        steps: [
          {
            title: "Collect endpoints",
            description:
              "The Tkinter interface accepts a pasted list of private proxy IPs or reads them from a text file.",
          },
          {
            title: "Check in parallel",
            description:
              "Worker threads invoke curl with the SOCKS5 proxy, capturing the reported public address and endpoint response.",
          },
          {
            title: "Report and export",
            description:
              "Results update in the interface as checks complete and can be saved as CSV when the run finishes.",
          },
        ],
      },
      notes: [
        "Requires Python 3.9+ and curl on PATH. The application does not discover proxies; bring a current list.",
        "The default SOCKS5 port is 1080 and can be edited in the source if a different setup is used.",
      ],
    },
  },

  "BreachPilot-SKILL": {
    displayName: "BreachPilot Skill",
    slug: "breachpilot-skill",
    summary:
      "A portable Agent Skill that carries BreachPilot's authorized security-investigation loop into Claude Code, Codex, and similar runtimes.",
    category: "Security",
    status: "Experimental",
    tech: ["Markdown", "Agent Skills", "Shell", "Claude Code", "Codex"],
    visual: "skill",
    details: {
      tagline: "The method travels with the agent.",
      overview: [
        "This package distills the investigation workflow behind BreachPilot into a portable Agent Skill. It guides scope setting, observation, hypothesis formation, focused checks, evidence assessment, verification, adaptation, and reporting in live or source-level authorized security work.",
        "It is designed for an agent's native capabilities. No BreachPilot backend, MCP server, database, or separate planner is required to use the skill.",
      ],
      why:
        "The durable part of an autonomous security workflow is its reasoning discipline. This package makes that discipline portable across coding agents, while being explicit about what a prompt and a set of references cannot enforce.",
      highlights: [
        {
          title: "Portable skill layout",
          description:
            "A canonical SKILL.md plus focused references for scope, evidence, failure recovery, reporting, and source context.",
        },
        {
          title: "Agent-native execution",
          description:
            "The runtime uses its own tools and reasoning. MCP and external infrastructure are optional, not required.",
        },
        {
          title: "Adapter snippets",
          description:
            "Installation guidance for Claude Code and Codex CLI, plus adapters for agents that load Markdown instructions directly.",
        },
        {
          title: "Explicit limits",
          description:
            "The documentation states that the skill cannot itself enforce a target allowlist, isolate a shell, or verify results.",
        },
      ],
      architecture: {
        intro:
          "The package is intentionally only files, instructions, and a small installer.",
        steps: [
          {
            title: "Behavioral core",
            description:
              "SKILL.md defines the observe → hypothesize → act → normalize → verify → adapt loop and when to stop.",
          },
          {
            title: "Progressive references",
            description:
              "Detailed operating, safety, evidence, reporting, and source-context notes load only when relevant.",
          },
          {
            title: "Runtime adapters",
            description:
              "Copy the skill into the agent's skills directory, or add a short snippet to its root instructions file.",
          },
        ],
      },
      notes: [
        "The package is methodology, not a security control. Enforcement, isolation, and automatic verification depend on the host agent runtime and the operator's setup.",
      ],
    },
  },

  "breachpilot-site": {
    displayName: "BreachPilot Site",
    slug: "breachpilot-site",
    summary:
      "The official static site for BreachPilot's features, documentation, benchmarks, and installation paths.",
    category: "Web",
    status: "Maintained",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    visual: "website",
    demo: {
      label: "Visit the live site",
      href: "https://breachpilot-site.vercel.app/",
      kind: "site",
    },
    details: {
      tagline: "A public front door for an operator.",
      overview: [
        "The BreachPilot site brings the project's features, architecture, installation flow, safety model, documentation, and benchmarks into one public surface. It is a static Next.js 14 export with no server and no analytics.",
        "Documentation is synced from the main BreachPilot repository during the build. The synced copies are committed so a build still works without the sibling checkout, and CI can require the sync to be fresh.",
      ],
      why:
        "An autonomous security platform needs an unusually clear public explanation of what it does, how containment works, and how to install it. The site turns a deep repository into a navigable front door without becoming a separate source of truth.",
      highlights: [
        {
          title: "Static by design",
          description:
            "The production output is a fully static export that can be served from any static host.",
        },
        {
          title: "Docs are synced, not copied by hand",
          description:
            "A prebuild script copies Markdown from the main repository and generates the search index. CI can fail when the sync is stale.",
        },
        {
          title: "Operational checks",
          description:
            "Lint, typecheck, link checking, and an accessibility smoke test run against the built site.",
        },
        {
          title: "Installer-first pages",
          description:
            "Dedicated install and documentation routes preserve script bytes for install.sh and install.ps1 with explicit deploy rules.",
        },
      ],
      architecture: {
        intro:
          "The site is a thin, versioned presentation layer over the main repository.",
        steps: [
          {
            title: "Sync documentation",
            description:
              "scripts/sync-docs.mjs pulls Markdown from the sibling BreachPilot checkout into committed content files.",
          },
          {
            title: "Build the static app",
            description:
              "Next.js renders the marketing pages and documentation routes into an out/ directory.",
          },
          {
            title: "Serve raw scripts",
            description:
              "Hosting rules keep install.sh and install.ps1 as byte-for-byte script responses, not SPA fallbacks.",
          },
        ],
      },
    },
  },

  "braydos.com": {
    displayName: "braydos.com",
    slug: "braydos-com",
    summary:
      "The source for this personal site — a GitHub-driven portfolio built with Next.js and designed to stay current.",
    category: "Web",
    status: "Active",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "GitHub API"],
    visual: "website",
    details: {
      tagline: "A home for the work.",
      overview: [
        "This is the code behind braydos.com. The site is a server-rendered Next.js App Router application that reads public repository metadata from the GitHub REST API and combines it with local editorial notes for the projects that deserve more than a description.",
        "It is intentionally not a résumé or a database-backed app. The information architecture is small: a landing page, a searchable index of public repositories, editorial project pages, and a short about page.",
      ],
      why:
        "Repository lists show code, but they do not explain the design decisions behind it. This site provides a place to connect the projects, state their constraints honestly, and keep the whole index current as new public work appears.",
      highlights: [
        {
          title: "Live repository index",
          description:
            "Public repositories are loaded server-side with hourly revalidation. New projects appear without editing the site.",
        },
        {
          title: "Editorial overrides",
          description:
            "A local configuration file supplies featured order, categories, curated descriptions, verified links, and project detail pages.",
        },
        {
          title: "Graceful degradation",
          description:
            "If the GitHub API is unavailable, the build and pages fall back to a checked-in snapshot instead of failing.",
        },
        {
          title: "Designed for the edges",
          description:
            "Dark-first theming with a polished light mode, a keyboard command palette, reduced-motion support, and custom 404 and error states.",
        },
      ],
      architecture: {
        intro:
          "The public site is static-first, with a small server-side data layer.",
        steps: [
          {
            title: "Fetch public data",
            description:
              "Server-side GitHub requests use optional token authentication, strict API headers, and cached hourly revalidation.",
          },
          {
            title: "Merge with local context",
            description:
              "Repository metadata is resolved against data/projects.ts; unknown repositories still get a card and a metadata-derived detail page.",
          },
          {
            title: "Render for discovery",
            description:
              "Pages are generated with ISR, metadata, structured data, sitemap, robots, and a single branded social image.",
          },
        ],
      },
      notes: [
        "Only public repositories are requested; private repositories are never exposed.",
        "If GITHUB_TOKEN is absent, the site still works with the unauthenticated API limit and the local snapshot fallback.",
      ],
    },
  },

  "braydos-h": {
    displayName: "GitHub Profile",
    slug: "github-profile",
    summary:
      "The minimal README behind my GitHub profile page. The substantive work lives in the repositories.",
    category: "Meta",
    status: "Meta",
    tech: ["Markdown"],
    visual: "profile",
    details: {
      tagline: "A pointer, not a project.",
      overview: [
        "This repository powers the public profile README at github.com/braydos-h. It currently contains a small centered streak card and very little else.",
        "It is included in this index because it is a public repository, not because it is a software project. The feature work belongs in the project entries around it.",
      ],
    },
  },
};
