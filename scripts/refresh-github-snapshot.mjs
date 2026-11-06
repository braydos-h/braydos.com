#!/usr/bin/env node

/**
 * Refresh the checked-in GitHub snapshot used when the API is unavailable.
 * Run with `npm run sync:github` (optionally with GITHUB_TOKEN set).
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const username = "braydos-h";
const api = "https://api.github.com";

// Keep this in sync with FEATURED_ORDER in data/projects.ts. The recent
// activity feed only requests commits for featured projects.
const featuredRepos = [
  "BreachPilot",
  "Axion",
  "xray-vless-ws-cdn-installer",
  "vless-xtls-vision-installer",
  "aif-project",
];
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "braydos.com snapshot sync",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function github(path) {
  const response = await fetch(`${api}${path}`, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${path}`);
  }

  return response.json();
}

async function main() {
  const repos = [];

  for (let page = 1; page <= 10; page += 1) {
    const batch = await github(
      `/users/${username}/repos?per_page=100&page=${page}&sort=pushed&type=owner`,
    );
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const snapshots = repos
    .filter((repo) => !repo.private)
    .map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      fork: repo.fork,
      archived: repo.archived,
      private: repo.private,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      topics: repo.topics ?? [],
      default_branch: repo.default_branch,
      open_issues_count: repo.open_issues_count,
      license: repo.license
        ? { name: repo.license.name, spdx_id: repo.license.spdx_id }
        : null,
    }));

  const commitGroups = await Promise.all(
    featuredRepos.map(async (repo) => {
      try {
        const commits = await github(
          `/repos/${username}/${repo}/commits?per_page=1`,
        );
        const commit = commits[0];
        if (!commit) return [];

        return [
          {
            repo,
            sha: commit.sha.slice(0, 7),
            message:
              commit.commit.message.split("\n")[0] ?? "Repository update",
            date:
              commit.commit.committer?.date ??
              commit.commit.author?.date ??
              new Date().toISOString(),
            url: commit.html_url,
          },
        ];
      } catch {
        return [];
      }
    }),
  );

  const commits = commitGroups
    .flat()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const snapshotAt = new Date().toISOString();
  const root = process.cwd();

  await Promise.all([
    writeFile(
      join(root, "data", "github-fallback.json"),
      `${JSON.stringify({ snapshotAt, repos: snapshots }, null, 2)}\n`,
    ),
    writeFile(
      join(root, "data", "activity-fallback.json"),
      `${JSON.stringify({ snapshotAt, commits }, null, 2)}\n`,
    ),
  ]);

  console.log(
    `Updated fallback data for ${snapshots.length} public repositories and ${commits.length} commits.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
