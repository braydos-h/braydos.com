import { ArrowUpRight, Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { Spotlight } from "@/components/spotlight";
import { StatusPill, Tag } from "@/components/tag";
import { formatDate, formatNumber } from "@/lib/format";
import { getProjectPath } from "@/lib/projects";
import { cn } from "@/lib/cn";
import type { ResolvedProject } from "@/lib/types";

type ProjectCardProps = {
  project: ResolvedProject;
  index: number;
  large?: boolean;
};

export function ProjectCard({ project, index, large = false }: ProjectCardProps) {
  const href = getProjectPath(project.slug);

  return (
    <Spotlight className={cn("project-card", large && "project-card-large")}>
      {large ? (
        <div className="project-card-visual">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="project-cover-image"
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
      ) : null}

      <div className="project-card-content">
        <div className="project-card-eyebrow">
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
          {project.featured ? <span className="project-featured-label">Featured</span> : null}
          <StatusPill status={project.status} archived={project.repo.archived} />
        </div>

        <h3 className="project-title">
          <Link href={href} className="project-title-link">
            {project.displayName}
            <ArrowUpRight
              size={large ? 25 : 20}
              strokeWidth={1.4}
              className="project-title-arrow"
              aria-hidden="true"
            />
          </Link>
        </h3>

        <p className="project-summary">{project.summary}</p>

        <ul className="tag-list" aria-label={`${project.displayName} technologies`}>
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="project-card-footer">
          <div className="project-meta">
            <span className="project-meta-item">
              <Star size={12} strokeWidth={1.7} aria-hidden="true" />
              {formatNumber(project.repo.stargazers_count)}
              <span className="sr-only"> GitHub stars</span>
            </span>
            <span className="project-meta-separator" aria-hidden="true" />
            <span className="project-meta-item">
              Updated {formatDate(project.repo.pushed_at)}
            </span>
          </div>

          <div className="project-card-actions">
            {project.demo ? (
              <a
                href={project.demo.href}
                target="_blank"
                rel="noreferrer noopener"
                className="project-action project-action-live"
                aria-label={`Open the verified live site for ${project.displayName}`}
              >
                Live
                <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={project.repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="project-action"
              aria-label={`Open the ${project.displayName} GitHub repository`}
            >
              <Github size={14} strokeWidth={1.7} aria-hidden="true" />
              <span className="sr-only">GitHub repository</span>
            </a>
          </div>
        </div>
      </div>

      {!large ? (
        <div className="project-card-visual project-card-visual-compact">
          {project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="project-cover-image"
            />
          ) : (
            <ProjectVisual
              variant={project.visual}
              name={project.displayName}
              tech={project.tech}
            />
          )}
        </div>
      ) : null}
    </Spotlight>
  );
}
