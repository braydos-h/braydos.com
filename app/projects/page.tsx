import { ArrowDown, ArrowUpRight, Layers3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { Reveal } from "@/components/motion-reveal";
import { SITE_URL } from "@/lib/constants";
import { formatDate, pluralize } from "@/lib/format";
import {
  getProjects,
  toProjectIndexItem,
} from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Every public repository from Brayden Habets, searchable and filterable — including security tooling, network infrastructure, systems software, and web experiments.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const { projects, source, syncedAt } = await getProjects();
  const indexProjects = projects.map(toProjectIndexItem);
  const languages = new Set(
    projects.map((project) => project.repo.language).filter(Boolean),
  );
  const visibleCount = projects.filter((project) => !project.repo.fork).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — braydos.com",
    url: `${SITE_URL}/projects`,
    description:
      "A complete index of public repositories by Brayden Habets.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visibleCount,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.displayName,
        url: `${SITE_URL}/projects/${project.slug}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <header className="index-hero">
        <div className="index-hero-grid-bg" aria-hidden="true" />
        <div className="site-container">
          <div className="index-hero-inner">
            <div className="index-hero-copy">
              <p className="page-kicker">
                <span className="page-kicker-index">Index</span>
                <span className="page-kicker-line" aria-hidden="true" />
                Public repositories
              </p>
              <h1>
                Everything,
                <br />
                <span>in public.</span>
              </h1>
              <p className="index-hero-description">
                A live index of my public GitHub work, from security operators
                and network tooling to installers, interfaces, and technical
                experiments. New public repositories appear automatically.
              </p>
              <a href="#repository-index" className="page-scroll-link">
                Browse the index
                <ArrowDown size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="index-hero-figure">
              <div className="index-hero-figure-top">
                <Layers3 size={15} strokeWidth={1.5} aria-hidden="true" />
                Repository index
              </div>
              <div className="index-hero-count">
                <span>{visibleCount.toString().padStart(2, "0")}</span>
                <p>{pluralize(visibleCount, "public repository", "public repositories")}</p>
              </div>
              <div className="index-hero-figure-row">
                <span>Languages</span>
                <strong>{languages.size}</strong>
              </div>
              <div className="index-hero-figure-row">
                <span>Synced</span>
                <strong>{formatDate(syncedAt)}</strong>
              </div>
              <div className="index-hero-figure-row">
                <span>Source</span>
                <a
                  href="https://github.com/braydos-h"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                  <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              </div>
              <p className="index-hero-figure-note">
                Private repositories are never requested. Forks are excluded
                from this count and hidden by default.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div id="repository-index">
        <ProjectsExplorer
          projects={indexProjects}
          source={source}
          syncedAt={syncedAt}
        />
      </div>

      <Reveal>
        <div className="index-meta-footer">
          <div className="site-container index-meta-footer-inner">
            <p>
              Missing something? The index is generated from{" "}
              <a
                href="https://github.com/braydos-h"
                target="_blank"
                rel="noreferrer noopener"
              >
                github.com/braydos-h
              </a>
              .
            </p>
            <Link href="/about" className="text-link">
              More about the work
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
