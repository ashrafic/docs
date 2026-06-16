---
title: Advanced Settings
sidebar_position: 4
---


The Advanced settings page controls behavior, notifications, density, and accessibility. Fine-tune how the panel feels and responds.

![Advanced](/filament-white-label/assets/screenshots/advanced.png)

---

## Behavior

### Unsaved Changes Alerts

Warns users before navigating away from a page with unsaved form changes.

| State | Effect |
|---|---|
| ON | Browser confirmation dialog appears if form has been modified |
| OFF (default) | Silent navigation — no warning |

:::tip
This uses Filament's built-in unsaved changes detection. It respects the same form lifecycle as any Filament resource.
:::

### SPA Mode

Single-page application mode for faster navigation between pages.

| State | Effect |
|---|---|
| ON | Pages load via AJAX — no full browser reload. Title and URL update dynamically. |
| OFF (default) | Standard full-page navigation |

Benefits:
- Faster perceived navigation
- Preserves scroll position
- Maintains JavaScript state

Considerations:
- May interfere with custom JavaScript that expects full-page loads
- Not recommended for panels with lots of custom Livewire components outside Filament forms

---

## Notifications

### Database Notifications

Enables the in-app notification bell in the top bar.

| State | Effect |
|---|---|
| ON | Bell icon appears in top bar. Click to view notifications. Auto-polling checks for new ones. |
| OFF (default) | No notification bell |

Uses Laravel's database notifications driver. Notifications are stored in the `notifications` table.

### Notification Polling Interval

How often the browser checks for new database notifications:

| Interval | Polling Frequency |
|---|---|
| `10s` | Every 10 seconds |
| `30s` (default) | Every 30 seconds |
| `60s` | Every minute |
| `2m` | Every 2 minutes |
| `5m` | Every 5 minutes |

Only visible when Database Notifications is enabled.

:::tip Polling Impact
Shorter intervals mean more immediate notifications but higher server load. For most panels, 30s or 60s is a good balance.
:::

---

## Density & Styling

### Font Scale

Global font-size multiplier for accessibility:

| Option | Value | Use Case |
|---|---|---|
| `90%` | Compact | Information-dense dashboards |
| `100%` (default) | Standard | Normal reading comfort |
| `110%` | Large | Improved readability |
| `120%` | Extra Large | Accessibility, visually impaired users |

Affects all text in the panel — headings, body text, table cells, form labels, buttons. Works as a CSS multiplier, so it scales proportionally.

### Form Density

Controls vertical spacing in form sections and fields:

| Option | Effect |
|---|---|
| `compact` | Less padding between form fields. More fields in view. |
| `default` | Standard Filament spacing |
| `spacious` | More padding. Fields feel less cramped. |

Affects:
- Space between form sections
- Vertical padding of form fields
- Section header spacing

### Table Row Density

Controls vertical padding of table rows:

| Option | Effect |
|---|---|
| `compact` | Less padding — more rows visible without scrolling |
| `default` | Standard row height |
| `spacious` | More padding — rows are easier to scan |

Ideal for:
- `compact` — Large datasets where scanning many rows matters
- `spacious` — Smaller tables where readability is the priority

### Modal Size

Default maximum width for modals and dialogs:

| Option | Width | Use Case |
|---|---|---|
| `small` | `480px` | Simple confirmations, quick actions |
| `medium` | `640px` | Standard forms, detail views |
| `default` | Filament's default (`768px`) | Most modals |
| `large` | `800px` | Complex forms, rich content |
| `extra-large` | `1024px` | Full-page equivalents, wizards |

Per-modal overrides in code (via `Modal::width()`) take priority over this setting.

### Transition Speed

CSS transition duration for UI animations:

| Option | Duration | Effect |
|---|---|---|
| `none` | `0s` | Instant — no animation. Snappy, no-nonsense. |
| `fast` | `0.1s` | Quick transitions. Feels responsive. |
| `default` | Filament's default | Balanced |
| `slow` | `0.3s` | Smooth, deliberate transitions |

Affects:
- Button hover/focus states
- Dropdown open/close
- Modal enter/exit
- Sidebar collapse/expand

---

## Combined Effect

These settings work together to shape the panel experience:

| Scenario | Settings |
|---|---|
| **"High-density data ops"** | Font Scale: 90%, Form Density: compact, Table Density: compact, Transition: fast |
| **"Accessible by default"** | Font Scale: 120%, Form Density: spacious, Table Density: spacious, Transition: slow |
| **"Power user"** | SPA Mode: ON, Transition: none, Unsaved Alerts: OFF |
| **"Client-friendly"** | Unsaved Alerts: ON, Modal: large, Transition: default, Font Scale: 100% |

---

## Next Steps

- [Brand Settings](/filament-white-label/features/brand-settings) — Colors, fonts, and CSS theme
- [Layout Settings](/filament-white-label/features/layout-settings) — Navigation and dimensions
- [Configuration](/filament-white-label/configuration) — Set defaults for all advanced options
