# Resource Explorer — Rick & Morty (Next.js + TypeScript)

A small, polished React app that explores the public [Rick & Morty API](https://rickandmortyapi.com/).

## ✨ Features

- List view with **pagination** (URL-driven) and a **detail view** at `/characters/:id`.
- **Search** (debounced, bound to `?q=`), **filters** (`status`, `species`, `gender`), and **sort** (`name`, `created`).
- **Favorites**: toggle from list and detail; persisted in `localStorage`. Filter favorites via `?favorites=1`.
- **URL is the source of truth** for `page`, `q`, `status`, `species`, `gender`, `sort`, `favorites`.
- **Loading skeletons**, helpful **empty states**, and **retry** on errors.
- **Cancellation** of inflight requests via React Query + `AbortSignal`.
- **Client caching** & background refetch with TanStack Query.
- **Theme toggle** (light/dark) with persistence.
- **Scroll restoration** on back/forward.
- **Detail page form**: add a local note with validation and persistence.
- Minimal, accessible semantics and keyboard focus styles.

_Nice-to-haves implemented_: client caching, theme toggle, optimistic favorites (local), detail-page form, scroll restoration.  
_Not implemented for simplicity_: virtualization (dataset is ~800 items but paginated; easy to add `react-window` in the list if needed), basic E2E test scaffold is included but not wired in CI.

## 🧱 Tech

- **Next.js 14 (App Router)**, **TypeScript**
- **TanStack Query** for caching & request cancellation
- **Tailwind CSS** for minimal styling
- **next-themes** for dark/light
- No heavy global state managers

## 🚀 Run locally

```bash
# with npm
npm install
npm run dev

# or with pnpm
pnpm install
pnpm dev
```

Then visit http://localhost:3000

## 🧭 URL parameters

- `?q=` — search by name (debounced)
- `?status=` — `alive | dead | unknown`
- `?gender=` — `female | male | genderless | unknown`
- `?species=` — free text (e.g., Human)
- `?sort=` — `name-asc | name-desc | created-asc | created-desc`
- `?page=` — page number (1-based)
- `?favorites=1` — show favorites view

Directly visiting a URL recreates the state. Back/forward navigation preserves scroll position.

## 🧠 Architecture Notes & Trade‑offs

- **URL as source of truth**: All list state is URL-backed using a tiny `useQueryParams` helper. We prefer `router.replace` with `scroll: false` to avoid jarring jumps on filter changes.
- **Cancellation**: We pass the `AbortSignal` from React Query to our `fetch` calls so typing cancels older requests, preventing race conditions.
- **404 → empty state**: The API returns 404 for no results; we normalize that to an empty set for friendlier UX.
- **Sorting**: Performed client-side on the current page results; server doesn’t support sorting. For full-data sorting we’d switch to infinite loading + accumulate pages.
- **Favorites**: Stored in `localStorage` set. Optimistic by nature; we don’t need server round-trips.
- **Scroll restoration**: Kept simple with `sessionStorage` keyed by URL. This avoids losing position when navigating detail → back.
- **Accessibility**: Click targets are buttons/links with labels, and focus rings are visible via Tailwind classes. Images include `alt` text.
- **Virtualization**: Not strictly necessary with page sizes of 20; left as an easy extension (see below).
- **Error boundaries**: Inline retry per-query is sufficient for this scope.
- **Code splitting**: App Router splits by route; the episodes block could be lazy-loaded if needed.

## 🧩 What I’d ship next (if I had more time)

1. **Virtualized list** once we load 100+ items per page or switch to infinite scroll (`react-window`).
2. **Prefetch on hover** for detail pages using React Query to make transitions feel instant.
3. **Better a11y** passes (ARIA where helpful, keyboard shortcuts, focus trapping for modals if added).
4. **Cypress/Playwright** happy-path E2E run in CI (a simple “search → click → favorite” flow).
5. **Offline cache** using `workbox` or service worker, so favorites view works offline with images.
6. **Episode details** panel (code-split), with parallel queries.

## 🧪 E2E (Playwright) — optional smoke test

```bash
# one-time
npx playwright install

# run
npm run e2e
```

See `e2e/tests.spec.ts`.

## 📁 File Structure

```
app/
  characters/[id]/page.tsx     # detail
  layout.tsx
  page.tsx                      # list
components/
  CharacterCard.tsx
  CharacterList.tsx
  EmptyState.tsx
  ErrorState.tsx
  FavoriteButton.tsx
  FiltersBar.tsx
  SearchInput.tsx
  SkeletonCard.tsx
  SortSelect.tsx
  ThemeToggle.tsx
lib/
  debounce.ts
  notes.ts
  rickmorty.ts
  types.ts
  useQueryParams.ts
  useScrollRestoration.ts
providers/
  favorites-provider.tsx
  query-provider.tsx
  theme-provider.tsx
```

---

**Enjoy exploring the multiverse!** 🛸
