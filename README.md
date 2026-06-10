# Ashrafic Labs — Documentation

Central documentation hub for [Ashrafic Labs](https://ashraficlabs.com) open-source and premium packages, built with [Docusaurus](https://docusaurus.io).

## Local Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Project Structure

```
ashrafic-docs/
├── docs/                        # Package documentation (one folder per package)
│   └── filament-translation-suite/
│       ├── getting-started.md
│       ├── installation.md
│       ├── configuration.md
│       ├── pricing.md
│       └── features/
├── src/
│   ├── pages/index.tsx           # Root landing page
│   ├── css/custom.css            # Brand styles
│   └── theme/                    # Swizzled components (per-package nav)
├── static/                       # Static assets (screenshots, logos, CNAME)
├── docusaurus.config.ts          # Site config
├── sidebars.ts                   # Sidebar definitions
└── .github/workflows/deploy.yml  # GitHub Pages deployment
```

## Adding a New Package

1. Create `docs/new-package/` with its markdown files
2. Add sidebar entry in `sidebars.ts`
3. Add nav items in `src/theme/Navbar/Content/index.tsx` (swizzled)
4. Add a card in `src/pages/index.tsx`

## Deployment

Push a version tag to deploy:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Deploys to [docs.ashraficlabs.com](https://docs.ashraficlabs.com) via GitHub Pages.

## Contributing

Click "Edit this page" on any doc to submit changes via the `dev` branch. PRs are reviewed before merging.
