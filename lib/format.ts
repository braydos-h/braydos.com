const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "Unknown";
  return shortDateFormatter.format(date);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    Rust: "#dea584",
    Go: "#00add8",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    Shell: "#89e051",
    Swift: "#f05138",
    Markdown: "#8b949e",
  };

  return language ? (colors[language] ?? "#8b949e") : "#8b949e";
}

export function getDemoActionLabel(kind: "site" | "video" | "docs" | "repo"): string {
  if (kind === "site") return "Live";
  if (kind === "video") return "Demo";
  if (kind === "docs") return "Guide";
  return "Repo";
}
