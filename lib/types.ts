export const PROJECT_CATEGORIES = [
  "Security",
  "Networking",
  "Systems",
  "Applied AI",
  "Web",
  "Meta",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectStatus = "Active" | "Maintained" | "Experimental" | "Meta";

export type ProjectVisual =
  | "breachpilot"
  | "axion"
  | "xray"
  | "vless"
  | "aif"
  | "mullvad"
  | "skill"
  | "website"
  | "profile"
  | "generic";

export interface GitHubLicense {
  name: string;
  spdx_id: string | null;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  default_branch: string;
  open_issues_count: number;
  license: GitHubLicense | null;
}

export interface GitHubRepoSnapshot {
  snapshotAt: string;
  repos: GitHubRepo[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "site" | "video" | "docs" | "repo";
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface ArchitectureStep {
  title: string;
  description: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProjectDetails {
  tagline: string;
  overview: string[];
  why?: string;
  highlights?: ProjectHighlight[];
  architecture?: {
    intro?: string;
    steps: ArchitectureStep[];
  };
  screenshots?: ProjectScreenshot[];
  notes?: string[];
}

export interface ProjectConfig {
  displayName?: string;
  slug?: string;
  summary?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  tech?: string[];
  visual?: ProjectVisual;
  demo?: ProjectLink | null;
  demos?: ProjectLink[];
  cover?: {
    src: string;
    alt: string;
  };
  details?: ProjectDetails;
  hidden?: boolean;
}

export interface ResolvedProject {
  repo: GitHubRepo;
  slug: string;
  displayName: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus | null;
  tech: string[];
  visual: ProjectVisual;
  demo: ProjectLink | null;
  demos: ProjectLink[];
  cover?: {
    src: string;
    alt: string;
  };
  details: ProjectDetails | null;
  featured: boolean;
  featuredOrder: number | null;
  cloneUrl: string;
}

export interface RecentCommit {
  repo: string;
  sha: string;
  message: string;
  date: string;
  url: string;
}

export interface GitHubResult<T> {
  data: T;
  source: "live" | "fallback";
  syncedAt: string;
}

export interface PaletteProject {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  tech: string[];
}

export interface ProjectIndexItem {
  slug: string;
  displayName: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus | null;
  tech: string[];
  featured: boolean;
  featuredOrder: number | null;
  demo: ProjectLink | null;
  cover?: {
    src: string;
    alt: string;
  };
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  pushedAt: string;
  archived: boolean;
  fork: boolean;
  repoUrl: string;
  description: string | null;
  topics: string[];
}
