---
title: Brand Settings
sidebar_position: 2
---


The Brand settings page controls everything visual — your tenant's identity, color system, typography, and CSS theme. Everything that makes a panel feel like a brand.

![Brand Identity](/filament-white-label/assets/screenshots/brand-identity.png)

---

## Brand Identity

### Brand Name

The display name for the tenant's panel. Shown in:
- Sidebar header
- Browser tab title
- Branded login page

Falls back to `APP_NAME` from your `.env` if not set.

```php
// Config default
'defaults' => [
    'brand_name' => env('APP_NAME', 'Filament'),
],
```

### Logo (Light)

Primary logo for light mode. Upload via the file picker:

| Attribute | Value |
|---|---|
| **Accepted formats** | PNG, JPEG, SVG, WebP |
| **Max size** | 2MB |
| **Storage path** | `brand/{tenant_type}-{tenant_id}/logos/` |

### Logo (Dark)

Logo variant for dark mode. Falls back to the light logo if not set. Same validation rules as light logo.

### Logo Height

CSS height for the logo image. Controls vertical sizing without affecting aspect ratio:

```bash
'2.5rem'   # Filament default
'3rem'     # Taller
'2rem'     # Shorter
```

### Favicon

Browser tab icon. Best uploaded as a square image:

| Attribute | Value |
|---|---|
| **Accepted formats** | PNG, ICO, SVG |
| **Max size** | 512KB |
| **Aspect ratio** | 1:1 crop suggested |
| **Storage path** | `brand/{tenant_type}-{tenant_id}/favicons/` |

---

## Colors

![Colors](/filament-white-label/assets/screenshots/colors.png)

Six color roles control every visual element in the panel. Each role maps to Filament's color system.

| Role | Affects |
|---|---|
| **Primary** | Buttons, links, active states, badges, toggles, focus rings |
| **Secondary** | Inactive buttons, muted text, subtle backgrounds |
| **Danger** | Delete buttons, error states, destructive action confirmations |
| **Warning** | Warning banners, caution states, pending indicators |
| **Success** | Save buttons, success messages, confirmation states |
| **Info** | Info alerts, helper text, informational badges |

### Two Selection Modes

Each color offers both a palette preset and a custom hex picker:

**Palette Preset** — Select from every Filament color palette dynamically:

```
Slate → #64748b
Gray → #6b7280
Zinc → #71717a
Neutral → #737373
Stone → #78716c
Red → #ef4444
Orange → #f97316
Amber → #f59e0b
Yellow → #eab308
Lime → #84cc16
Green → #22c55e
Emerald → #10b981
Teal → #14b8a7
Cyan → #06b6d4
Sky → #0ea5e9
Blue → #3b82f6
Indigo → #6366f1
Violet → #8b5cf6
Purple → #a855f7
Fuchsia → #d946ef
Pink → #ec4899
Rose → #f43f5e
```

Each preset shows the base shade (500) hex value with a live preview. The palette maps to Filament's full 50–950 range for proper light/dark variations.

**Custom Hex** — Enter any hex color (`#1a56db`, `#ff6b35`, etc.) for complete control.

:::tip Palette vs. Custom
Palette presets use Filament's built-in color generation for consistent light/dark variants. Custom hex values use the entered color as the 500 shade and generate the rest algorithmically. For best results with custom hex, choose a color close to a standard palette shade.
:::

---

## Typography

![Typography & Styling](/filament-white-label/assets/screenshots/typography-style-custom-css.png)

The font family selector lists **49 Google Fonts**, loaded via CDN:

| Type | Fonts |
|---|---|
| **Sans-Serif** | Inter, Roboto, Open Sans, Poppins, Nunito, Montserrat, Raleway, Lato, DM Sans, Figtree, Plus Jakarta Sans, Work Sans, Rubik, Outfit, Onest, Lexend, Manrope, Sora, Public Sans, Be Vietnam Pro |
| **Serif** | Merriweather, Playfair Display, Lora, Source Serif 4, Libre Baskerville, Noto Serif, DM Serif Display, Spectral, Cormorant Garamond, Crimson Pro, EB Garamond |
| **Mono** | JetBrains Mono, Fira Code, Source Code Pro, IBM Plex Mono, Space Mono, Roboto Mono, Inconsolata, Cousine, Azeret Mono, Share Tech Mono |
| **Display / Other** | Bebas Neue, Comfortaa, Righteous, Fredoka, Baloo 2, Patrick Hand, Caveat, Architects Daughter |

**Inter** is the default and bundled with Filament — no CDN hit.

The selector is searchable. Start typing a font name to filter the list.

---

## CSS Theme

Four controls shape the visual feel of the panel.

### Border Radius

Controls corner rounding on 20+ CSS classes:

| Option | Effect |
|---|---|
| `none` | Sharp corners — `0px` |
| `small` | Subtle rounding — `0.25rem` |
| `default` | Standard — `0.5rem` (Filament default) |
| `medium` | Noticeable — `0.75rem` |
| `large` | Rounded — `1rem` |
| `pill` | Pill/capsule — `9999px` |

Applies to: buttons, inputs, selects, cards, modals, dropdowns, badges, notifications.

### Input Border Radius

Override border radius specifically for form inputs (text inputs, selects, textareas). Options are the same as Border Radius, plus `Inherit` (follows the global border radius setting).

### Badge Shape

Controls badge corner rounding independently:

| Option | Shape |
|---|---|
| `sharp` | Square corners |
| `default` | Slightly rounded |
| `rounded` | Noticeably rounded |
| `pill` | Fully pill-shaped |

### Shadow Intensity

Controls the depth of card and dropdown shadows:

| Option | Effect |
|---|---|
| `none` | No shadows — flat design |
| `subtle` | Light shadows — minimal depth |
| `default` | Standard shadows — Filament default |
| `pronounced` | Deep shadows — strong depth |

---

## Custom CSS

Arbitrary CSS injected into the `<head>` of every page within the tenant's panel. Use it for:

- Slight color tweaks beyond the six roles
- Custom animations or transitions
- Hiding or restyling specific elements
- Brand-specific overrides that don't fit the theme controls

```css
/* Example: custom sidebar background */
.fi-sidebar {
    background: linear-gradient(180deg, #1e293b, #0f172a);
}

.fi-sidebar-item-active {
    background: rgba(255, 255, 255, 0.1);
}
```

### Security

All custom CSS is sanitized on save:

| Threat | Mitigation |
|---|---|
| `<script>` tags | Stripped (case-insensitive, multiline-aware) |
| `url(javascript:...)` | Replaced with `url(invalid-protocol-removed:)` |
| `expression()` (IE) | Stripped |

Additionally:
- Max 50,000 bytes (configurable via `security.max_css_length`)
- Custom CSS can be globally disabled via `security.disable_custom_css = true`

---

## Next Steps

- [Layout Settings](/filament-white-label/features/layout-settings) — Configure navigation, sidebar, and footer
- [Advanced Settings](/filament-white-label/features/advanced-settings) — SPA mode, notifications, density
- [Branded Login](/filament-white-label/features/branded-login) — Extend branding to the login page
