import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import type { ResolvedProject } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: ResolvedProject[] }) {
  return (
    <section id="work" className="section work-section">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Things I've built."
            description="A closer look at the projects where security, networking, and systems work meet. Every entry links back to public source."
            action={
              <Link href="/projects" className="text-link">
                All repositories
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>

        <div className="featured-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              className={index === 0 ? "featured-item featured-item-wide" : "featured-item"}
              delay={index === 0 ? 0 : Math.min(index * 0.06, 0.18)}
            >
              <ProjectCard
                project={project}
                index={index}
                large={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
