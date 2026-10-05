# Bagisto FedEx Shipping — Documentation Design

**Date:** 2026-10-05
**Status:** Approved (chat design review)

## Goal

Add full documentation for the new paid package **Bagisto FedEx Shipping**
(`ashrafic/bagisto-fedex-shipping`, source: `~/Development/www/bagisto-fedex-shipping`)
to the Docusaurus site, matching the established style of the existing paid
package docs (Filament Translation Suite) exactly.

## Key Facts

- **Brand:** "Bagisto FedEx Shipping" — URL prefix `/bagisto-fedex-shipping`
- **Distribution:** paid, private composer registry
  (`packages.ashraficlabs.com/composer`) + license key (same 3-step flow as FTS)
- **Payments:** **Polar** (not LemonSqueezy). One checkout link, two products:
  - Link: `https://buy.polar.sh/polar_cl_1pnkU4ofLICSARmkMeLmA3yvkzxNAjmwDSOb430Bqib`
  - Solo `?product_id=d4b274e2-ed82-4ffd-8a53-bee84278a30c` — **$49 one-time**
  - Agency `?product_id=b2d2169f-1ae7-4493-abc6-e0b463d9d7dd` — **$139 one-time**
  - **No renewals. Lifetime.** (Verified: Polar checkout links accept
    `product_id` query param to preselect a product.)
- **Package facts** (from source): PHP ^8.3, Laravel ^11|^12, Bagisto 2.2+;
  live rates (Rate v1), labels (Ship v1), tracking (Track v1), address
  validation (Address v1); OAuth2 client-credentials with cached tokens;
  sandbox/production modes; weight-capped package packing with unit conversion;
  handling fee (fixed/percent); fingerprinted rate caching; `fedex_shipments`
  table; admin page "Sales → FedEx Shipments" + ACL; commands `fedex:test`,
  `fedex:validate-address`; 11 service codes.

## Docs Pages (`docs/bagisto-fedex-shipping/`)

| File | Content |
|---|---|
| `getting-started.md` | What it is, workflow (configure → quote → fulfill), `fedex:test` verification |
| `installation.md` | Requirements table; private-registry auth (3 steps, FTS-style); `composer require ashrafic/bagisto-fedex-shipping`; `php artisan migrate` + `optimize:clear`; what appears in admin |
| `configuration.md` | FedEx Developer Portal walkthrough (org → project → 4 APIs → keys); admin config field tables (from `src/Config/system.php`); Going-Live checklist |
| `features/index.md` | Overview + links to feature pages |
| `features/live-rates.md` | Checkout quotes, delivery estimates, residential flag, negotiated/account rates, handling fee, rate caching, never-breaks-checkout behavior |
| `features/package-packing.md` | Weight-capped splitting (150 lb default), store-unit conversion (LBS/KGS → LB/KG), dimension pass-through |
| `features/shipping-labels.md` | Create from order screen, service picker, private-disk PDF storage, download/void, cost capture, phone-number requirement |
| `features/tracking.md` | Track API refresh, status + scan events, estimated delivery |
| `features/address-validation.md` | Address Validation API + `fedex:validate-address` command |
| `features/admin-shipments.md` | "Sales → FedEx Shipments" page, routes, ACL key `sales.fedex-shipping` |
| `pricing.mdx` | Polar pricing grid (reuse FTS CSS classes): Solo $49 / Agency $139 one-time, lifetime, **no renewal note**; "Powered by Polar"; payment cards row; trust badges; license terms (project-based, lifetime updates incl.); FAQ; How to Buy (Polar → license key → registry) |
| `reference/commands.md` | `fedex:test` and `fedex:validate-address` signatures/options |
| `reference/service-codes.md` | 11 service codes table |
| `reference/config-reference.md` | All system.php fields + `carriers.php` defaults |
| `reference/database.md` | `fedex_shipments` schema table |
| `reference/troubleshooting.md` | Symptom→cause table from README |
| `_data.ts` | `export const CHECKOUT_URLS = { solo, agency }` → Polar links with `product_id` |

## Landing Page

`src/pages/bagisto-fedex-shipping/index.tsx` — same `pkg-hero` + feature grid +
banner pattern as FTS page. Hero uses **HeroSlider with a new optional `slides`
prop** (default preserves FTS behavior) plus `onError` slide-hiding so missing
screenshots degrade gracefully.

Screenshots folder (created, user drops PNGs in later):
`static/bagisto-fedex-shipping/assets/screenshots/` — expected names:
`checkout-rates.png`, `admin-shipments.png`, `label-create.png`, `tracking.png`,
`config-page.png`, `address-validation.png`.

## Logo (two-stage, matches other packages)

1. **Text SVGs** → `static/img/bagisto-fedex-shipping/text-logo/title.svg` +
   `title-light.svg`: `<text y="24">` Optima/Palatino 26px w600
   letter-spacing −0.5px; `<tspan fill="#b88b4a">Bagisto</tspan><tspan dx="6">FedEx Shipping</tspan>`,
   body fill `#171717` (light) / `#f5f1e8` (light variant).
2. **Measure** — `measure.html` in `~/Development/www/svg-text-to-path/`
   updated with new text; measured via headless Chrome.
3. **Convert** — `convert("bagisto-fedex-shipping", "Bagisto", "FedEx Shipping",
   [starts…], viewBoxW)` added to `convert.py`; Optima Bold extracted to
   `/tmp/Optima_Bold.ttf`; run script → path-based `title.svg` +
   `title-light.svg` (no font dependency).
4. **Verify** — `preview.html` overlay.
5. **Copy back** — 4 SVGs into `static/img/bagisto-fedex-shipping/`.
6. **PNG renders** — `rsvg-convert` path-based SVGs → `title.png` +
   `title-light.png` at 4x (~1200px wide, transparent bg).

## Site Wiring

- `sidebars.ts` — new `bfs` sidebar (getting-started, installation,
  configuration, Features category autogenerated, pricing, Reference category)
- `src/theme/Navbar/Logo/index.tsx` — `isBfs` case, themed logo (title.svg /
  title-light.svg)
- `src/pages/index.tsx` — 4th package card (path-based title SVG via
  ThemedImage)
- `docusaurus.config.ts` — add `/bagisto-fedex-shipping` to
  `searchContextByPaths`

## Copy Tone

Match FTS voice: "Buy once. Own forever." adapted to **lifetime, no renewals**.
Sections: What's Included, License Terms (project-based; Solo = 1 project,
Agency = unlimited; lifetime updates), FAQ (project counting, upgrade path,
FedEx API costs not marked up, why lifetime, what "lifetime" means), How to Buy
(Polar flow + license portal), closing quote line.

## Out of Scope

- `*-marketplace.jpg` store banner (user may add later)
- Actual screenshots (user provides)
- Package README changes
