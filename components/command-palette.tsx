"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CornerDownLeft,
  FileCode2,
  Github,
  Home,
  Layers3,
  Moon,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { GITHUB_PROFILE_URL, GITHUB_REPO_URL } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { PaletteProject } from "@/lib/types";

type PaletteEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  group: "Navigate" | "Projects" | "Elsewhere";
  external?: boolean;
  keywords: string;
};

const PAGE_ENTRIES: PaletteEntry[] = [
  {
    id: "page-home",
    title: "Home",
    description: "Back to the landing page.",
    href: "/",
    group: "Navigate",
    keywords: "home start landing braydos",
  },
  {
    id: "page-projects",
    title: "All projects",
    description: "Browse every public repository.",
    href: "/projects",
    group: "Navigate",
    keywords: "projects repositories index code work",
  },
  {
    id: "page-about",
    title: "About Brayden",
    description: "Interests, principles, and the technical toolbox.",
    href: "/about",
    group: "Navigate",
    keywords: "about profile bio toolbox skills",
  },
];

const ELSEWHERE_ENTRIES: PaletteEntry[] = [
  {
    id: "elsewhere-github",
    title: "GitHub profile",
    description: "Public code and activity at @braydos-h.",
    href: GITHUB_PROFILE_URL,
    group: "Elsewhere",
    external: true,
    keywords: "github source profile social code",
  },
  {
    id: "elsewhere-source",
    title: "Portfolio source",
    description: "The repository behind braydos.com.",
    href: GITHUB_REPO_URL,
    group: "Elsewhere",
    external: true,
    keywords: "github portfolio website source nextjs",
  },
];

function iconForEntry(entry: PaletteEntry) {
  if (entry.group === "Projects") return Boxes;
  if (entry.group === "Elsewhere") return Github;
  if (entry.href === "/") return Home;
  if (entry.href === "/projects") return Layers3;
  return UserRound;
}

export function CommandPalette({ projects }: { projects: PaletteProject[] }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);

  const entries = useMemo<PaletteEntry[]>(
    () => [
      ...PAGE_ENTRIES,
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        title: project.title,
        description: project.summary,
        href: `/projects/${project.slug}`,
        group: "Projects" as const,
        keywords: `${project.title} ${project.summary} ${project.category} ${project.tech.join(" ")}`,
      })),
      ...ELSEWHERE_ENTRIES,
    ],
    [projects],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries;

    return entries.filter((entry) =>
      `${entry.title} ${entry.description} ${entry.keywords}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [entries, query]);

  const currentIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  const groups = useMemo(
    () =>
      (["Navigate", "Projects", "Elsewhere"] as const)
        .map((group) => ({
          group,
          items: filtered.filter((entry) => entry.group === group),
        }))
        .filter((group) => group.items.length > 0),
    [filtered],
  );

  const openPalette = useCallback(() => {
    setReturnFocus(
      document.activeElement instanceof HTMLElement ? document.activeElement : null,
    );
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    const target = returnFocus;
    window.setTimeout(() => target?.focus(), 0);
  }, [returnFocus]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) closePalette();
        else openPalette();
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        closePalette();
      }
    };

    const onOpenEvent = () => openPalette();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("braydos:open-command-palette", onOpenEvent);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("braydos:open-command-palette", onOpenEvent);
    };
  }, [closePalette, open, openPalette]);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const active = filtered[currentIndex];
    if (!active) return;
    document.getElementById(`command-item-${active.id}`)?.scrollIntoView({
      block: "nearest",
    });
  }, [currentIndex, filtered, open]);

  function activate(entry: PaletteEntry) {
    closePalette();
    if (entry.external) {
      window.open(entry.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(entry.href);
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex + 1) % Math.max(filtered.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (currentIndex - 1 + Math.max(filtered.length, 1)) %
          Math.max(filtered.length, 1),
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const entry = filtered[currentIndex];
      if (entry) activate(entry);
    }
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="command-backdrop"
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <motion.div
            ref={dialogRef}
            className="command-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-title"
            onKeyDown={handleDialogKeyDown}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 id="command-title" className="sr-only">
              Command palette
            </h2>

            <div className="command-input-wrap">
              <Search size={17} className="text-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                className="command-input"
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-autocomplete="list"
                aria-activedescendant={
                  filtered[currentIndex]
                    ? `command-item-${filtered[currentIndex].id}`
                    : undefined
                }
                placeholder="Search pages and projects…"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                className="command-close"
                onClick={closePalette}
                aria-label="Close command palette"
              >
                <X size={15} />
              </button>
            </div>

            <div className="command-results" id="command-results" role="listbox">
              {groups.length ? (
                groups.map((group) => (
                  <div key={group.group} className="command-group">
                    <p className="command-group-label">{group.group}</p>
                    {group.items.map((entry) => {
                      const index = filtered.findIndex((item) => item.id === entry.id);
                      const Icon = iconForEntry(entry);
                      const active = index === currentIndex;

                      return (
                        <Link
                          key={entry.id}
                          id={`command-item-${entry.id}`}
                          href={entry.href}
                          target={entry.external ? "_blank" : undefined}
                          rel={entry.external ? "noreferrer noopener" : undefined}
                          className={cn("command-item", active && "command-item-active")}
                          role="option"
                          aria-selected={active}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={(event) => {
                            if (entry.external) {
                              event.preventDefault();
                              activate(entry);
                            } else {
                              closePalette();
                            }
                          }}
                        >
                          <span className="command-item-icon">
                            <Icon size={15} strokeWidth={1.7} />
                          </span>
                          <span className="command-item-copy">
                            <span className="command-item-title">{entry.title}</span>
                            <span className="command-item-description">
                              {entry.description}
                            </span>
                          </span>
                          {entry.external ? (
                            <ArrowUpRight size={14} className="command-item-arrow" />
                          ) : (
                            <ArrowRight
                              size={14}
                              className={cn(
                                "command-item-arrow",
                                active && "command-item-arrow-active",
                              )}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="command-empty">
                  <Moon size={19} className="text-faint" aria-hidden="true" />
                  <p>No results for “{query}”.</p>
                  <span>Try a project name, technology, or page.</span>
                </div>
              )}
            </div>

            <div className="command-footer">
              <span className="command-footer-hint">
                <kbd>↑</kbd>
                <kbd>↓</kbd>
                navigate
              </span>
              <span className="command-footer-hint">
                <CornerDownLeft size={12} />
                open
              </span>
              <span className="command-footer-hint">
                <kbd>esc</kbd>
                close
              </span>
              <span className="command-footer-brand">
                <FileCode2 size={12} />
                braydos.com
              </span>
            </div>

            <p className="sr-only" aria-live="polite">
              {filtered.length} results
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
