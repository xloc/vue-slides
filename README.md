# html-slides

## Development

```bash
pnpm install
pnpm dev
```

## GitHub Pages

This repo publishes to GitHub Pages with GitHub Actions via [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml).

One-time repository setup in GitHub:

1. Open `Settings > Pages`.
2. Set `Source` to `GitHub Actions`.

After that, every push to `main` will build and deploy the site. For project Pages sites, the Vite `base` path is derived automatically from the repository name during the Actions build. Local builds continue to use `/`.
