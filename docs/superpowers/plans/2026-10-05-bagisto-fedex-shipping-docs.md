# Bagisto FedEx Shipping Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full documentation site section (16 docs pages, landing page, pricing, logos, nav wiring) for the paid package `ashrafic/bagisto-fedex-shipping`, matching the Filament Translation Suite (FTS) paid-package style exactly.

**Architecture:** Docusaurus 3.10 site (`docs.ashraficlabs.com`). New docs folder `docs/bagisto-fedex-shipping/` + landing page `src/pages/bagisto-fedex-shipping/index.tsx` + logo assets in `static/img/bagisto-fedex-shipping/` + screenshots dir in `static/bagisto-fedex-shipping/assets/screenshots/`. Payments via Polar (checkout link with `product_id` query param). Logo: two-stage pipeline — text SVG → browser-measured → `svg-text-to-path/convert.py` → path-based SVG → PNG via rsvg-convert.

**Tech Stack:** Docusaurus 3.10 / React 19 / TypeScript; Python + fonttools (logo conversion); headless Chrome (measurement); rsvg-convert (PNG).

**Verification:** `npm run build` must pass — site has `onBrokenLinks: 'throw'` and `onBrokenMarkdownLinks: 'throw'`, so a green build proves all internal links/assets resolve. `npm run typecheck` for TSX.

**Package source of truth:** `~/Development/www/bagisto-fedex-shipping/` (v0.2.1). Read the relevant source file before writing each docs page.

**Style references (in-project only):** `docs/filament-translation-suite/*` (paid-package tone/structure), `src/pages/filament-translation-suite/index.tsx`, `docs/filament-translation-suite/pricing.mdx` (pricing layout classes).

---

### Task 1: Logo — text-based SVGs

**Files:**
- Create: `static/img/bagisto-fedex-shipping/text-logo/title.svg`
- Create: `static/img/bagisto-fedex-shipping/text-logo/title-light.svg`

- [ ] **Step 1: Create `text-logo/title.svg`** (light background — body text `#171717`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 32">
  <defs>
    <style>
      .t { font-family: Optima, Palatino, 'Book Antiqua', Georgia, serif; font-size: 26px; font-weight: 600; letter-spacing: -0.5px; }
      .g { fill: #b88b4a; }
      .d { fill: #171717; }
    </style>
  </defs>
  <text y="24"><tspan class="g t">Bagisto</tspan><tspan class="d t" dx="6">FedEx Shipping</tspan></text>
</svg>
```

- [ ] **Step 2: Create `text-logo/title-light.svg`** (dark background — body text `#f5f1e8`; identical except `.d { fill: #f5f1e8; }`)
- [ ] **Step 3: Commit** — `git add static/img/bagisto-fedex-shipping && git commit -m "feat(bfs): add text-based logo SVGs"`

---

### Task 2: Logo — browser measurement (headless Chrome)

**Files:**
- Modify: `~/Development/www/svg-text-to-path/measure.html` (temporary; new text)

- [ ] **Step 1: Extract Optima Bold** (prereq of convert.py):

```bash
python3 -c "
from fontTools.ttLib import TTCollection
ttc = TTCollection('/System/Library/Fonts/Optima.ttc')
ttc[1].save('/tmp/Optima_Bold.ttf')
print('Done')
"
```

Expected: `Done`

- [ ] **Step 2: Edit `measure.html`** — replace both `<text>` blocks with:

```html
<text y="24" font-family="Optima, Palatino, serif" font-size="26" font-weight="600" letter-spacing="-0.5">
  <tspan fill="#b88b4a">Bagisto</tspan><tspan fill="#171717" dx="6">FedEx Shipping</tspan>
</text>
```

- [ ] **Step 3: Measure via headless Chrome** (auto-captures `getStartPositionOfChar` output):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --virtual-time-budget=3000 --dump-dom \
  "file:///Users/ashrafulislam/Development/www/svg-text-to-path/measure.html" \
  | grep -A 30 'out1'
```

Expected: `Total chars: 21`, `Extent: <n>`, and per-char lines `Char i: start=<x.xx> …`.
- [ ] **Step 4: Record** the 21 start values + Extent (viewBox width = ceil(Extent) + ~3px).

---

### Task 3: Logo — path-based conversion

**Files:**
- Modify: `~/Development/www/svg-text-to-path/convert.py` (append one `convert(...)` call)
- Copy into: `~/Development/www/svg-text-to-path/public/bagisto-fedex-shipping/text-logo/` (both text SVGs from Task 1)

- [ ] **Step 1:** `mkdir -p ~/Development/www/svg-text-to-path/public/bagisto-fedex-shipping/text-logo` and copy the two text SVGs in.
- [ ] **Step 2: Append to `convert.py`:**

```python
# === Bagisto FedEx Shipping ===
convert(
    "bagisto-fedex-shipping", "Bagisto", "FedEx Shipping",
    [<21 measured start values from Task 2>],
    <viewBox width from Task 2>
)
```

(Tool regenerates `title.svg`/`title-light.svg` at `public/bagisto-fedex-shipping/` with `<path>` outlines, no font dependency; per-char fill split = first 7 chars brass.)
- [ ] **Step 3: Run:** `python3 ~/Development/www/svg-text-to-path/convert.py` — expect printed line for `bagisto-fedex-shipping`.
- [ ] **Step 4: Verify in `preview.html`** (headless Chrome `--dump-dom` or open in browser): path overlay aligns with text original; no clipping at right edge.
- [ ] **Step 5: Copy back to site:** path-based `title.svg` + `title-light.svg` → `static/img/bagisto-fedex-shipping/` (root level, alongside `text-logo/`).
- [ ] **Step 6: Commit** — `git commit -m "feat(bfs): add path-based logo SVGs"`.

---

### Task 4: Logo — PNG renders

- [ ] **Step 1:**

```bash
cd static/img/bagisto-fedex-shipping
rsvg-convert -w 1144 -h 128 title.svg -o title.png
rsvg-convert -w 1144 -h 128 title-light.svg -o title-light.png
```

(4x of the 286×32 viewBox; transparent background. Adjust `-w` to final viewBox width × 4.)
- [ ] **Step 2: Verify** PNGs non-empty, then `git commit -m "feat(bfs): add PNG logo renders"`.

---

### Task 5: Pricing data + pricing page

**Files:**
- Create: `docs/bagisto-fedex-shipping/_data.ts`
- Create: `docs/bagisto-fedex-shipping/pricing.mdx`

- [ ] **Step 1: `_data.ts`:**

```ts
export const CHECKOUT_URLS = {
  solo: 'https://buy.polar.sh/polar_cl_1pnkU4ofLICSARmkMeLmA3yvkzxNAjmwDSOb430Bqib?product_id=d4b274e2-ed82-4ffd-8a53-bee84278a30c',
  agency: 'https://buy.polar.sh/polar_cl_1pnkU4ofLICSARmkMeLmA3yvkzxNAjmwDSOb430Bqib?product_id=b2d2169f-1ae7-4493-abc6-e0b463d9d7dd',
};
```

- [ ] **Step 2: `pricing.mdx`** — clone structure of `docs/filament-translation-suite/pricing.mdx` (imports `CHECKOUT_URLS`, `ShieldCheck, MailCheck, Infinity` from lucide-react; `pricing-grid`/`pricing-tier`/`pricing-badge`/`pricing-price`/`pricing-features`/`pricing-cta` classes; `payment-footer` with trust items + `payment-cards` + legal links + `pricing-note` + `What's Included` + `License Terms` + FAQ + `How to Buy` + closing `pricing-quote`). **Differences from FTS:**
  - Solo **$49** / Agency **$139** — `<span class="period"> one-time</span>`
  - Badge lines: "SOLO" / "AGENCY"; CTA labels "Buy Solo" / "Buy Agency" (`pkg-btn pkg-btn-alt` / `pkg-btn pkg-btn-brand`)
  - Tier features: Solo — 1 project · Unlimited locales & products · All 11 FedEx service types · Labels, tracking & address validation · Live rates with rate caching · Email support. Agency — Unlimited projects · everything else same · **Priority** email support.
  - **No renewal block** — replace `pricing-note` renewal text with: "One payment. Yours forever. Every future update included — no subscriptions, no renewals, no surprises."
  - "Powered by" → **Polar** (text + polar.sh logo; no LemonSqueezy badge img). Keep payment-cards row (visa, mastercard, amex, discover, apple-pay, google-pay — drop cash-app/alipay/wechat-pay).
  - Legal links unchanged (packages.ashraficlabs.com/terms + /refunds).
  - What's Included: lifetime access & updates, all features, all service types, unlimited locales/products/orders, unlimited users; "You only pay FedEx for your own shipping."
  - License Terms: project-based (Solo 1 project / Agency unlimited; local, staging, CI unlimited); **Lifetime, no renewals** section replacing "Lifetime Access, Update-Renewable"; Source Code clause (compiled PHP source, modify for licensed projects, no redistribution).
  - FAQ: What counts as a "project"? · Can I upgrade Solo→Agency? (contact hello@ashraficlabs.com) · Do I need a FedEx shipping account? (no for sandbox; yes for production) · Do I pay FedEx API costs? (FedEx rate APIs are free; you pay for shipping/labels) · What does "lifetime" mean?
  - How to Buy: choose tier → pay on Polar → license key delivered → composer registry install (link `/bagisto-fedex-shipping/installation#composer-registry`).
  - Closing quote: `<em>Ship with confidence. Priced once. Yours forever.</em>`
- [ ] **Step 3: Commit** — `git commit -m "feat(bfs): pricing page with Polar checkout"`.

---

### Task 6: Getting Started page

**Files:**
- Create: `docs/bagisto-fedex-shipping/getting-started.md`

- [ ] **Step 1: Write page.** Front-matter `title: Getting Started`. Content: intro sentence ("Live FedEx rates at checkout, shipping labels, tracking…built on the modern FedEx REST API"); `:::tip Before You Begin` block linking installation + configuration; Workflow 3 steps (Configure → Quote at checkout → Fulfill with labels & tracking); sections: **Live Rates at Checkout** (residential flag, delivery estimates, negotiated rates), **Admin Fulfillment** (label create/download/void, tracking refresh, FedEx Shipments page), **Developer Tools** (`fedex:test`, `fedex:validate-address`, sandbox/production toggle); **Next Steps** list (installation, configuration, features, pricing — full `/bagisto-fedex-shipping/...` paths). Cross-check claims against package `README.md` + `src/Carriers/Fedex.php` (never-breaks-checkout: carrier hides itself + logs on failure).
- [ ] **Step 2: Commit.**

---

### Task 7: Installation page

**Files:**
- Create: `docs/bagisto-fedex-shipping/installation.md`

- [ ] **Step 1: Write page.** Structure mirrors `docs/filament-translation-suite/installation.md`:
  - Requirements table: PHP `^8.3` · Laravel `^11.0 &#124; ^12.0` · Bagisto `2.2+` · FedEx test keys (free, no card).
  - **Composer Registry** section (anchor `### Composer Registry`): add repo `composer config repositories.ashrafic composer https://packages.ashraficlabs.com/composer`; auth `composer config --auth http-basic.packages.ashraficlabs.com "YOUR_EMAIL_ADDRESS" "YOUR_LICENSE_KEY"` (license key from email / [License Portal](https://packages.ashraficlabs.com/portal), link to pricing); install `composer require ashrafic/bagisto-fedex-shipping`.
  - Finish: `php artisan migrate` (creates `fedex_shipments`) + `php artisan optimize:clear`. Note: package auto-discovery registers provider — no manual config edits.
  - **Get FedEx credentials** section: developer portal steps (register free → organization → project with **Rates and Transit Times**, **Basic Integrated Visibility** (Track), **Ship**, **Address Validation** APIs → copy API Key + Secret Key shown once). Sandbox works immediately.
  - **Verify** section: `php artisan fedex:test --postcode=10001` sample output table.
  - **Next Steps** + **Support** footer (commercial product, pricing link, license portal).
- [ ] **Step 2: Commit.**

---

### Task 8: Configuration page

**Files:**
- Create: `docs/bagisto-fedex-shipping/configuration.md`

- [ ] **Step 1: Write page** from `src/Config/system.php` + `src/Config/carriers.php`:
  - Location: Admin → **Configure → Sales → Shipping Methods → FedEx Shipping** (channel & locale aware where applicable).
  - Field reference table (Field / Type / Default / Notes): Title, Description, Calculate Tax (default on), Status, Mode (sandbox/production), API Key, Secret Key, FedEx Account Number (optional in sandbox, required in production — unlocks account rates + labels), Allowed Services (multiselect of the 11), Weight Unit (LB/KG — converted from store unit), Packaging Type (8 options incl. YOUR_PACKAGING default), Residential Delivery (default true), Show Delivery Estimates (default true), Handling Fee Type (fixed/percent), Handling Fee (0), Rate Cache TTL (15 min, 0 disables), Debug Logging.
  - Advanced defaults from `carriers.php`: `max_package_weight` 150 lb, `label_disk` `private`.
  - **Going Live checklist** (numbered): associate shipping account with developer org + request production access (FedEx review may take 1–2 days) → create production keys → Mode=Production + production key/secret + Account Number → place real test order (rates, label, tracking).
  - :::warning Shipping Origin must be configured (Configure → Sales → Shipping Settings) — FedEx rejects origin-less requests.
- [ ] **Step 2: Commit.**

---

### Task 9: Features pages (7 files)

**Files:**
- Create: `docs/bagisto-fedex-shipping/features/index.md` (front-matter: `title: Features`, `sidebar_label: Overview`, `sidebar_position: 1`)
- Create: `docs/bagisto-fedex-shipping/features/live-rates.md`
- Create: `docs/bagisto-fedex-shipping/features/package-packing.md`
- Create: `docs/bagisto-fedex-shipping/features/shipping-labels.md`
- Create: `docs/bagisto-fedex-shipping/features/tracking.md`
- Create: `docs/bagisto-fedex-shipping/features/address-validation.md`
- Create: `docs/bagisto-fedex-shipping/features/admin-shipments.md`

- [ ] **Step 1: `index.md`** — short framing ("your checkout quotes real FedEx prices; your admin ships and tracks — one package"), then a linked list of the 6 feature pages with one-line summaries. Cross-link pattern + tip blocks like FTS features index.
- [ ] **Step 2: `live-rates.md`** — from `src/Carriers/Fedex.php` + `src/Services/RateService.php`: quote flow (cart → ItemPacker → Rate API `/rate/v1/rates/quotes`), delivery estimates appended to method titles (toggleable), residential flag affects pricing, LIST vs ACCOUNT rate request types (account number unlocks negotiated rates; `pricedAmount()` prefers negotiated), handling fee fixed/percent added to every rate, fingerprinted rate caching (cache key covers packages, destination, origin, mode, services, fees, account, packaging, unit, residential; empty responses never cached; TTL 0 disables), currency note (quote currency vs base currency warning log), never-breaks-checkout (any failure → carrier hidden + error logged). Only stockable products with weight > 0 are rated.
- [ ] **Step 3: `package-packing.md`** — from `src/Packing/ItemPacker.php`: whole-item weight-capped packing (default max 150 lb = FedEx retail limit), store unit → FedEx unit conversion (LBS/KGS→LB/KG, ±2.2046226218), items heavier than max ship one-per-package, dimensions passed through when product has L×W×H (dimensional-weight pricing), `PackerInterface` binding is replaceable (DI).
- [ ] **Step 4: `shipping-labels.md`** — from `src/Services/LabelService.php` + controller: create from order screen (service picker = allowed services), Ship API `/ship/v1/shipments`, PDF (PAPER_4X6, COMMON2D) stored on `private` disk at `fedex-labels/<tracking>.pdf`, tracking number written to the Bagisto shipment, label cost + currency captured, download (streamed) + void (DELETE_ALL_PACKAGES, status VOIDED), **both shipper and customer phone numbers required** (Ship API rejects otherwise; store phone set in Shipping Settings → Origin), raw response stored minus documents.
- [ ] **Step 5: `tracking.md`** — from `src/Services/TrackingService.php`: Track API `/track/v1/tracking` with detailed scans, normalized result (status, statusCode, estimatedDelivery, events newest-first with date/time/location/description), `tracked_at` recorded, refresh button per label.
- [ ] **Step 6: `address-validation.md`** — from `src/Services/AddressValidationService.php`: Address Validation API `/address/v1/addresses/resolve`, returns classification + resolved address + customer messages; usage via `fedex:validate-address` (link reference/commands) or `AddressValidationService::validate()` programmatically.
- [ ] **Step 7: `admin-shipments.md`** — from `src/Config/menu.php`, `acl.php`, `Routes/admin-routes.php`, views: "Sales → FedEx Shipments" page (paginated labels with status, cost, actions), order-screen "Create FedEx Label" button (via `OrderViewButton` listener), ACL key `sales.fedex-shipping` covering all 6 routes, works with Bagisto role permissions.
- [ ] **Step 8: Commit** — `git commit -m "feat(bfs): feature documentation pages"`.

---

### Task 10: Reference pages (5 files)

**Files:**
- Create: `docs/bagisto-fedex-shipping/reference/commands.md`
- Create: `docs/bagisto-fedex-shipping/reference/service-codes.md`
- Create: `docs/bagisto-fedex-shipping/reference/config-reference.md`
- Create: `docs/bagisto-fedex-shipping/reference/database.md`
- Create: `docs/bagisto-fedex-shipping/reference/troubleshooting.md`

- [ ] **Step 1: `commands.md`** — `fedex:test {--postcode=10001} {--country=US}` (smoke-test; prints Mode line, rate table Service/Code/Amount; warns when no services returned — check Allowed Services; origin fallback note) · `fedex:validate-address {--street} {--city} {--state} {--zip} {--country=US}` (prints Classification, resolved-value table, messages). Example invocations from README.
- [ ] **Step 2: `service-codes.md`** — 11-row table (code → label): FEDEX_GROUND, FEDEX_HOME_DELIVERY, FEDEX_EXPRESS_SAVER, FEDEX_2_DAY, FEDEX_2_DAY_AM, PRIORITY_OVERNIGHT, STANDARD_OVERNIGHT, FIRST_OVERNIGHT, FEDEX_INTERNATIONAL_PRIORITY, FEDEX_INTERNATIONAL_ECONOMY, FEDEX_INTERNATIONAL_FIRST. Note: services outside Allowed Services are filtered out of checkout + label picker.
- [ ] **Step 3: `config-reference.md`** — full `carriers.php` defaults block as PHP code fence + admin-field table (duplicating key notes from configuration.md is fine; this is the exhaustive list incl. `max_package_weight`, `label_disk`, ConfigResolver precedence: Bagisto admin value → config file default).
- [ ] **Step 4: `database.md`** — `fedex_shipments` column table (id, order_id nullable+indexed, shipment_id, tracking_number indexed, service_code, status, status_code, estimated_delivery, label_path, label_cost decimal 12,4, label_currency char(3), voided_at, tracked_at, raw longText, timestamps) + model fillable/casts notes + label storage path pattern.
- [ ] **Step 5: `troubleshooting.md`** — symptom→cause table from README (no options at checkout; `fedex:test` "no services"; HTTP 503 sandbox outages; HTTP 422 invalid address; label account errors) + sandbox notes (virtualizer, VIRTUAL.RESPONSE alerts, unrealistic prices) + Debug Logging tip.
- [ ] **Step 6: Commit** — `git commit -m "feat(bfs): reference documentation pages"`.

---

### Task 11: Sidebar

**Files:**
- Modify: `sidebars.ts`

- [ ] **Step 1: Add `bfs` sidebar** after `fab`:

```ts
bfs: [
  'bagisto-fedex-shipping/getting-started',
  'bagisto-fedex-shipping/installation',
  'bagisto-fedex-shipping/configuration',
  {
    type: 'category',
    label: 'Features',
    collapsed: false,
    items: [{ type: 'autogenerated', dirName: 'bagisto-fedex-shipping/features' }],
  },
  'bagisto-fedex-shipping/pricing',
  {
    type: 'category',
    label: 'Reference',
    collapsed: false,
    items: [
      'bagisto-fedex-shipping/reference/commands',
      'bagisto-fedex-shipping/reference/service-codes',
      'bagisto-fedex-shipping/reference/config-reference',
      'bagisto-fedex-shipping/reference/database',
      'bagisto-fedex-shipping/reference/troubleshooting',
    ],
  },
],
```

- [ ] **Step 2: Commit.**

---

### Task 12: Landing page + HeroSlider prop + screenshots folder

**Files:**
- Modify: `src/components/HeroSlider.tsx`
- Create: `src/pages/bagisto-fedex-shipping/index.tsx`
- Create: `static/bagisto-fedex-shipping/assets/screenshots/` (+ `.gitkeep`)

- [ ] **Step 1: HeroSlider** — add optional prop `slides?: {src: string; alt: string}[]` with default = current FTS hardcoded array; render `slides.length`-driven (existing state/logic unchanged); add `onError` on `<img>` that drops failed slides from the rendered list (missing screenshots degrade gracefully).
- [ ] **Step 2: Landing page** — clone FTS page shape: `pkg-hero` (title lines "Bagisto" / "FedEx Shipping", tagline "Real Rates. Real Labels. Real Tracking.", sub "Buy once. Own forever. No subscriptions.", desc paragraph, 3 action buttons: Get Started / Explore Features / View Pricing), `pkg-hero-slider` with `<HeroSlider slides={[…6 bfs screenshot paths]} />`, feature grid of 9 cards (lucide icons): Live FedEx Rates (DollarSign) · Delivery Estimates (CalendarClock) · Smart Package Packing (Boxes) · Shipping Labels (Tags/Label) · Tracking (PackageSearch/Radar) · Address Validation (MapPinCheck) · Rate Caching (DatabaseZap/Timer) · Admin Shipments Page (LayoutList) · Never Breaks Checkout (ShieldCheck) — each with 1–2 sentence desc from README facts; `pkg-features-banner` linking all features with extra names (handling fees, negotiated rates, sandbox/production, artisan commands).
- [ ] **Step 3: Screenshots folder** — `mkdir -p static/bagisto-fedex-shipping/assets/screenshots && touch .gitkeep`. Expected user files: `checkout-rates.png`, `admin-shipments.png`, `label-create.png`, `tracking.png`, `config-page.png`, `address-validation.png`.
- [ ] **Step 4: Verify** `npm run typecheck`; **Commit.**

---

### Task 13: Navbar, home card, search context

**Files:**
- Modify: `src/theme/Navbar/Logo/index.tsx`
- Modify: `src/pages/index.tsx`
- Modify: `docusaurus.config.ts`

- [ ] **Step 1: Navbar** — add `isBfs = pathname.startsWith('/bagisto-fedex-shipping')` + case returning brand layout (icon-logo + ThemedImage light `/img/bagisto-fedex-shipping/title.svg` dark `title-light.svg`, `style={{height: 28}}`).
- [ ] **Step 2: Home page** — add `BfsTitleSvg` ThemedImage component + 4th `pkg-card` linking `/bagisto-fedex-shipping`, desc: "Live FedEx rates at checkout, shipping labels, tracking and address validation for Bagisto 2.x — built on the modern FedEx REST API. Buy once, own forever."; keep coming-soon block.
- [ ] **Step 3: Search** — add `'/bagisto-fedex-shipping'` to `searchContextByPaths`.
- [ ] **Step 4: Commit.**

---

### Task 14: Build verification

- [ ] **Step 1:** `npm run typecheck` — expect no errors.
- [ ] **Step 2:** `npm run build` — expect success; site throws on broken links, so this validates every docs link + asset path.
- [ ] **Step 3:** `npm run serve` spot-check (visual): home card, navbar logo on `/bagisto-fedex-shipping/getting-started`, pricing page grid, sidebar tree.
- [ ] **Step 4:** Fix anything found; final `git commit` if needed.

---

## Self-Review

- **Spec coverage:** logo 2-stage+PNG (Tasks 1–4) ✓ pricing/Polar/`_data.ts` (5) ✓ all 16 docs pages (6–10) ✓ sidebar (11) ✓ landing+slider+screenshots (12) ✓ navbar/home/search (13) ✓ build gate (14) ✓. Out-of-scope items respected (no marketplace jpg, no fake screenshots).
- **Placeholder scan:** Task 3 converter call requires measured values from Task 2 (runtime data, produced by executing Task 2 in order — acceptable; step says exactly where values come from). Task 9/10 pages specify exact source files + fact lists rather than final prose — the writing task itself is the deliverable.
- **Type consistency:** `slides` prop shape `{src, alt}[]` matches HeroSlider's internal usage; `CHECKOUT_URLS.solo/.agency` matches pricing.mdx usage; sidebar ids match file names created in Tasks 5–10.
