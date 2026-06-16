---
title: Resolution Flow
---


How a request travels from the browser to the database and back to the rendered panel — and where every setting value comes from.

---

## The Full Path

```
Browser request
  │
  ▼
Panel::whiteLabel() macro applies closures
  │
  ├── config('filament-white-label.enabled') === false?
  │     └── Return null. All callers use config defaults.
  │
  ├── Filament::getTenant() returns a tenant?
  │     │
  │     ├── YES → resolveFromDatabase(tenant, panelId)
  │     │         │
  │     │         ├── Cache key: filament-white-label:tenant:{morphClass}:{id}:panel:{panelId}
  │     │         │
  │     │         ├── Cache hit? → return cached WhiteLabelSettings
  │     │         │
  │     │         └── Cache miss? → Query database:
  │     │               WHERE tenant_type = ? AND tenant_id = ?
  │     │               AND (panel_id = ? OR panel_id IS NULL)
  │     │               ORDER BY panel_id IS NOT NULL DESC
  │     │               LIMIT 1
  │     │               │
  │     │               ├── Found? → Cache::put(ttl) → return
  │     │               └── Not found? → return null
  │     │
  │     └── NO → resolveGlobal(panelId)
  │               │
  │               ├── Cache key: filament-white-label:global:panel:{panelId}
  │               │
  │               ├── Cache hit? → return cached
  │               │
  │               └── Cache miss? → Query database:
  │                     WHERE tenant_type IS NULL AND tenant_id IS NULL
  │                     AND (panel_id = ? OR panel_id IS NULL)
  │                     ORDER BY panel_id IS NOT NULL DESC
  │                     │
  │                     ├── Found? → Cache::put(ttl) → return
  │                     └── Not found? → return null
  │
  ▼
Each getter (brandName(), colors(), topbar(), etc.)
  │
  ├── resolve() returned settings? → use $settings->metadata['key']
  │
  └── resolve() returned null? → use config('filament-white-label.defaults.key')
        │
        └── Boolean values: additional hardcoded fallback
              (topbar=true, top_navigation=false,
               sidebar_collapsible_on_desktop=false,
               sidebar_fully_collapsible_on_desktop=false,
               collapsible_navigation_groups=true,
               breadcrumbs=true, unsaved_changes_alerts=false,
               spa_mode=false, database_notifications=false)
```

---

## Three Operating Modes

The package transitions seamlessly between three modes as your application evolves:

### Mode 1: Multi-Tenant

```php
// Tenant model with HasWhiteLabel trait
class Team extends Model
{
    use HasWhiteLabel;
}

// Panel with tenant context
$panel->tenant(Team::class)->whiteLabel();
```

| Component | Value |
|---|---|
| `Filament::getTenant()` | Returns the current tenant model |
| Settings source | `white_label_settings` row matching `tenant_type` + `tenant_id` |
| Cache key | `filament-white-label:tenant:App\Models\Team:5:panel:admin` |

Multiple tenants → multiple settings records → each sees their own branding.

### Mode 2: Single-Tenant (Global)

```php
// No tenant model trait needed
// Panel without tenant context
$panel->whiteLabel();
```

| Component | Value |
|---|---|
| `Filament::getTenant()` | Returns `null` |
| Settings source | `white_label_settings` row where `tenant_type IS NULL` |
| Cache key | `filament-white-label:global:panel:admin` |

One settings record → all users see the same branding. Ideal for single-tenant SaaS apps.

### Mode 3: Config-Only

```php
// No white_label_settings rows exist at all
// No tenant model trait
$panel->whiteLabel();
```

| Component | Value |
|---|---|
| `Filament::getTenant()` | Returns `null` |
| Settings source | `config('filament-white-label.defaults.*')` |
| Database queries | Skipped — no records found |

No database records needed. All values from config. Suitable for development, testing, or deployments where branding is managed via environment variables.

---

## Multi-Panel Resolution

The `panel_id` column supports different settings per panel within the same tenant:

```sql
-- Tenant 5 has two settings records:
-- panel_id = 'admin'  → admin branding
-- panel_id = NULL     → fallback for any other panel

SELECT * FROM white_label_settings
WHERE tenant_type = 'App\Models\Team' AND tenant_id = 5
  AND (panel_id = 'app' OR panel_id IS NULL)
ORDER BY panel_id IS NOT NULL DESC
-- Returns: panel_id = NULL (fallback, since no 'app'-specific record)
LIMIT 1
```

```sql
-- Same tenant, but requesting panel_id = 'admin'

SELECT * FROM white_label_settings
WHERE tenant_type = 'App\Models\Team' AND tenant_id = 5
  AND (panel_id = 'admin' OR panel_id IS NULL)
ORDER BY panel_id IS NOT NULL DESC
-- Returns: panel_id = 'admin' (specific match wins)
LIMIT 1
```

**Priority:**
1. Panel-specific record (`panel_id = 'admin'`)
2. Panel-agnostic record (`panel_id IS NULL`)
3. Config defaults

---

## Cache Layer

### Cache Keys

| Context | Key Format |
|---|---|
| With tenant | `filament-white-label:tenant:{morphClass}:{tenantId}:panel:{panelId}` |
| Without tenant | `filament-white-label:global:panel:{panelId}` |

### Cache TTL

Configurable via `cache_ttl` in `config/filament-white-label.php`. Default: 300 seconds (5 minutes). Set to `0` to disable.

### Cache Invalidation

Three automatic triggers:

| Trigger | How |
|---|---|
| **Settings saved** | `WhiteLabelSettingsObserver::saved()` calls `WhiteLabel::clearCache()` |
| **Settings deleted** | `WhiteLabelSettingsObserver::deleted()` calls `WhiteLabel::clearCache()` |
| **Tenant created** | `HasWhiteLabel` trait fires `created` event → auto-creates settings → triggers saved observer |

Manual invalidation:

```bash
php artisan white-label:clear-cache
```

---

## Settings Metadata Structure

All settings live in a single `metadata` JSON column:

```json
{
    "brand_name": "ACME Corp",
    "logo_path": "brand/App.Models.Team-5/logos/logo.png",
    "dark_mode_logo_path": null,
    "favicon_path": "brand/App.Models.Team-5/favicons/favicon.ico",
    "brand_logo_height": "2.5rem",
    "colors": {
        "primary": "#1a56db",
        "secondary": "#64748b",
        "danger": "#dc2626",
        "warning": "#d97706",
        "success": "#059669",
        "info": "#0891b2"
    },
    "font_family": "Inter",
    "border_radius": "default",
    "input_border_radius": null,
    "badge_shape": "default",
    "shadow_intensity": "default",
    "custom_css": null,
    "topbar": true,
    "top_navigation": false,
    "sidebar_collapsible_on_desktop": false,
    "sidebar_fully_collapsible_on_desktop": false,
    "collapsible_navigation_groups": true,
    "breadcrumbs": true,
    "container_width": null,
    "sidebar_width": null,
    "heading_size": "default",
    "nav_item_spacing": "default",
    "unsaved_changes_alerts": false,
    "spa_mode": false,
    "database_notifications": false,
    "database_notifications_polling": "30s",
    "font_scale": null,
    "form_density": "default",
    "table_row_density": "default",
    "modal_size": "default",
    "transition_speed": "default",
    "footer_text": null,
    "footer_links": []
}
```

No schema migrations needed when new settings are added in future releases — the JSON column accepts any new key.

---

## Database Schema

**Table:** `white_label_settings`

| Column | Type | Description |
|---|---|---|
| `id` | bigint, auto-increment | Primary key |
| `tenant_type` | string, nullable | Morph class (e.g., `App\Models\Team`) |
| `tenant_id` | bigint, nullable | Morph ID |
| `panel_id` | string, nullable | Filament panel ID |
| `metadata` | json, nullable | All settings as JSON |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**Unique constraint:** `UNIQUE(tenant_type, tenant_id, panel_id)` — one record per tenant + panel combination.

---

## Next Steps

- [Cache & Security](/filament-white-label/reference/cache-and-security) — Cache invalidation, CSS sanitization, storage paths
- [Configuration](/filament-white-label/configuration) — Set defaults for every resolved value
- [Integration Patterns](/filament-white-label/features/integration-patterns) — Wire the resolution into your PanelProvider
