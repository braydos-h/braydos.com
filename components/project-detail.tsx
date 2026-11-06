import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CircleDot,
  ExternalLink,
  FileText,
  GitFork,
  Github,
  Globe2,
  Info,
  PlayCircle,
  Star,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { CopyCommand } from "@/components/copy-command";
import { Reveal } from "@/components/motion-reveal";
import { ProjectVisual } from "@/components/project-visual";
import { StatusPill, Tag } from "@/components/tag";
import { formatDate, formatNumber, getLanguageColor } from "@/lib/format";
import type { ProjectLink, ResolvedProject } from "@/lib/types";

type ProjectNeighbour = {
  displayName: string;
  slug: string;
};

type ProjectDetailProps = {
  project: ResolvedProject;
  readmeExcerpt: string | null;
  source: "live" | "fallback";
  syncedAt: string;
  previous?: ProjectNeighbour;
  next?: ProjectNeighbour;
};

const demoIcons = {
  site: Globe2,
  video: PlayCircle,
  docs: FileText,
  repo: Github,
} satisfies Record<ProjectLink["kind"], typeof Globe2>;

function Section({
  number,
  title,
  children,
  id,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="detail-section">
      <h2 className="detail-section-label">
        <span>{number}</span>
        {title}
      </h2>
      <div className="detail-section-body">{children}</div>
    </section>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="detail-meta-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function ProjectDetail({
  project,
  readmeExcerpt,
  source,
  syncedAt,
  previous,
  next,
}: ProjectDetailProps) {
  const details = project.details;
  const tagline = details?.tagline;
  const demo = project.demo;
  const repositoryHref = project.repo.html_url;
  const readmeHref = `${repositoryHref}#readme`;

  return (
    <article className="project-detail">
      <header className="detail-hero">
        <div className="site-container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.displayName}</span>
          </nav>

          <div className="detail-hero-grid">
            <div className="detail-hero-copy">
              <div className="detail-eyebrow">
                <span>{project.category}</span>
                <StatusPill status={project.status} archived={project.repo.archived} />
                {project.featured ? (
                  <span className="detail-featured">
                    Selected work
                  </span>
                ) : null}
              </div>

              <h1>{project.displayName}</h1>
              {tagline ? <p className="detail-tagline">{tagline}</p> : null}
              <p className="detail-summary">{project.summary}</p>

              <div className="detail-actions">
                {demo ? (
                  <ButtonLink href={demo.href} external className="button-primary">
                    {demo.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </ButtonLink>
                ) : (
                  <ButtonLink href={repositoryHref} external className="button-primary">
                    <Github size={15} aria-hidden="true" />
                    View source
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </ButtonLink>
                )}

                <ButtonLink
                  href={repositoryHref}
                  external
                  variant="secondary"
                  className="button-secondary"
                >
                  <Github size={15} aria-hidden="true" />
                  GitHub
                  <ArrowUpRight size={13} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>

            <div className="detail-hero-meta">
              <div>
                <span>Updated</span>
                <strong>{formatDate(project.repo.pushed_at)}</strong>
              </div>
              <div>
                <span>Primary language</span>
                <strong>
                  {project.repo.language ? (
                    <>
                      <span
                        className="language-dot"
                        style={{ backgroundColor: getLanguageColor(project.repo.language) }}
                        aria-hidden="true"
                      />
                      {project.repo.language}
                    </>
                  ) : (
                    "Mixed / docs"
                  )}
                </strong>
              </div>
              <div>
                <span>License</span>
                <strong>{project.repo.license?.spdx_id ?? "Not specified"}</strong>
              </div>
              <div>
                <span>Public since</span>
                <strong>{formatDate(project.repo.created_at)}</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="detail-visual-wrap">
        <div className="site-container">
          <div className="detail-visual">
            {project.cover ? (
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={1600}
                height={900}
                className="detail-cover-image"
                priority
              />
            ) : (
              <ProjectVisual
                variant={project.visual}
                large
                name={project.displayName}
                tech={project.tech}
              />
            )}
          </div>
        </div>
      </div>

      <div className="site-container">
        <div className="detail-layout">
          <div className="detail-main">
            {details ? (
              <>
                <Section number="01" title="Overview" id="overview">
                  <div className="prose-editorial">
                    {details.overview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Section>

                {details.why ? (
                  <Section number="02" title="Why it exists">
                    <blockquote className="detail-quote">{details.why}</blockquote>
                  </Section>
                ) : null}

                {details.highlights?.length ? (
                  <Section number="03" title="What it does">
                    <div className="highlight-grid">
                      {details.highlights.map((highlight, index) => (
                        <div className="highlight-item" key={highlight.title}>
                          <span className="highlight-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3>{highlight.title}</h3>
                          <p>{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                ) : null}

                {details.architecture ? (
                  <Section number="04" title="How it fits together">
                    {details.architecture.intro ? (
                      <p className="detail-architecture-intro">
                        {details.architecture.intro}
                      </p>
                    ) : null}
                    <ol className="architecture-list">
                      {details.architecture.steps.map((step, index) => (
                        <li key={step.title}>
                          <span className="architecture-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Section>
                ) : null}

                {details.screenshots?.length ? (
                  <Section number="05" title="In view">
                    <div className="detail-screenshots">
                      {details.screenshots.map((screenshot) => (
                        <figure key={screenshot.src}>
                          <div className="detail-screenshot-image">
                            <Image
                              src={screenshot.src}
                              alt={screenshot.alt}
                              width={screenshot.width ?? 1600}
                              height={screenshot.height ?? 900}
                              sizes="(min-width: 1024px) 70vw, 100vw"
                            />
                          </div>
                          {screenshot.caption ? (
                            <figcaption>{screenshot.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  </Section>
                ) : null}

                {project.demos.length ? (
                  <Section number="05" title="Explore">
                    <div className="detail-demos">
                      {project.demos.map((item) => {
                        const Icon = demoIcons[item.kind];
                        return (
                          <a
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="detail-demo-link"
                          >
                            <span className="detail-demo-icon">
                              <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                            </span>
                            <span>
                              <strong>{item.label}</strong>
                              <span>
                                {item.kind === "video"
                                  ? "External demonstration"
                                  : item.kind === "docs"
                                    ? "Public documentation"
                                    : "Verified public link"}
                              </span>
                            </span>
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </Section>
                ) : null}

                {details.notes?.length ? (
                  <Section number="06" title="Context & limits">
                    <div className="detail-notes">
                      <div className="detail-notes-heading">
                        <TriangleAlert size={15} aria-hidden="true" />
                        Worth knowing before you run it
                      </div>
                      <ul>
                        {details.notes.map((note) => (
                          <li key={note}>
                            <CircleDot size={12} aria-hidden="true" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>
                ) : null}
              </>
            ) : (
              <>
                <Section number="01" title="Overview">
                  <div className="prose-editorial">
                    <p>{project.summary}</p>
                    {readmeExcerpt ? (
                      <>
                        <div className="readme-note">
                          <FileText size={14} aria-hidden="true" />
                          Extracted from the public README
                        </div>
                        {readmeExcerpt.split("\n\n").map((paragraph) => (
                          <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                        ))}
                      </>
                    ) : (
                      <p>
                        This repository does not have enough public documentation
                        for a rewritten overview yet. The source and its README
                        remain the authoritative reference.
                      </p>
                    )}
                  </div>
                </Section>
              </>
            )}

            <Section number={details ? "07" : "02"} title="Read the source">
              <div className="source-callout">
                <div>
                  <span className="source-callout-kicker">Public repository</span>
                  <p>
                    Every technical claim here is traceable to the repository.
                    Read the code, open an issue, or check the project history
                    directly.
                  </p>
                </div>
                <ButtonLink
                  href={readmeHref}
                  external
                  variant="secondary"
                  className="button-secondary"
                >
                  <Github size={15} aria-hidden="true" />
                  Repository README
                  <ArrowUpRight size={13} aria-hidden="true" />
                </ButtonLink>
              </div>
            </Section>
          </div>

          <aside className="detail-sidebar" aria-label="Project metadata">
            <div className="detail-sidebar-panel">
              <div className="detail-sidebar-heading">
                <span>Repository</span>
                <a
                  href={repositoryHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${project.displayName} on GitHub`}
                >
                  <Github size={14} aria-hidden="true" />
                </a>
              </div>

              <dl className="detail-meta">
                <MetaRow label="Status">
                  <StatusPill
                    status={project.status}
                    archived={project.repo.archived}
                  />
                </MetaRow>
                <MetaRow label="Language">{project.repo.language ?? "Mixed"}</MetaRow>
                <MetaRow label="License">
                  {project.repo.license?.spdx_id ?? "Not specified"}
                </MetaRow>
                <MetaRow label="Stars">
                  <Star size={12} aria-hidden="true" />
                  {formatNumber(project.repo.stargazers_count)}
                </MetaRow>
                <MetaRow label="Forks">
                  <GitFork size={12} aria-hidden="true" />
                  {formatNumber(project.repo.forks_count)}
                </MetaRow>
                <MetaRow label="Open issues">
                  {formatNumber(project.repo.open_issues_count)}
                </MetaRow>
                <MetaRow label="Created">
                  {formatDate(project.repo.created_at)}
                </MetaRow>
                <MetaRow label="Last push">
                  {formatDate(project.repo.pushed_at)}
                </MetaRow>
                <MetaRow label="Branch">{project.repo.default_branch}</MetaRow>
              </dl>

              <div className="detail-sidebar-tags">
                <span className="detail-sidebar-label">Tech stack</span>
                <ul className="tag-list">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </div>

              {project.repo.topics.length ? (
                <div className="detail-sidebar-tags">
                  <span className="detail-sidebar-label">Topics</span>
                  <div className="detail-topics">
                    {project.repo.topics.map((topic) => (
                      <span key={topic}>#{topic}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="detail-sidebar-clone">
                <span className="detail-sidebar-label">Clone</span>
                <CopyCommand command={`git clone ${project.cloneUrl}`} />
              </div>

              <div className="detail-sidebar-links">
                <a
                  href={repositoryHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="detail-sidebar-link"
                >
                  <Github size={14} aria-hidden="true" />
                  View source
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                {demo ? (
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="detail-sidebar-link"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    {demo.label}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              <p className="detail-sync-note">
                <Info size={12} aria-hidden="true" />
                {source === "live" ? "Live GitHub metadata" : "Cached GitHub metadata"}
                <time dateTime={syncedAt}> · {formatDate(syncedAt)}</time>
              </p>
            </div>
          </aside>
        </div>
      </div>

      <nav className="detail-pager" aria-label="Project navigation">
        <div className="site-container">
          <div className="detail-pager-inner">
            <Link href="/projects" className="detail-pager-back">
              <ArrowLeft size={14} aria-hidden="true" />
              All projects
            </Link>

            <div className="detail-pager-siblings">
              {previous ? (
                <Link href={`/projects/${previous.slug}`} className="detail-pager-link">
                  <span>Previous</span>
                  <strong>{previous.displayName}</strong>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="detail-pager-link detail-pager-link-next"
                >
                  <span>Next</span>
                  <strong>
                    {next.displayName}
                    <ArrowRight size={14} aria-hidden="true" />
                  </strong>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </article>
  );
}
