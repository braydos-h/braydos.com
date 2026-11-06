import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand";
import { GITHUB_PROFILE_URL, GITHUB_REPO_URL } from "@/lib/constants";

const YEAR = new Date().getUTCFullYear();

const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

const FEATURED = [
  { label: "BreachPilot", href: "/projects/breachpilot" },
  { label: "Axion", href: "/projects/axion" },
  { label: "VLESS + REALITY Vision", href: "/projects/vless-xtls-vision-installer" },
  { label: "AIF Project", href: "/projects/aif-project" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div className="footer-identity">
            <BrandMark />
            <p>
              Software for security, networking, and the internet. Built from
              public work and updated from the source.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-github"
            >
              <Github size={15} aria-hidden="true" />
              github.com/braydos-h
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Navigate</p>
            {NAVIGATION.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-column">
            <p className="footer-heading">Selected work</p>
            {FEATURED.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-column">
            <p className="footer-heading">Elsewhere</p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link"
            >
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-link"
            >
              Site source
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <Link href="/projects" className="footer-link">
              All repositories
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {YEAR} Brayden Habets.</p>
          <p className="footer-status">
            <span className="footer-status-dot" aria-hidden="true" />
            Built in public
          </p>
          <p className="footer-meta">
            <span>braydos.com</span>
            <span aria-hidden="true">/</span>
            Next.js + GitHub API
          </p>
        </div>
      </div>
    </footer>
  );
}
