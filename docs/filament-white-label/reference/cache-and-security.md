---
title: Cache & Security
---


How Filament White Label protects your panel and keeps performance high.

---

## Cache Architecture

Without caching, every page request would query the `white_label_settings` table for the current tenant. With caching, the database is hit only once per TTL window (default: 5 minutes).

### Cache Keys

| Context | Key Format |
|---|---|
| **With tenant** | `filament-white-label:tenant:{morphClass}:{tenantId}:panel:{panelId}` |
| **Without tenant** | `filament-white-label:global:panel:{panelId}` |

Cache keys include the tenant morph class, ID, and panel ID — Tenant 5's settings never leak into Tenant 6's cache.

### Cache TTL

```php
// config/filament-white-label.php
'cache_ttl' => env('FILAMENT_WHITE_LABEL_CACHE_TTL', 300),
```

| Value | Effect |
|---|---|
| `300` (default) | 5 minutes — good for production |
| `60` | 1 minute — faster reflection of changes |
| `0` | No caching — always query. Useful for development. |

### Automatic Invalidation

Cache is invalidated automatically via `WhiteLabelSettingsObserver`:

- **On save** — Clears cache for the affected tenant + panel combination
- **On delete** — Same invalidation
- **On tenant creation** — `HasWhiteLabel` trait auto-creates settings, triggering the saved observer

### Manual Invalidation

```bash
php artisan white-label:clear-cache
```

---

## CSS Sanitization

Custom CSS passes through a multi-layer sanitizer before storage:

### Layer 1: Script Tags

```php
// Strips both complete and partial script tags
preg_replace('/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/is', '', $css);
preg_replace('/<script\b[^>]*>/is', '', $css);
```

| Attack | Result |
|---|---|
| `<script>alert(1)</script>` | Removed |
| `<SCRIPT src="...">` | Removed (case-insensitive) |
| `<sCrIpT>mixed case</sCrIpT>` | Removed (`i` flag) |
| Multiline `<script>...</script>` | Removed (multiline-aware regex) |

### Layer 2: JavaScript URLs

```
url(javascript:alert(1))  →  url(invalid-protocol-removed:alert(1))
```

### Layer 3: CSS Expressions

```
expression(alert(1))  →  (removed-expression)
```

### Programmatic Check

```php
use FilamentWhiteLabel\Security\CssSanitizer;

if (CssSanitizer::isDangerous($proposedCss)) {
    // Reject or flag
}
```

---

## CSS Length Limit

Custom CSS is limited by default:

```php
'security' => [
    'max_css_length' => 50000, // 50KB
],
```

---

## Disabling Custom CSS

For high-security environments, disable custom CSS globally:

```ini
FILAMENT_WHITE_LABEL_DISABLE_CSS=true
```

When disabled:
- The Custom CSS textarea is hidden from the Brand settings page
- No custom CSS is injected into any page
- Theme CSS (border radius, shadows, etc.) still works

---

## Output Escaping

All user-provided content is escaped before rendering to the browser:

| Content | Escaped Via |
|---|---|
| Footer text | `e()` — Laravel's HTML entity encoder |
| Footer link labels + URLs | `e()` — prevents attribute injection |
| Custom CSS | `e()` — wrapped in a `<style>` tag |
| Brand name in login | `e()` — displayed in the login view |

---

## File Upload Security

| Measure | Details |
|---|---|
| **Type validation** | `image()` rule — only PNG, JPEG, SVG, WebP (logo); PNG, ICO, SVG (favicon) |
| **Size limits** | 2MB (logo), 512KB (favicon) |
| **Tenant-scoped paths** | `brand/{tenant_type}-{tenant_id}/logos/` |
| **Cross-tenant isolation** | Storage path includes tenant morph class + ID |

---

## Master Kill Switch

Disable every white-label feature with one env variable:

```ini
FILAMENT_WHITE_LABEL_ENABLED=false
```

All panels revert to their native Filament configuration. The `WhiteLabelSettings` records remain in the database — they're just not read.

---

## Next Steps

- [Resolution Flow](/filament-white-label/reference/resolution-flow) — Full request-to-response path
- [Configuration](/filament-white-label/configuration) — Security defaults and env variables
- [Integration Patterns](/filament-white-label/features/integration-patterns) — Wire the package into your panel
