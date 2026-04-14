# Vertical Slice: Core slide app

## Goal

Get the full app working end-to-end in one pass — auto-discovery, routing, sidebar, keyboard nav, project scaffolding script, and static build.

## Scope

Everything in the build contract. The app is small enough to be a single slice.

## New dependencies

- `vue-router`
- `pinia`

## User-facing behavior

- Two sample projects exist out of the box so the app isn't empty on first run
- Sidebar lists discovered projects and their slides
- `Escape` toggles sidebar; slide fills viewport when hidden
- Left/right arrow keys navigate within a project
- URL reflects current slide and works as a direct link
- `pnpm new-project <name>` scaffolds a dated project folder with a starter slide
- `pnpm build` produces a static site deployable to GitHub Pages

## Definition of done

Same as build contract — see [01-build-contract.md](01-build-contract.md#definition-of-done).
