import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/featured-projects";
import { FocusAreas } from "@/components/focus-areas";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { RecentActivity } from "@/components/recent-activity";
import { SiteCta } from "@/components/site-cta";
import {
  GITHUB_PROFILE_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/constants";
import { getRecentCommits } from "@/lib/github";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default async function HomePage() {
  const { projects } = await getProjects();
  const featured = getFeaturedProjects(projects);
  const activity = await getRecentCommits(
    featured.slice(0, 5).map((project) => project.repo.name),
    5,
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Brayden Habets",
        url: SITE_URL,
        image: `${SITE_URL}/brayden.jpg`,
        sameAs: [GITHUB_PROFILE_URL],
        description:
          "Developer building software for security, networking, and the internet.",
        knowsAbout: [
          "Cybersecurity",
          "Computer networking",
          "Systems programming",
          "Developer tooling",
          "Applied AI",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "braydos.com",
        description: SITE_DESCRIPTION,
        author: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero repositoryCount={projects.length} />
      <FeaturedProjects projects={featured} />
      <FocusAreas projects={projects} />
      <RecentActivity activity={activity} />
      <SiteCta />
    </>
  );
}
