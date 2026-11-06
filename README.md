# braydos.com

The source for [braydos.com](https://braydos.com) — a personal index of public work in security, networking, systems, and software.

The site is a server-rendered **Next.js App Router** application. GitHub provides the live repository metadata; a local editorial layer adds verified links, categories, and the context that a repository description cannot carry. Nothing on the site is backed by a database or analytics.

## Stack

- Next.js 16 (App Router, ISR)
- React 19 + TypeScript
- Tailwind CSS plus a custom design system
- Motion for the small number of interactive transitions
- Lucide icons
- GitHub REST API
- Vercel for deployment

## Local development

Requirements: Node.js 20.9 or newer (`.nvmrc` uses Node 22) and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

A GitHub token is not required for local development. Without one, the GitHub REST API is limited to 60 unauthenticated requests per hour; the site falls back to the checked-in snapshot if the limit is reached or the API is unavailable.

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run check` runs lint and TypeScript together. There are no component tests yet; production builds are the integration check for the static routes and the GitHub data layer.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Optional server-side GitHub token. Raises API rate limits. No write scopes are needed. |

Use a read-only token. Never rename this variable to `NEXT_PUBLIC_GITHUB_TOKEN` or expose it in client code. It is read only by server modules (`lib/github.ts`) and is never sent to the browser.

`GITHUB_TOKEN` should be available in Vercel's **Build** and **Runtime** environments because ISR can refresh data after deployment.

## How GitHub synchronization works

- `/` and `/projects` load public repository metadata server-side.
- Project detail pages are generated with `generateStaticParams` from the current public repository list.
- Pages use ISR with a one-hour revalidation window.
- Recent commit data is refreshed more frequently and has its own fallback.
- A new public repository appears on the projects page after the next revalidation, without a code change. Its detail page can be generated on demand. A redeploy makes it appear immediately.
- If the GitHub API is unavailable, the site uses the checked-in snapshots in:
  - `data/github-fallback.json`
  - `data/activity-fallback.json`
- Private repositories are filtered out before they reach any page. Forks are included in the data but hidden by default in the projects index; a “Show forks” control appears only when forks exist.

The GitHub user is set in `lib/constants.ts` (`GITHUB_USERNAME`). The canonical site URL is set there too.

To refresh the fallback snapshot:

```bash
npm run sync:github
```

This command reads public metadata and recent public commits. If `GITHUB_TOKEN` is set in your shell, it will be used for the request. It never writes secrets to the snapshot.

### Rate limits

The repository loader pages through the public repos endpoint and uses the GitHub token when available. A 403, rate-limit response, empty response, or network failure is logged server-side and the local snapshot is used. The UI indicates when cached metadata is being shown.

## Editing the project index

Repository names, stars, languages, dates, and archive state come from GitHub. The editorial layer is **`data/projects.ts`**.

### Feature and reorder projects

```ts
export const FEATURED_ORDER = [
  "BreachPilot",
  "Axion",
  "xray-vless-ws-cdn-installer",
  "vless-xtls-vision-installer",
  "aif-project",
];
```

The first project gets the large card on the homepage. The remaining items follow in a two-column grid. Reorder or replace repository names here. Any repository omitted from this list still appears on `/projects`.

### Override a project

Add an entry keyed by the exact GitHub repository name:

```ts
"SOME_REPO_NAME": {
  displayName: "A human-readable name",
  slug: "stable-url-slug",
  summary: "A one-sentence, accurate description.",
  category: "Security", // Security | Networking | Systems | Applied AI | Web | Meta
  status: "Active",     // Active | Maintained | Experimental | Meta
  tech: ["Rust", "Linux"],
  visual: "axion",      // optional artwork key; defaults to "generic"
  demo: {
    label: "Visit the project",
    href: "https://verified.example.com",
    kind: "site",       // site | video | docs | repo
  },
  details: {
    tagline: "A short editorial line.",
    overview: ["First paragraph.", "Second paragraph."],
    why: "Why the project exists.",
    highlights: [{ title: "Feature", description: "What it actually does." }],
    architecture: {
      intro: "Optional introduction.",
      steps: [{ title: "Step", description: "What happens here." }],
    },
    notes: ["A documented limitation or constraint."],
  },
},
```

Available artwork keys are `breachpilot`, `axion`, `xray`, `vless`, `aif`, `mullvad`, `skill`, `website`, `profile`, and `generic`.

Only add `demo` links that you have verified. The repository homepage field is intentionally not trusted automatically.

### Hide a project

```ts
"SOME_REPO_NAME": {
  hidden: true,
},
```

Hidden projects are also excluded from the sitemap and command palette.

### Add screenshots

1. Put a web-optimized image in `public/projects/`, for example `public/projects/axion-dashboard.webp`.
2. Add a cover and/or gallery images to the override:

```ts
"Axion": {
  cover: {
    src: "/projects/axion-dashboard.webp",
    alt: "Axion flow dashboard showing captured TLS metadata",
  },
  details: {
    // ...the rest of the details object
    screenshots: [
      {
        src: "/projects/axion-dashboard.webp",
        alt: "Axion flow dashboard showing captured TLS metadata",
        caption: "The local dashboard in live capture mode.",
        width: 1600,
        height: 900,
      },
    ],
  },
},
```

Covers replace the generated artwork on cards and project detail hero sections. Gallery images render in the “In view” section. Always write a useful `alt` value. A practical export size is 1600×900 in WebP or AVIF.

### Artwork and content sources

Generated project artwork is implemented in `components/project-visual.tsx`. It represents each project's documented architecture and features; it is not presented as a product screenshot.

Project prose is based on the public READMEs and repository metadata. When a repository has no editorial entry, the detail page shows a smaller metadata-derived page, optionally with a short excerpt from its public README. It does not dump raw Markdown into the page.

## Project structure

```text
app/
  page.tsx                     Homepage
  projects/page.tsx            Searchable repository index
  projects/[slug]/page.tsx     Generated project detail pages
  about/page.tsx               About page
  error.tsx                    Client error boundary
  not-found.tsx                Custom 404
  sitemap.ts, robots.ts        SEO routes
  globals.css                  Design tokens and layout system
components/                    UI, project artwork, command palette
data/
  projects.ts                  Editorial overrides and featured order
  github-fallback.json         Public repository snapshot
  activity-fallback.json       Public commit snapshot
lib/
  github.ts                    Server-side GitHub data layer
  projects.ts                  Repository + override resolution
  seo.ts                       Per-page metadata
scripts/
  generate-assets.mjs          Favicon, app icons, and OG image
  refresh-github-snapshot.mjs  Fallback data updater
public/                        Avatar, OG image, icons
```

## Deployment on Vercel

1. Push this repository to GitHub.
2. Create a Vercel project and import the repository.
3. Keep the framework preset as **Next.js** and the build command as `npm run build`.
4. Add `GITHUB_TOKEN` under **Project → Settings → Environment Variables** for Production and Preview, plus your local Development environment if desired.
5. Deploy.

The application uses ISR and server-side GitHub fetching, so it needs a Next.js-capable host. A purely static export is not supported without changing the data strategy.

### Custom domain and HTTPS

DNS is not configured by this repository. Once the project is deployed:

1. In Vercel, open **Project → Settings → Domains**.
2. Add `braydos.com`.
3. Add `www.braydos.com` as well.
4. Use the exact DNS records Vercel displays for your account. For an apex domain, that is typically an A or ALIAS record; for `www`, typically a CNAME. Do not guess values: Vercel's dashboard is the source of truth and can differ for projects.
5. In your DNS provider, create the records with the lowest TTL available during setup.
6. Wait for Vercel to verify the domain and issue the TLS certificate. HTTPS is provisioned automatically after verification.
7. Choose `braydos.com` as the primary domain. The included `vercel.json` sends `www.braydos.com` to `https://braydos.com` with a permanent redirect, and the metadata and sitemap use the apex domain. If you decide to make `www` primary instead, update both the redirect and `SITE_URL`.
8. If the canonical domain ever changes, update `SITE_URL` in `lib/constants.ts` and redeploy so canonical URLs, Open Graph URLs, sitemap entries, and structured data stay aligned.

Do not enable any HSTS header changes until the custom domain is verified and HTTPS is working.

## SEO and production notes

- Per-page canonical URLs, descriptions, and Open Graph/Twitter metadata are in `lib/seo.ts` and each route's metadata export.
- The social image is `public/og.png`, generated by `npm run assets`.
- JSON-LD is included for the person, site, project collection, individual projects, and profile page.
- `app/sitemap.ts` includes every visible project page. `app/robots.ts` points to it.
- The custom 404 and error states are in `app/not-found.tsx` and `app/error.tsx`.
- Motion is limited to interaction and entrance transitions. The site respects `prefers-reduced-motion`.
- There is no analytics, authentication, database, or client-side GitHub token.

## Content policy

- Only public repositories are shown.
- Descriptions, demos, statuses, and limitations are sourced from repository documentation or verified public sites.
- No employment history, education, certifications, location, or social account has been inferred or invented.
- The only linked external profile is the verified GitHub account.

## License

The site source is available under the repository's existing Apache 2.0 license. Project names, repository content, and third-party trade marks remain the property of their respective owners.
