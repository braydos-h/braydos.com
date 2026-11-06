import { ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion-reveal";
import {
  GITHUB_PROFILE_URL,
  SITE_URL,
} from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Brayden Habets — a developer interested in security tooling, network visibility, systems programming, and automation, with a toolbox drawn from public projects.",
  path: "/about",
});

const INTERESTS = [
  {
    number: "01",
    title: "Security that can show its work",
    body: "I am interested in security automation that treats evidence as part of the product. Scope, verification, and an audit trail are not decorations around the exploit path — they are what make the result usable.",
    link: { label: "BreachPilot", href: "/projects/breachpilot" },
  },
  {
    number: "02",
    title: "Networks without the black box",
    body: "Packets, handshakes, tunnels, and the deployment path around them. I like tooling that makes infrastructure legible while leaving the traffic itself alone.",
    link: { label: "Axion", href: "/projects/axion" },
  },
  {
    number: "03",
    title: "Operations with a way back",
    body: "A deployment is not finished when it starts. I keep coming back to preflight checks, atomic switches, diagnostics, and rollback paths — the parts that matter after the first install.",
    link: {
      label: "VLESS + REALITY Vision",
      href: "/projects/vless-xtls-vision-installer",
    },
  },
];

const PRINCIPLES = [
  {
    label: "Start from the boundary",
    body: "What is allowed, what is reachable, and what happens when the sandbox fails? The limits shape the design more than the happy path.",
  },
  {
    label: "Make the invisible legible",
    body: "Good diagnostics, metadata, and reporting shorten the distance between a system doing something and a person understanding why.",
  },
  {
    label: "Leave the source readable",
    body: "Tests, honest limitations, and documentation are part of the software. A project should still make sense when someone else opens it cold.",
  },
];

const TOOLBOX = [
  {
    title: "Languages",
    tools: ["Rust", "Go", "TypeScript", "Python", "Bash", "Swift"],
  },
  {
    title: "Systems & networks",
    tools: [
      "Linux",
      "Docker",
      "systemd",
      "nftables",
      "libpcap",
      "SQLite",
      "Nginx",
      "Xray",
    ],
  },
  {
    title: "Web & interfaces",
    tools: ["React", "Next.js", "Tailwind CSS", "HTML / CSS", "Tkinter", "SwiftUI"],
  },
  {
    title: "Automation & AI",
    tools: ["MCP", "Agent Skills", "Ollama", "Cloudflare Workers AI", "GitHub Actions"],
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Brayden Habets",
    url: SITE_URL,
    image: `${SITE_URL}/brayden.jpg`,
    sameAs: [GITHUB_PROFILE_URL],
    description:
      "Developer interested in security tooling, network visibility, systems programming, and automation.",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <header className="about-hero">
        <div className="about-hero-grid-bg" aria-hidden="true" />
        <div className="site-container">
          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <p className="page-kicker">
                <span className="page-kicker-index">About</span>
                <span className="page-kicker-line" aria-hidden="true" />
                The person behind the repos
              </p>
              <h1>
                Curious about
                <br />
                <span>how things break.</span>
              </h1>
              <p className="about-hero-lead">
                I&apos;m Brayden. I build software on the boundary between
                security and infrastructure, usually because I wanted to
                understand how something actually worked.
              </p>
            </div>

            <div className="about-portrait-block">
              <div className="portrait-frame">
                <span className="portrait-corner portrait-corner-tl" aria-hidden="true" />
                <span className="portrait-corner portrait-corner-tr" aria-hidden="true" />
                <span className="portrait-corner portrait-corner-bl" aria-hidden="true" />
                <span className="portrait-corner portrait-corner-br" aria-hidden="true" />
                <Image
                  src="/brayden.jpg"
                  alt="Brayden's GitHub avatar, a silhouette against a city at night"
                  fill
                  sizes="(min-width: 1024px) 360px, 70vw"
                  className="portrait-image"
                  priority
                />
                <span className="portrait-scan" aria-hidden="true" />
              </div>
              <div className="portrait-meta">
                <span>BRAYDEN HABETS</span>
                <span>@BRAYDOS-H</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section about-story">
        <div className="site-container">
          <div className="about-story-grid">
            <div className="about-story-aside">
              <p className="page-kicker compact">
                <span className="page-kicker-index">01</span>
                <span className="page-kicker-line" aria-hidden="true" />
                Overview
              </p>
            </div>
            <Reveal className="about-story-main">
              <blockquote className="about-quote">
                i break stuff, find out why, then fix it.
              </blockquote>
              <div className="prose-large">
                <p>
                  I&apos;m drawn to the layer where things actually happen: how
                  a packet crosses the wire, where a permission boundary fails,
                  or why an automated run cannot prove its own result. Most of
                  what I learn starts with taking a system apart to understand
                  it, then building something that makes the next attempt safer
                  or more repeatable.
                </p>
                <p>
                  That curiosity has turned into a body of public work.{" "}
                  <Link href="/projects/breachpilot">BreachPilot</Link> is an
                  evidence-driven autonomous security-testing operator.{" "}
                  <Link href="/projects/axion">Axion</Link> observes network
                  traffic without modifying it. The Xray installers turn brittle
                  host setup into recoverable, auditable operations. Smaller
                  projects — a proxy checker, a portable security skill, a
                  cattle-weight estimator — explore the edges of that same loop.
                </p>
                <p>
                  I care about software that is understandable at the source
                  level, explicit about its limits, and honest about what it has
                  actually verified. The projects are the useful part of this
                  page; the toolbox below is the set of things I reach for to
                  build them.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section about-interests">
        <div className="site-container">
          <Reveal>
            <div className="about-section-heading">
              <p className="page-kicker compact">
                <span className="page-kicker-index">02</span>
                <span className="page-kicker-line" aria-hidden="true" />
                Interests
              </p>
              <h2>What keeps pulling me back.</h2>
            </div>
          </Reveal>

          <div className="interest-grid">
            {INTERESTS.map((interest) => (
              <Reveal key={interest.number}>
                <div className="interest-card">
                  <span className="interest-number">{interest.number}</span>
                  <h3>{interest.title}</h3>
                  <p>{interest.body}</p>
                  <Link href={interest.link.href} className="text-link">
                    {interest.link.label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-principles">
        <div className="site-container">
          <div className="about-principles-grid">
            <div>
              <Reveal>
                <p className="page-kicker compact">
                  <span className="page-kicker-index">03</span>
                  <span className="page-kicker-line" aria-hidden="true" />
                  Working principles
                </p>
                <h2 className="about-principles-title">
                  A bias toward
                  <br />
                  observable systems.
                </h2>
              </Reveal>
            </div>

            <div className="principle-list">
              {PRINCIPLES.map((principle, index) => (
                <Reveal key={principle.label} delay={index * 0.05}>
                  <div className="principle-row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{principle.label}</h3>
                      <p>{principle.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-toolbox">
        <div className="site-container">
          <Reveal>
            <div className="about-section-heading about-toolbox-heading">
              <p className="page-kicker compact">
                <span className="page-kicker-index">04</span>
                <span className="page-kicker-line" aria-hidden="true" />
                Toolbox
              </p>
              <h2>Tools with a reason to be there.</h2>
              <p>
                A compact view of the languages and systems that appear across
                my public repositories. Not a checklist — just the tools the
                projects actually lean on.
              </p>
            </div>
          </Reveal>

          <div className="toolbox-grid">
            {TOOLBOX.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.04}>
                <div className="toolbox-card">
                  <div className="toolbox-card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul>
                    {group.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="section about-contact">
        <div className="site-container">
          <Reveal>
            <div className="about-contact-panel">
              <div className="about-contact-copy">
                <p className="page-kicker compact">
                  <span className="page-kicker-index">05</span>
                  <span className="page-kicker-line" aria-hidden="true" />
                  Elsewhere
                </p>
                <h2>The source is the best introduction.</h2>
                <p>
                  GitHub is where the work lives. You can also read the source
                  behind this site if you want to see how it is put together.
                </p>
              </div>
              <div className="about-contact-links">
                <ButtonLink
                  href={GITHUB_PROFILE_URL}
                  external
                  className="button-primary"
                >
                  <Github size={15} aria-hidden="true" />
                  GitHub profile
                  <ArrowUpRight size={14} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="https://github.com/braydos-h/braydos.com"
                  external
                  variant="secondary"
                  className="button-secondary"
                >
                  Site source
                  <ArrowUpRight size={14} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
