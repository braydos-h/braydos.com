"use client";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  FilterX,
  Github,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

import { Spotlight } from "@/components/spotlight";
import { StatusPill, Tag } from "@/components/tag";
import { cn } from "@/lib/cn";
import { formatDate, formatNumber, getLanguageColor } from "@/lib/format";
import type { ProjectCategory, ProjectIndexItem } from "@/lib/types";

type SortOption = "featured" | "updated" | "stars" | "name";
type CategoryFilter = "All" | ProjectCategory;

type ProjectsExplorerProps = {
  projects: ProjectIndexItem[];
  source: "live" | "fallback";
  syncedAt: string;
};

const CATEGORY_ORDER: ProjectCategory[] = [
  "Security",
  "Networking",
  "Systems",
  "Applied AI",
  "Web",
  "Meta",
];

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured first",
  updated: "Recently updated",
  stars: "Most stars",
  name: "A–Z",
};

function ProjectIndexCard({ project }: { project: ProjectIndexItem }) {
  return (
    <Spotlight className="index-card">
      <div className="index-card-top">
        <span className="index-card-category">
          <span className={cn("index-card-category-dot", `category-${project.category.toLowerCase().replace(/\s+/g, "-")}`)} />
          {project.category}
        </span>
        <span className="index-card-top-right">
          {project.featured ? (
            <span className="index-card-featured">
              <Sparkles size={11} aria-hidden="true" />
              Featured
            </span>
          ) : null}
          <StatusPill status={project.status} archived={project.archived} />
        </span>
      </div>

      <h2 className="index-card-title">
        <Link href={`/projects/${project.slug}`} className="project-title-link">
          {project.displayName}
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </h2>

      <p className="index-card-summary">{project.summary}</p>

      {project.cover ? (
        <div className="index-card-cover">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="project-cover-image"
          />
        </div>
      ) : null}

      <ul className="tag-list index-card-tags" aria-label={`${project.displayName} technologies`}>
        {project.tech.slice(0, 5).map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
        {project.tech.length > 5 ? (
          <li>
            <Tag>+{project.tech.length - 5}</Tag>
          </li>
        ) : null}
      </ul>

      <div className="index-card-footer">
        <div className="index-card-meta">
          <span className="index-card-meta-item">
            <Star size={12} aria-hidden="true" />
            {formatNumber(project.stars)}
            <span className="sr-only"> GitHub stars</span>
          </span>
          {project.language ? (
            <span className="index-card-meta-item">
              <span
                className="language-dot"
                style={{ backgroundColor: getLanguageColor(project.language) }}
                aria-hidden="true"
              />
              {project.language}
            </span>
          ) : null}
          <span className="index-card-meta-item">
            Updated {formatDate(project.pushedAt)}
          </span>
        </div>

        <div className="index-card-actions">
          {project.demo ? (
            <a
              href={project.demo.href}
              target="_blank"
              rel="noreferrer noopener"
              className="project-action project-action-live"
              aria-label={`Open live site for ${project.displayName}`}
            >
              Live
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ) : null}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="project-action"
            aria-label={`Open the ${project.displayName} GitHub repository`}
          >
            <Github size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </Spotlight>
  );
}

export function ProjectsExplorer({
  projects,
  source,
  syncedAt,
}: ProjectsExplorerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [includeForks, setIncludeForks] = useState(false);

  const languages = useMemo(() => {
    return Array.from(
      new Set(projects.map((project) => project.language).filter(Boolean) as string[]),
    ).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const categories = useMemo(() => {
    const present = new Set(projects.map((project) => project.category));
    return CATEGORY_ORDER.filter((item) => present.has(item));
  }, [projects]);

  const forkCount = useMemo(
    () => projects.filter((project) => project.fork).length,
    [projects],
  );

  const visibleProjects = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      if (!includeForks && project.fork) return false;
      if (category !== "All" && project.category !== category) return false;
      if (language !== "All" && project.language !== language) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        project.displayName,
        project.summary,
        project.description ?? "",
        project.category,
        project.language ?? "",
        project.tech.join(" "),
        project.topics.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "updated") {
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
      }
      if (sort === "stars") {
        return b.stars - a.stars || a.displayName.localeCompare(b.displayName);
      }
      if (sort === "name") {
        return a.displayName.localeCompare(b.displayName, "en");
      }
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    });
  }, [
    category,
    deferredQuery,
    includeForks,
    language,
    projects,
    sort,
  ]);

  const hasFilters =
    query.trim().length > 0 ||
    category !== "All" ||
    language !== "All" ||
    sort !== "featured" ||
    includeForks;

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setLanguage("All");
    setSort("featured");
    setIncludeForks(false);
  }

  return (
    <section className="section projects-index" aria-labelledby="projects-index-title">
      <div className="site-container">
        <div className="index-toolbar">
          <div className="index-search-wrap">
            <Search size={17} strokeWidth={1.7} aria-hidden="true" />
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="index-search"
              placeholder="Search projects, tools, or technologies…"
              autoComplete="off"
              spellCheck={false}
            />
            {query ? (
              <button
                type="button"
                className="index-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="index-search-hint" aria-hidden="true">
                /
              </span>
            )}
          </div>

          <div className="index-controls">
            <label className="index-select-wrap">
              <span className="sr-only">Filter by language</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="index-select"
              >
                <option value="All">All languages</option>
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>

            <label className="index-select-wrap">
              <span className="sr-only">Sort projects</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="index-select"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((value) => (
                  <option key={value} value={value}>
                    {SORT_LABELS[value]}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </label>
          </div>
        </div>

        <div className="index-filter-row">
          <div className="index-category-chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={cn("filter-chip", category === "All" && "filter-chip-active")}
              aria-pressed={category === "All"}
              onClick={() => setCategory("All")}
            >
              All
              <span>{projects.filter((project) => includeForks || !project.fork).length}</span>
            </button>
            {categories.map((item) => {
              const count = projects.filter(
                (project) =>
                  project.category === item && (includeForks || !project.fork),
              ).length;

              return (
                <button
                  key={item}
                  type="button"
                  className={cn("filter-chip", category === item && "filter-chip-active")}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="index-filter-aside">
            {forkCount > 0 ? (
              <label className="fork-toggle">
                <input
                  type="checkbox"
                  checked={includeForks}
                  onChange={(event) => setIncludeForks(event.target.checked)}
                />
                <span className="fork-toggle-box" aria-hidden="true">
                  {includeForks ? <Check size={11} /> : null}
                </span>
                Show forks ({forkCount})
              </label>
            ) : null}

            {hasFilters ? (
              <button type="button" className="reset-button" onClick={resetFilters}>
                <FilterX size={13} aria-hidden="true" />
                Reset filters
              </button>
            ) : null}
          </div>
        </div>

        <div className="index-results-bar">
          <p aria-live="polite">
            Showing <strong>{visibleProjects.length}</strong> of{" "}
            <strong>{projects.filter((project) => includeForks || !project.fork).length}</strong>{" "}
            repositories
          </p>
          <p className="index-sync">
            <span className={cn("index-sync-dot", source === "live" && "index-sync-dot-live")} />
            {source === "live" ? "GitHub sync" : "Cached snapshot"}
            <span aria-hidden="true">/</span>
            <time dateTime={syncedAt}>{formatDate(syncedAt)}</time>
          </p>
        </div>

        {visibleProjects.length ? (
          <div className="index-grid">
            {visibleProjects.map((project) => (
              <ProjectIndexCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="index-empty">
            <span className="index-empty-icon">
              <Search size={21} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h2>No matching repositories.</h2>
            <p>
              Nothing matches those filters. Try a broader search or clear the
              filters to see the full public index.
            </p>
            <button type="button" className="button button-secondary" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
