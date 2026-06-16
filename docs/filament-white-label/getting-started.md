---
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Total panel rebranding — for you and every tenant. No code. Logo, colors, fonts, layout, CSS, footer — every tenant gets their own brand, or rebrand your own portal in a single-tenant setup. Install, add one line to your PanelProvider, done.

:::tip Before You Begin
Make sure you've completed [Installation](/filament-white-label/installation) and [Configuration](/filament-white-label/configuration) first. Once you've added `->whiteLabel()` to your PanelProvider, you're ready to brand.
:::

This guide walks you through each settings page and what every option does.

---

## Settings Pages

After installation, a **White Label** navigation item appears in your Filament panel with three sub-pages:

| Page | What You Configure |
|---|---|
| **Brand** | Name, logos (light/dark), favicon, 6 colors, font family, CSS theme, custom CSS |
| **Layout** | Navigation layout, sidebar behavior, breadcrumbs, dimensions, footer |
| **Advanced** | SPA mode, unsaved changes alerts, database notifications, font scale, density, modals, transitions |

---

## Brand Settings

![Brand Identity](/filament-white-label/assets/screenshots/brand-identity.png)

### Brand Identity

Configure your logo, brand name, and favicon:

- **Brand Name** — Displayed in the sidebar header, browser tab, and branded login page. Falls back to your `APP_NAME` env value.
- **Logo (Light)** — Primary logo for light mode. Upload via the file picker — supports PNG, JPEG, SVG, WebP (max 2MB).
- **Logo (Dark)** — Logo for dark mode. Falls back to the light logo if not set.
- **Logo Height** — CSS height for the logo (e.g. `'2.5rem'`). Controls vertical sizing.
- **Favicon** — Browser tab icon. Square crop suggested. Supports PNG, ICO, SVG (max 512KB).

---

## Colors

![Colors](/filament-white-label/assets/screenshots/colors.png)

Six color roles control every element of your panel:

| Role | Affects |
|---|---|
| **Primary** | Buttons, links, active states, badges, toggles |
| **Secondary** | Inactive buttons, muted text, subtle backgrounds |
| **Danger** | Delete buttons, error states, destructive actions |
| **Warning** | Warning banners, caution states |
| **Success** | Save buttons, success messages, confirmation states |
| **Info** | Info alerts, helper text, informational badges |

Each color offers two selection modes:

- **Palette Preset** — Select from every Filament color palette (Zinc, Slate, Emerald, Amber, Blue...) with a live hex preview of the base shade. This maps to Filament's full 50–950 shade range.
- **Custom Hex** — Enter any hex color for complete control.

---

## Typography & Styling

![Typography, Styling & Custom CSS](/filament-white-label/assets/screenshots/typography-style-custom-css.png)

### Typography

Choose from **49 Google Fonts** (Inter, Roboto, Poppins, JetBrains Mono, Source Serif 4...) loaded via CDN. The font selector is searchable. Selecting `Inter` skips the CDN hit — Inter is bundled with Filament.

### CSS Theme

Four controls shape the visual feel of the panel:

| Setting | Options |
|---|---|
| **Border Radius** | `default`, `none`, `small`, `medium`, `large`, `pill` — applies to buttons, cards, inputs, modals, dropdowns |
| **Input Border Radius** | Inherit from above, or set independently for form inputs |
| **Badge Shape** | `default`, `sharp`, `rounded`, `pill` — badge corner rounding |
| **Shadow Intensity** | `default`, `none`, `subtle`, `pronounced` — card and dropdown depth |

### Custom CSS

Arbitrary CSS injected into the `<head>`. The textarea supports up to 50KB of CSS and is sanitized for XSS (script tags stripped, `javascript:` URLs blocked). Disable globally via `security.disable_custom_css` in config.

---

## Layout Settings

![Layout — Navigation, Sidebar & Display](/filament-white-label/assets/screenshots/layout-nav-sidebar-display.png)

### Navigation

| Setting | Description |
|---|---|
| **Top Bar** | Show the top bar with user menu and notifications |
| **Top Navigation** | Move navigation from sidebar to the top bar. Disables sidebar settings when enabled. |

### Sidebar

| Setting | Description |
|---|---|
| **Collapsible Sidebar** | Collapse sidebar to icons only. Users expand on hover. |
| **Fully Collapsible Sidebar** | Hide sidebar completely. A toggle button shows in the top bar. |
| **Collapsible Navigation Groups** | Allow navigation groups to expand and collapse. |

Collapsible and Fully Collapsible are mutually exclusive — enabling one disables the other. Both are disabled when Top Navigation is active.

### Display

| Setting | Description |
|---|---|
| **Breadcrumbs** | Show breadcrumb navigation trail at the top of pages |

---

## Dimensions & Footer

![Dimensions & Footer](/filament-white-label/assets/screenshots/dimension-footer.png)

### Dimensions

| Setting | Options |
|---|---|
| **Content Width** | Default, `1024px` (Narrow), `1280px`, Full Width |
| **Sidebar Width** | Default (320px), `260px`, `300px`, `340px` |
| **Page Heading Size** | `default`, `small` (1.25rem), `large` (2rem) |
| **Nav Item Spacing** | `default`, `compact`, `spacious` — vertical padding of sidebar items |

### Footer

| Setting | Description |
|---|---|
| **Footer Text** | Single line of text displayed at the bottom of every page (e.g. `'ACME Admin Portal'`) |
| **Footer Links** | A repeater of label + URL pairs. Add as many links as needed. Each link requires a label and a valid URL. |

---

## Advanced Settings

![Advanced](/filament-white-label/assets/screenshots/advanced.png)

### Behavior

| Setting | Description |
|---|---|
| **Unsaved Changes Alerts** | Warn users before leaving pages with unsaved form data |
| **SPA Mode** | Single-page application mode — faster page transitions without full reloads |

### Notifications

| Setting | Description |
|---|---|
| **Database Notifications** | Enable the in-app notification bell in the top bar |
| **Notification Polling Interval** | How often to check for new notifications (`10s`, `30s`, `60s`, `2m`, `5m`). Only visible when database notifications are enabled. |

### Density & Styling

| Setting | Options |
|---|---|
| **Font Scale** | `90%` (Compact) to `120%` (Extra Large) — accessibility-friendly global text sizing |
| **Form Density** | `default`, `compact`, `spacious` — form section and field padding |
| **Table Row Density** | `default`, `compact`, `spacious` — table row vertical padding |
| **Modal Size** | `default`, `small` (480px), `medium` (640px), `large` (800px), `extra-large` (1024px) |
| **Transition Speed** | `default`, `none`, `fast` (0.1s), `slow` (0.3s) — CSS transition duration for buttons, dropdowns, modals, and sidebar |

---

## Branded Login

Add branded login to your panel with a single class swap:

```php
use FilamentWhiteLabel\Pages\Auth\BrandedLogin as BrandedLoginPage;

$panel->login(BrandedLoginPage::class);
```

The login page automatically renders the tenant's logo, brand name, and colors. All native Filament auth features are preserved — password reset, MFA, social login.

---

## How It Works

Settings are stored in a single `metadata` JSON column per tenant + panel combination. Add a new setting in a future release and there are no migrations. Resolution flows like this:

```
Request arrives
  → Panel::whiteLabel() applies closures
    → Check tenant
      ├─ Has tenant → query per-tenant settings → cache
      └─ No tenant → query global settings → config defaults
    → Each closure: DB value → config default
```

See [Resolution Flow](/filament-white-label/reference/resolution-flow) for the full architecture.

---

## Next Steps

- [Install the package](/filament-white-label/installation)
- [Full configuration reference](/filament-white-label/configuration)
- [Explore all features](/filament-white-label/features)
- [Integration patterns](/filament-white-label/features/integration-patterns)
