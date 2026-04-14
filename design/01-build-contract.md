# HTML Slides — Build Contract

## Goal

Build a Vue slide-deck app that lets the user create per-project demo slides as Vue components, auto-discovered from the folder structure, navigable via sidebar and keyboard, and deployable to GitHub Pages.

## User Stories

As a user, I can:

1. Create a new project by adding a folder under `src/projects/` — no config needed.
2. Add slides by creating `*.slide.vue` files inside a project folder — they appear automatically in the nav sorted alphabetically by filename.
3. Navigate between slides within a project using left/right arrow keys. Navigation never crosses project boundaries. A slide component can call `event.stopPropagation()` on keydown to override arrow key behavior for its own interactions.
4. Toggle the left sidebar on/off. When hidden, the current slide fills the entire viewport.
5. Share a direct URL to any slide (e.g. `#/project-a/02-demo`).
6. `pnpm build` and deploy the output as a static site to GitHub Pages.

## Folder Structure

```
src/
  projects/
    <project-name>/
      <NN-name>.slide.vue   # each file = one slide
  App.vue                   # shell: sidebar + router-view
  main.ts                   # glob discovery, route generation
  style.css                 # tailwind imports + user styles
```

**Naming convention (suggested, not enforced):**
- Projects: `<date>-project-name/` where date is a compact encoding: one char for year + MMDD. Year char: `a`=2026, `b`=2027, …, `z`=2051, `A`=2052, …, `Z`=2077. Example: `a0414-my-demo/` = 2026-04-14.
- Slides: `01-intro.slide.vue`, `02-feature.slide.vue`, etc.

A `pnpm new <project-name>` script scaffolds a new project folder using today's date prefix and an initial `01-intro.slide.vue`. Errors if the current year is outside the encodable range.

## Technical Decisions

- **Auto-discovery:** `import.meta.glob('./projects/**/*.slide.vue')` builds the route table at startup. Folder name = project, filename = slide name, alphabetical order = slide order.
- **Routing:** `vue-router`, hash mode (`createWebHashHistory`). Route pattern: `/:project/:slide`. Root `/` redirects to first project's first slide.
- **Sidebar:** Lists projects with their slides. Toggle with `Escape` key. State stored in a Pinia store (shared with keyboard nav).
- **Keyboard navigation:** Left/right arrows move prev/next within current project. No wrap-around, no cross-project navigation. The listener is on the app shell; slide components can intercept arrow keys via `@keydown.stop` to handle their own interactions.
- **Slide layout:** Each `*.slide.vue` component is rendered inside a container that fills the available viewport area (100vw × 100vh when sidebar is hidden).
- **TailwindCSS:** Installed and available globally. Used freely by the user inside slide components.
- **Build:** `vite build` with `base: './'` for relative asset paths. Deployable to GH Pages via any standard method (gh-pages, GitHub Actions, manual).

## Not Doing

- No transitions or animations between slides
- No presenter mode, speaker notes, or slide counter
- No markdown/MDX rendering
- No theming system
- No nested folders within a project (only flat `*.slide.vue` files per project folder)

## Definition of Done

- `pnpm dev` starts the app, sidebar shows discovered projects and slides
- Adding a new `*.slide.vue` file appears automatically (Vite HMR)
- Arrow keys navigate within a project
- `Escape` toggles sidebar
- URL reflects current project/slide and can be used as a direct link
- `pnpm build` produces a working static site with hash routing
- `pnpm new-project my-demo` creates `src/projects/a0414-my-demo/01-intro.slide.vue`
