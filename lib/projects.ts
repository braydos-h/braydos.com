import { FEATURED_ORDER, PROJECT_OVERRIDES } from "@/data/projects";
import { getPublicRepos } from "@/lib/github";
import { slugify } from "@/lib/format";
import type {
  GitHubRepo,
  GitHubResult,
  PaletteProject,
  ProjectCategory,
  ProjectIndexItem,
  ProjectStatus,
  ProjectVisual,
  ResolvedProject,
} from "@/lib/types";

function inferCategory(repo: GitHubRepo): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")}`.toLowerCase();

  if (/(security|pentest|red-team|proxy|vpn|cyber|exploit|mullvad)/.test(haystack)) {
    return "Security";
  }
  if (/(network|xray|vless|reality|tls|packet|pcap|dpi|cdn|nginx)/.test(haystack)) {
    return "Networking";
  }
  if (/(\bai\b|ollama|model|machine learning|inference|estimate)/.test(haystack)) {
    return "Applied AI";
  }
  if (["TypeScript", "JavaScript", "HTML", "CSS"].includes(repo.language ?? "")) {
    return "Web";
  }
  if (repo.language) return "Systems";
  return "Web";
}

function inferTech(repo: GitHubRepo): string[] {
  if (repo.language) return [repo.language];
  if (repo.topics.length) return repo.topics.slice(0, 3);
  return ["Source"];
}

function inferSummary(repo: GitHubRepo): string {
  return (
    repo.description?.trim() ||
    "A public repository from my GitHub. A curated overview has not been written for this project yet."
  );
}

function inferStatus(repo: GitHubRepo): ProjectStatus | null {
  if (repo.archived) return null;
  return null;
}

export function resolveProjects(repos: GitHubRepo[]): ResolvedProject[] {
  return repos
    .filter((repo) => !repo.private)
    .filter((repo) => !PROJECT_OVERRIDES[repo.name]?.hidden)
    .map((repo) => {
      const config = PROJECT_OVERRIDES[repo.name] ?? {};
      const featuredIndex = FEATURED_ORDER.indexOf(
        repo.name as (typeof FEATURED_ORDER)[number],
      );
      const featured = featuredIndex !== -1;

      return {
        repo,
        slug: config.slug ?? slugify(repo.name),
        displayName: config.displayName ?? repo.name,
        summary: config.summary ?? inferSummary(repo),
        category: config.category ?? inferCategory(repo),
        status: config.status ?? inferStatus(repo),
        tech: config.tech ?? inferTech(repo),
        visual: config.visual ?? ("generic" satisfies ProjectVisual),
        demo: config.demo ?? null,
        demos: config.demos ?? (config.demo ? [config.demo] : []),
        cover: config.cover,
        details: config.details ?? null,
        featured,
        featuredOrder: featured ? featuredIndex + 1 : null,
        cloneUrl: `${repo.html_url}.git`,
      } satisfies ResolvedProject;
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName, "en"));
}

export async function getProjects(): Promise<
  GitHubResult<ResolvedProject[]> & { projects: ResolvedProject[] }
> {
  const result = await getPublicRepos();
  const projects = resolveProjects(result.data);

  return {
    ...result,
    data: projects,
    projects,
  };
}

export function getFeaturedProjects(projects: ResolvedProject[]): ResolvedProject[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(
  projects: ResolvedProject[],
  slug: string,
): ResolvedProject | undefined {
  return projects.find((project) => project.slug.toLowerCase() === slug.toLowerCase());
}

export function getPaletteProjects(projects: ResolvedProject[]): PaletteProject[] {
  return [...projects]
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.displayName.localeCompare(b.displayName, "en");
    })
    .map((project) => ({
      title: project.displayName,
      slug: project.slug,
      summary: project.summary,
      category: project.category,
      tech: project.tech,
    }));
}

export function getProjectPath(slug: string): string {
  return `/projects/${slug}`;
}

export function toProjectIndexItem(project: ResolvedProject): ProjectIndexItem {
  return {
    slug: project.slug,
    displayName: project.displayName,
    summary: project.summary,
    category: project.category,
    status: project.status,
    tech: project.tech,
    featured: project.featured,
    featuredOrder: project.featuredOrder,
    demo: project.demo,
    cover: project.cover,
    stars: project.repo.stargazers_count,
    forks: project.repo.forks_count,
    language: project.repo.language,
    updatedAt: project.repo.updated_at,
    pushedAt: project.repo.pushed_at,
    archived: project.repo.archived,
    fork: project.repo.fork,
    repoUrl: project.repo.html_url,
    description: project.repo.description,
    topics: project.repo.topics,
  };
}
