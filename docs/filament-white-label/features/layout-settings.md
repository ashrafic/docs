---
title: Layout Settings
sidebar_position: 3
---


The Layout settings page controls the panel chrome — navigation, sidebar, breadcrumbs, dimensions, and footer. Everything that shapes the structure of the panel.

![Layout — Navigation, Sidebar & Display](/filament-white-label/assets/screenshots/layout-nav-sidebar-display.png)

---

## Navigation

### Top Bar

Shows or hides the top bar, which contains the user menu, notification bell, and (optionally) the main navigation.

| State | Effect |
|---|---|
| ON (default) | Top bar visible with user menu and notifications |
| OFF | Top bar hidden. Sidebar takes full vertical space. |

### Top Navigation

Moves the main navigation from the sidebar to the top bar. This is Filament's equivalent of a horizontal nav bar.

| State | Effect |
|---|---|
| ON | Navigation renders in the top bar. Sidebar is hidden. |
| OFF (default) | Navigation stays in the sidebar. |

When Top Navigation is enabled:
- Sidebar settings (Collapsible, Fully Collapsible) are disabled
- Navigation Groups setting is disabled
- The navigation renders as horizontal dropdown menus in the top bar

---

## Sidebar

### Collapsible Sidebar

Collapses the sidebar to show only icons. Users hover to expand and see labels.

| State | Effect |
|---|---|
| ON | Sidebar collapses to icons. Hover to expand with labels. |
| OFF (default) | Sidebar always shows icons + labels at full width. |

Enabling this automatically disables Fully Collapsible Sidebar (they are mutually exclusive).

### Fully Collapsible Sidebar

Hides the sidebar completely. A toggle button appears in the top bar for users to show/hide it.

| State | Effect |
|---|---|
| ON | Sidebar hidden by default. Toggle button in top bar. |
| OFF (default) | Sidebar always visible. |

Enabling this automatically disables Collapsible Sidebar.

### Collapsible Navigation Groups

Allows Filament navigation groups to expand and collapse.

| State | Effect |
|---|---|
| ON (default) | Navigation groups have expand/collapse toggles |
| OFF | Navigation groups are always expanded |

Disabled when Top Navigation is active.

---

## Display

### Breadcrumbs

Shows the breadcrumb navigation trail at the top of each page.

| State | Effect |
|---|---|
| ON (default) | Breadcrumb trail visible (e.g., "Dashboard > Users > Edit") |
| OFF | No breadcrumbs |

---

## Dimensions

![Dimensions & Footer](/filament-white-label/assets/screenshots/dimension-footer.png)

### Content Width

Maximum width of the main content area:

| Option | Value |
|---|---|
| Default | Filament's default (`max-w-7xl`, 1280px with padding) |
| `1024px` | Narrow — comfortable for form-heavy panels |
| `1280px` | Standard — good for data tables |
| Full Width | No max-width — content spans the entire viewport |

### Sidebar Width

Fixed width of the sidebar:

| Option | Value |
|---|---|
| Default | `320px` (Filament default) |
| `260px` | Compact — more space for content |
| `300px` | Medium |
| `340px` | Wide — better for long navigation labels |

### Page Heading Size

Font size of the `<h1>` page heading:

| Option | Value |
|---|---|
| `small` | `1.25rem` — compact, subtitle-like |
| `default` | Filament's default size |
| `large` | `2rem` — prominent, hero-style |

### Nav Item Spacing

Vertical padding of sidebar navigation items:

| Option | Effect |
|---|---|
| `compact` | Tighter padding — fits more items in view |
| `default` | Standard spacing |
| `spacious` | More padding — easier to tap, more breathing room |

---

## Footer

### Footer Text

A single line of text displayed at the bottom of every page. Ideal for:

- Company name: `'ACME Corp'`
- Legal text: `'© 2024 All Rights Reserved'`
- Support contact: `'Need help? support@acme.com'`

Max 255 characters.

### Footer Links

A repeater of label + URL pairs. Each link requires:

| Field | Description |
|---|---|
| **Label** | Display text for the link (max 100 characters) |
| **URL** | Link destination (max 500 characters, URL format validated) |

Add as many links as needed. Links render inline, separated by a separator.

Example:
- `Privacy Policy` → `/privacy`
- `Terms of Service` → `/terms`
- `Contact` → `mailto:support@example.com`

---

## Dimension & Footer Page

The dimensions and footer settings share the bottom portion of the Layout page:

![Dimensions & Footer](/filament-white-label/assets/screenshots/dimension-footer.png)

---

## Next Steps

- [Advanced Settings](/filament-white-label/features/advanced-settings) — SPA mode, notifications, density, modals
- [Integration Patterns](/filament-white-label/features/integration-patterns) — Wire these settings into your PanelProvider
- [Configuration](/filament-white-label/configuration) — Set defaults for all layout options
