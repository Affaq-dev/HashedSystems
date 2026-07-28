# Venuze — Hashed System Next.js + TypeScript Assignment

A venue-discovery application built from the provided Figma design: a public marketing site and an
authenticated search experience behind middleware-protected routes.

- **Repository:** https://github.com/Affaq-dev/HashedSystems
- **Live deployment:** https://hashed-systems.vercel.app/

---

## Getting Started

**Requirements:** Node 20+ (Node 24 recommended) and npm.

```bash
git clone https://github.com/Affaq-dev/HashedSystems.git
cd HashedSystem
npm install
```

### Environment variables

reqres.in now requires a per-account API key, so the app will not authenticate without one.

```bash
cp .env.example .env.local
```

Create a free key at https://app.reqres.in/api-keys and set it:

```
REQRES_API_KEY=your_key_here
```

The key is **server-only** (no `NEXT_PUBLIC_` prefix). It is never exposed to the browser — see
[Authentication](#authentication) below. If the key is missing, the login endpoint returns a clear
`500` with an actionable message rather than failing silently.

On Vercel, add `REQRES_API_KEY` under Project Settings → Environment Variables.

### Run

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

### Demo credentials

```
email:    eve.holt@reqres.in
password: cityslicka
```

---

## Tech Stack

| Requirement | Used | Notes |
| --- | --- | --- |
| Next.js 15+ (App Router) | 16.2.12 | App Router throughout, route groups, server actions not needed |
| TypeScript | 5.x | `strict` mode, no `any` in application code |
| Tailwind CSS | 4.x | CSS-first config via `@theme` in `globals.css` |
| TanStack Query | 5.101 | Server-state, caching, infinite pagination, mutations |
| Zustand | 5.0 | Auth state (persisted) and UI state |
| React Hook Form | 7.83 | Login form and filter modal, with `zod` resolvers |
| Fetch API | native | Chosen over Axios — see [Technical Decisions](#technical-decisions) |

Supporting libraries: `zod` (schema validation on both client and server), `react-leaflet` +
`leaflet` (results map), `@hookform/resolvers`.

---

## Project Organization

```
src/
├── app/
│   ├── (public)/            # Unauthenticated marketing site
│   │   ├── layout.tsx       # Navbar + footer shell
│   │   └── page.tsx         # Landing page (Server Component)
│   ├── (auth)/login/        # Login screen
│   ├── (app)/               # Authenticated area
│   │   ├── layout.tsx
│   │   └── search/page.tsx  # Venue discovery
│   ├── api/
│   │   ├── auth/login/      # BFF proxy → reqres.in/api/login
│   │   ├── auth/user/       # BFF proxy → reqres.in/api/users/:id
│   │   └── venues/          # Filter / sort / paginate the venue dataset
│   ├── error.tsx            # Route-level error boundary
│   ├── not-found.tsx
│   ├── layout.tsx           # Fonts, providers, toast viewport
│   └── globals.css          # Design tokens (@theme)
├── components/
│   ├── ui/                  # Primitives: button, input, modal, skeleton, chip, toast…
│   ├── layout/              # Navbar, footer, user menu, mobile menu, contact form
│   ├── home/                # Landing page sections
│   ├── search/              # Toolbar, category tabs, filters, results grid, map
│   ├── venue/               # VenueCard — shared by home and search
│   └── auth/                # Login form
├── hooks/                   # use-login, use-venues, use-search-params-state
├── lib/                     # api-client, auth-api, reqres, query-client, cn
├── stores/                  # auth-store, ui-store
├── providers/               # query-provider
├── types/                   # user, venue
├── data/                    # venues.ts — 27-venue seed dataset
└── proxy.ts                 # Route protection (see note below)
```

**Route groups** separate the three shells — public, auth, and authenticated — so each gets its own
layout without leaking into the URL.

**Components are grouped by feature**, with genuinely shared pieces promoted to `ui/`. `VenueCard`
lives in `venue/` rather than `search/` because it is used by both the landing page carousel and the
search results grid.

---

## Technical Decisions

### Server Components by default

Everything is a Server Component unless it needs interactivity. The landing page and several of its
sections (`destinations`, `how-it-works`, `section-heading`, `list-venue-cta`, `vendor-cta-banner`)
ship zero JavaScript. `"use client"` is pushed to the leaves — carousels, the search toolbar, the
filter modal, the map — so interactive islands don't drag their parents onto the client.

### A thin BFF for authentication

The login and user calls go through `app/api/auth/*` route handlers rather than straight from the
browser to reqres.in. This keeps `REQRES_API_KEY` on the server (a `NEXT_PUBLIC_` key would be
readable by anyone), gives one place to normalise upstream error shapes into `{ error: string }`,
and validates the request body with `zod` before it leaves our origin.

### URL as the source of truth for search

Filters, sort, category, and keyword all live in the query string, read and written through
`use-search-params-state`. Search results are shareable and survive refresh and back/forward, and
the TanStack Query key derives from the same serialised params — so cache identity and the URL can
never drift apart.

### Fetch over Axios

The assignment allows either. Native `fetch` integrates with Next's caching and revalidation, and
avoids a dependency for what amounts to a thin wrapper. `lib/api-client.ts` provides that wrapper —
JSON parsing plus a typed `ApiError` carrying status and message.

### `proxy.ts`, not `middleware.ts`

Next.js 16 renamed the middleware entry point to `src/proxy.ts` (the build output confirms it:
`ƒ Proxy (Middleware)`). It performs the same role the assignment asks for: unauthenticated requests
to `/search` are redirected to `/login` with a `?from=` return path, and authenticated users hitting
`/login` are bounced to `/search`. The `from` value is validated by `safeRedirect()` in
`use-login.ts`, which rejects protocol-relative and absolute URLs to close an open-redirect hole.

### Design tokens

Colors, radii, shadows, and the font stack are declared once in `globals.css` under Tailwind 4's
`@theme` block, so `bg-primary` or `shadow-card` resolve consistently instead of hex values being
copy-pasted across components.

---

## State Management Approach

The split is deliberate: **TanStack Query owns server state, Zustand owns client state.** No server
data is ever mirrored into Zustand, which avoids the usual staleness and invalidation bugs.

### TanStack Query

- `useVenues` — `useInfiniteQuery` over `/api/venues`, 9 per page, with `getNextPageParam` driving
  "load more". `placeholderData: keepPreviousData` keeps the previous result on screen while a new
  filter combination loads, so the grid doesn't flash empty on every filter change.
- `useLogin` — `useMutation` wrapping the login call, with `onSuccess` writing auth state and
  redirecting, and `onError` surfacing a toast.
- Query keys are derived from the serialised search params, so any filter change is a new cache
  entry and revisiting a previous combination is instant.

### Zustand

- **`auth-store`** — token and user, wrapped in `persist` against `localStorage` so a refresh keeps
  the session. `setAuth`/`logout` also write/clear the `venuze_token` cookie, because `proxy.ts`
  runs on the server and cannot read `localStorage`. Keeping both in one action prevents them from
  going out of sync.
- **`ui-store`** — filter modal visibility, mobile menu, and the toast queue. Toasts are a store
  concern rather than a context so any component can fire one without prop drilling or a provider
  wrapper.

---

## Assumptions

- **"Dashboard" is the authenticated search screen.** The brief says to redirect to a dashboard
  after login; the Figma's authenticated area is the venue-discovery/search experience, so `/search`
  is treated as that destination.
- **Venue data is a local seed dataset.** No venue API was provided, so `data/venues.ts` holds 27
  venues across London, New York, and Dubai, served through `/api/venues` — a real route handler
  doing zod-validated filtering, sorting, and pagination. Swapping in a real backend means changing
  one module.
- **The logged-in user is reqres user 4.** The login response returns only a token, so the app
  fetches user 4 (Eve Holt) to populate the header. If that call fails, it falls back to a default
  rather than blocking the session.
- **Testimonial copy is real rather than lorem ipsum.** The design uses placeholder text; readable
  copy was substituted at the same line count so the card proportions still match.
- Implementation follows the Figma file shared for this assignment, measured at the 1440 / 768 / 375
  frames.

---

## Challenges Faced

- **Next.js 16 moved the goalposts.** Middleware is now `src/proxy.ts`. The rename isn't obvious
  from older docs, and the build output was what confirmed the file was actually being picked up.
- **reqres.in started requiring an API key.** The straightforward client-side call returns 401 now.
  This drove the BFF route-handler design, which turned out to be the better architecture anyway.
- **Pixel-matching three breakpoints.** Several sections needed different structures per breakpoint
  rather than a single fluid layout — the stats/testimonials block is a 4-up grid on desktop, 2×2 on
  tablet, and a peek carousel on mobile, each with its own type scale. These were measured off the
  Figma frames rather than eyeballed.
- **The `cn()` helper is a plain join, not `tailwind-merge`.** Passing a conflicting utility through
  `className` does not override the base class — both are emitted and stylesheet order decides. Once
  identified, the fix was to vary the base component or use a raw element rather than fight it.
- **Dev-mode image optimisation stalls on uncached variants.** A newly requested size could hang in
  `next dev` while serving instantly under `next start`. Verification for image-heavy sections was
  done against production builds to avoid chasing a phantom bug.

---

## Beyond the Core Requirements

- **Custom hooks** — `useVenues`, `useLogin`, `useSearchParamsState`.
- **Error boundary** — `app/error.tsx` plus a styled `not-found.tsx`.
- **Loading and empty states** — skeleton cards matching the real card geometry, a dedicated empty
  state with illustration, and error states on failed queries.
- **Accessibility** — semantic landmarks, labelled controls, `aria-live` toasts, visible
  focus-visible rings, `aria-expanded`/`aria-haspopup` on dropdowns, and `prefers-reduced-motion`
  honoured by the hero carousel and card transitions.
- **Performance** — Server Components by default, `next/image` with per-breakpoint `sizes` so mobile
  fetches ~118px portraits instead of full-size assets, and route-level code splitting.

## Known Limitations

- No automated tests. Given the 24-hour window, effort went into design accuracy and the
  authenticated flow; the seams for testing exist (hooks and route handlers are independently
  testable), but the suite itself is not written.
- Dark mode is not implemented — the Figma defines a light theme only.
- `npm audit` reports high-severity advisories in dev-only transitive dependencies of
  `eslint-config-next`. Resolving them forces a breaking ESLint 10 upgrade, so they are left in
  place; nothing ships to the client.
