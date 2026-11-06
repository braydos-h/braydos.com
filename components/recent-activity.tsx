import { ArrowUpRight, GitCommitHorizontal, Github } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { formatDate } from "@/lib/format";
import type { GitHubResult, RecentCommit } from "@/lib/types";

export function RecentActivity({
  activity,
}: {
  activity: GitHubResult<RecentCommit[]>;
}) {
  return (
    <section id="activity" className="section activity-section">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Recent activity"
            title="Fresh from the repo."
            description="The latest public commits across the projects, pulled from GitHub server-side rather than kept as a hand-written feed."
            action={
              <a
                href="https://github.com/braydos-h"
                target="_blank"
                rel="noreferrer noopener"
                className="text-link"
              >
                View GitHub
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            }
          />
        </Reveal>

        <div className="activity-layout">
          <Reveal className="activity-aside">
            <div className="activity-signal">
              <span className="activity-signal-dot" aria-hidden="true" />
              <span>Public commit feed</span>
            </div>
            <p>
              A small, factual snapshot of what changed recently. Commit messages
              are shown exactly as they appear in public history.
            </p>
            <div className="activity-sync">
              <span>Last synced</span>
              <time dateTime={activity.syncedAt}>{formatDate(activity.syncedAt)}</time>
            </div>
            {activity.source === "fallback" ? (
              <p className="activity-cache-note">
                GitHub is temporarily unavailable. Showing the checked-in public
                snapshot.
              </p>
            ) : null}
            <Link href="/projects" className="text-link activity-aside-link">
              Browse the repository index
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>

          <ol className="activity-feed">
            {activity.data.map((commit, index) => (
              <li key={`${commit.repo}-${commit.sha}-${index}`}>
                <Reveal delay={Math.min(index * 0.045, 0.16)}>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="activity-item"
                  >
                    <span className="activity-item-marker" aria-hidden="true">
                      <GitCommitHorizontal size={15} strokeWidth={1.6} />
                    </span>
                    <span className="activity-item-main">
                      <span className="activity-item-repo">{commit.repo}</span>
                      <span className="activity-item-message">{commit.message}</span>
                      <span className="activity-item-meta">
                        <span className="activity-item-sha">{commit.sha}</span>
                        <time dateTime={commit.date}>{formatDate(commit.date)}</time>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.6}
                      className="activity-item-arrow"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="activity-footnote">
          <Github size={13} aria-hidden="true" />
          <span>
            Activity is derived from public commits. Repository metadata is
            fetched server-side with a checked-in fallback.
          </span>
        </div>
      </div>
    </section>
  );
}
