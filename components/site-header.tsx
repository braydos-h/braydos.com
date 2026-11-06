"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { BrandMark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { GITHUB_PROFILE_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

const emptySubscribe = () => () => {};

function getShortcutLabel() {
  if (typeof navigator === "undefined") return "Ctrl K";
  return /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K";
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shortcutLabel = useSyncExternalStore(
    emptySubscribe,
    getShortcutLabel,
    () => "Ctrl K",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onViewportChange = () => {
      if (desktopQuery.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener("change", onViewportChange);
    return () => desktopQuery.removeEventListener("change", onViewportChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  function openCommandPalette() {
    setMenuOpen(false);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("braydos:open-command-palette"));
    }, 0);
  }

  return (
    <>
      <header className={cn("site-header", scrolled && "site-header-scrolled")}>
        <div className="site-container">
          <div className="header-inner">
            <BrandMark />

            <nav className="desktop-nav" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("nav-link", active && "nav-link-active")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="header-actions">
              <button
                type="button"
                onClick={openCommandPalette}
                className="command-trigger"
                aria-label="Open command palette"
              >
                <Search size={14} strokeWidth={1.8} />
                <span className="command-trigger-label">Jump to</span>
                <kbd>{shortcutLabel}</kbd>
              </button>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="github-pill"
                aria-label="Brayden Habets on GitHub"
                title="Open @braydos-h on GitHub"
              >
                <span className="github-pill-icon">
                  <Github size={14} strokeWidth={1.9} />
                </span>
                <span className="github-pill-handle">GitHub</span>
                <span className="github-pill-handle-mono">@braydos-h</span>
                <ArrowUpRight size={13} strokeWidth={1.8} />
              </a>

              <ThemeToggle />

              <button
                type="button"
                className="icon-button menu-button"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-nav-inner">
              <div className="mobile-nav-links">
                {NAV_ITEMS.map((item, index) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={cn("mobile-nav-link", active && "mobile-nav-link-active")}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="mobile-nav-index">0{index + 1}</span>
                        {item.label}
                        <ArrowUpRight size={20} strokeWidth={1.4} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mobile-nav-secondary">
                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="mobile-nav-action"
                >
                  <Search size={15} />
                  Search everything
                  <kbd>{shortcutLabel}</kbd>
                </button>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mobile-nav-action"
                >
                  <Github size={15} />
                  GitHub profile
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <p className="mobile-nav-note">
                Security, networking, and the systems underneath.
              </p>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
