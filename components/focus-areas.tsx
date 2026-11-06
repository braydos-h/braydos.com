import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import type { ResolvedProject } from "@/lib/types";

const FOCUS_AREAS = [
  {
    title: "Security tooling that can prove itself",
    description:
      "Scope gates, contained execution, and evidence-linked findings. I'm interested in automation that records why a result should be trusted, not just that a tool returned.",
    projectSlugs: ["breachpilot", "breachpilot-skill", "mullvad-proxy-checker"],
  },
  {
    title: "Networks from the packet up",
    description:
      "Traffic analysis, TLS metadata, proxy transports, and deployment paths. I like tools that make opaque infrastructure legible without changing what is on the wire.",
    projectSlugs: ["axion", "xray-vless-ws-cdn-installer", "vless-xtls-vision-installer"],
  },
  {
    title: "Systems with clear failure modes",
    description:
      "Rust services, Go control planes, and installers built around bounded resources, explicit state, and recovery paths. Good systems tell you where they can fail.",
    projectSlugs: ["breachpilot", "axion", "vless-xtls-vision-installer"],
  },
  {
    title: "Automation that leaves a trail",
    description:
      "Repeatable setup, machine-readable diagnostics, and tooling that collapses a fragile runbook into one auditable operation without hiding the sharp edges.",
    projectSlugs: ["xray-vless-ws-cdn-installer", "vless-xtls-vision-installer", "breachpilot"],
  },
  {
    title: "Experiments at the edge of the stack",
    description:
      "Local-first interfaces, agent skills, and applied computer vision. Small end-to-end projects are how I test an idea outside the comfortable part of the stack.",
    projectSlugs: ["aif-project", "breachpilot-skill", "axion"],
  },
] as const;

export function FocusAreas({ projects }: { projects: ResolvedProject[] }) {
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

  return (
    <section id="focus" className="section focus-section">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="What I work on"
            title="Where I go deep."
            description="The recurring questions behind the projects: what is actually happening, what evidence do I have, and how does the system behave when it fails?"
          />
        </Reveal>

        <div className="focus-list">
          {FOCUS_AREAS.map((area, index) => {
            const related = area.projectSlugs
              .map((slug) => projectsBySlug.get(slug))
              .filter((project): project is ResolvedProject => Boolean(project));

            return (
              <Reveal key={area.title} delay={Math.min(index * 0.04, 0.16)}>
                <div className="focus-row">
                  <span className="focus-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="focus-copy">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                  <div className="focus-related">
                    <span className="focus-related-label">Related</span>
                    <div className="focus-related-links">
                      {related.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="focus-related-link"
                        >
                          {project.displayName}
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
