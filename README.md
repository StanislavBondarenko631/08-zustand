## 🚀 NoteHub Refactoring (Migrating to Next.js)

The application has been successfully migrated from a Single Page Application
(SPA) built with React and Vite to a modern, multi-page application utilizing
**Next.js 16 (App Router)**. This refactoring enhances the overall user
experience through hybrid rendering, optimized routing, and reliable state
management.

### 🛠️ Key Project Implementations

- **📂 Multi-Page Structure & Dynamic Routing**:
  - `/` — Static server-rendered home page with main information about NoteHub.
  - `/notes` — Server-side rendered (SSR) list of notes supporting search,
    pagination, and single note creation.
  - `/notes/[id]` — Dynamic route for displaying specific note details fetched
    by its unique identifier.
- **⚡ Hybrid Rendering (Server & Client Separation)**:
  - Implemented **Server-Side Rendering (SSR)** for core route entry points to
    support SEO and initial page performance.
  - Integrated **Prefetching & Hydration** via TanStack Query
    (`HydrationBoundary`), enabling instant page data availability in the
    browser.
  - Isolated interactive logic (state management, debounced search, modal
    triggers) within secure `'use client'` files (`Notes.client.tsx`,
    `NoteDetails.client.tsx`).
- **📡 Secure Global State & API Isolation**:
  - Created an isolated, multi-user safe **`TanStackProvider`** utilizing
    React's `useState` hook initialization to safeguard cache partitioning.
  - Refactored network communication to work with Axios, centralizing endpoint
    tasks within a dedicated `lib/api.ts` module.
  - Migrated build-time parameters from Vite-specific structures to standard
    environment variables using the `NEXT_PUBLIC_` runtime injection prefix.
- **🛡️ Robust Error Boundaries & Structural States**:
  - Introduced a global `app/loading.tsx` layout layer to handle non-blocking
    asynchronous UI transitions.
  - Implemented localized, client-interactive `error.tsx` boundary handlers to
    elegantly recover from component-level network and parsing failures without
    compromising core application runtime.
- **🎨 Code Hygiene & Styling**:
  - Structured clean component design isolating each entity and its respective
    style layout inside individual subdirectories.
  - Utilized **CSS Modules** for strict scope protection and enforced code
    consistency rules via Prettier formatting.
