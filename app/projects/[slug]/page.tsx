import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ProjectDetail } from "@/components/project-detail";
import { SITE_URL } from "@/lib/constants";
import { getReadmeExcerpt } from "@/lib/github";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { projects } = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getProjects();
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  return pageMetadata({
    title: project.displayName,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { projects, source, syncedAt } = await getProjects();
  const project = getProjectBySlug(projects, slug);

  if (!project) notFound();

  const readmeExcerpt = project.details
    ? null
    : await getReadmeExcerpt(project.repo.name, project.repo.default_branch);

  // Keep the featured sequence together, then continue through the rest of
  // the public index. No looping pager: the first and last projects get a
  // single clear neighbour instead of a confusing wrap-around.
  const featured = getFeaturedProjects(projects);
  const remaining = projects
    .filter((item) => !item.featured)
    .sort((a, b) => a.displayName.localeCompare(b.displayName, "en"));
  const orderedProjects = [...featured, ...remaining];
  const currentIndex = orderedProjects.findIndex((item) => item.slug === project.slug);
  const previous =
    currentIndex > 0
      ? {
          displayName: orderedProjects[currentIndex - 1].displayName,
          slug: orderedProjects[currentIndex - 1].slug,
        }
      : undefined;
  const next =
    currentIndex >= 0 && currentIndex < orderedProjects.length - 1
      ? {
          displayName: orderedProjects[currentIndex + 1].displayName,
          slug: orderedProjects[currentIndex + 1].slug,
        }
      : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.displayName,
    description: project.summary,
    codeRepository: project.repo.html_url,
    url: `${SITE_URL}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Brayden Habets",
      url: SITE_URL,
    },
    programmingLanguage: project.repo.language ?? undefined,
    license: project.repo.license?.spdx_id
      ? `https://spdx.org/licenses/${project.repo.license.spdx_id}.html`
      : undefined,
    dateModified: project.repo.pushed_at,
    keywords: project.repo.topics.join(", ") || project.tech.join(", "),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectDetail
        project={project}
        readmeExcerpt={readmeExcerpt}
        source={source}
        syncedAt={syncedAt}
        previous={previous}
        next={next}
      />
    </>
  );
}
