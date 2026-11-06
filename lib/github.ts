import activityFallback from "@/data/activity-fallback.json";
import repoFallback from "@/data/github-fallback.json";
import { GITHUB_USERNAME, REVALIDATE_SECONDS } from "@/lib/constants";
import type {
  GitHubRepo,
  GitHubRepoSnapshot,
  GitHubResult,
  RecentCommit,
} from "@/lib/types";

const GITHUB_API = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";

interface RecentActivitySnapshot {
  snapshotAt: string;
  commits: RecentCommit[];
}

const repoSnapshot = repoFallback as GitHubRepoSnapshot;
const activitySnapshot = activityFallback as RecentActivitySnapshot;

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "braydos.com portfolio",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function githubFetch<T>(
  path: string,
  revalidate = REVALIDATE_SECONDS,
): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    headers: githubHeaders(),
    next: { revalidate, tags: ["github"] },
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    throw new Error(
      `GitHub API ${response.status}${remaining ? ` (${remaining} requests remaining)` : ""}`,
    );
  }

  return (await response.json()) as T;
}

function isPublicRepo(repo: GitHubRepo): boolean {
  return Boolean(repo && !repo.private && repo.name && repo.html_url);
}

export async function getPublicRepos(): Promise<GitHubResult<GitHubRepo[]>> {
  try {
    const repos: GitHubRepo[] = [];

    // The public API caps each page at 100 entries. Page through so the index
    // does not silently stop updating if the account grows past that limit.
    for (let page = 1; page <= 10; page += 1) {
      const batch = await githubFetch<GitHubRepo[]>(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=pushed&type=owner`,
      );
      repos.push(...batch);

      if (batch.length < 100) break;
    }

    const publicRepos = repos.filter(isPublicRepo);
    if (!publicRepos.length) throw new Error("GitHub returned no public repositories");

    return {
      data: publicRepos,
      source: "live",
      syncedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(
      "[github] Falling back to the local repository snapshot:",
      error instanceof Error ? error.message : error,
    );

    return {
      data: repoSnapshot.repos.filter(isPublicRepo),
      source: "fallback",
      syncedAt: repoSnapshot.snapshotAt,
    };
  }
}

interface GitHubCommitResponse {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
    committer: { date: string } | null;
  };
}

export async function getRecentCommits(
  repoNames: readonly string[],
  limit = 5,
): Promise<GitHubResult<RecentCommit[]>> {
  try {
    const commits = await Promise.all(
      repoNames.map(async (repo) => {
        const latest = await githubFetch<GitHubCommitResponse[]>(
          `/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=1`,
          1800,
        );
        const commit = latest[0];
        if (!commit) return null;

        return {
          repo,
          sha: commit.sha.slice(0, 7),
          message: commit.commit.message.split("\n")[0] ?? "Repository update",
          date:
            commit.commit.committer?.date ??
            commit.commit.author?.date ??
            new Date().toISOString(),
          url: commit.html_url,
        } satisfies RecentCommit;
      }),
    );

    const resolved = commits
      .filter((commit): commit is RecentCommit => Boolean(commit))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    if (!resolved.length) throw new Error("No public commits were returned");

    return {
      data: resolved,
      source: "live",
      syncedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(
      "[github] Falling back to the local commit snapshot:",
      error instanceof Error ? error.message : error,
    );

    const filteredFallback = activitySnapshot.commits
      .filter((commit) => repoNames.includes(commit.repo))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      data: (filteredFallback.length ? filteredFallback : activitySnapshot.commits).slice(
        0,
        limit,
      ),
      source: "fallback",
      syncedAt: activitySnapshot.snapshotAt,
    };
  }
}

function stripMarkdown(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getReadmeExcerpt(
  repoName: string,
  defaultBranch?: string,
): Promise<string | null> {
  try {
    const branches = Array.from(
      new Set([defaultBranch, "main", "master"].filter(Boolean) as string[]),
    );

    for (const branch of branches) {
      const response = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${branch}/README.md`,
        {
          headers: { "User-Agent": "braydos.com portfolio" },
          next: { revalidate: 86400, tags: ["github-readme"] },
        },
      );

      if (!response.ok) continue;
      const markdown = await response.text();
      const lines = markdown.split(/\r?\n/);
      const paragraphs: string[] = [];
      let current: string[] = [];
      let inCodeBlock = false;

      const flush = () => {
        const candidate = stripMarkdown(current.join(" "));
        if (
          candidate.length > 80 &&
          !candidate.startsWith("![") &&
          !candidate.includes("img.shields.io") &&
          !candidate.toLowerCase().startsWith("table of contents")
        ) {
          paragraphs.push(candidate);
        }
        current = [];
      };

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          continue;
        }
        if (inCodeBlock) continue;
        if (!trimmed) {
          if (current.length) flush();
          continue;
        }
        if (
          trimmed.startsWith("#") ||
          trimmed.startsWith("[![") ||
          trimmed.startsWith("![") ||
          trimmed.startsWith("<") ||
          trimmed.startsWith("|") ||
          trimmed.startsWith("---")
        ) {
          if (current.length) flush();
          continue;
        }
        current.push(trimmed);
        if (paragraphs.length >= 3) break;
      }

      if (current.length) flush();

      return paragraphs.slice(0, 2).join("\n\n") || null;
    }
  } catch (error) {
    console.warn(
      "[github] README fallback unavailable:",
      error instanceof Error ? error.message : error,
    );
  }

  return null;
}
