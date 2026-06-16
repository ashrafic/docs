---
title: Configuration
---


## Publishing the Config

If you didn't run the install command, publish the config manually:

```bash
php artisan vendor:publish --tag=filament-white-label-config
```

---

## Full Configuration Reference

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Enabled
    |--------------------------------------------------------------------------
    | Master kill-switch. When false, all white-label features are disabled
    | and panels render with their native configuration.
    */
    'enabled' => env('FILAMENT_WHITE_LABEL_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Cache TTL
    |--------------------------------------------------------------------------
    | Seconds to cache resolved settings per tenant. Set to 0 to disable
    | caching entirely (higher DB load, always-fresh values).
    */
    'cache_ttl' => env('FILAMENT_WHITE_LABEL_CACHE_TTL', 300),

    /*
    |--------------------------------------------------------------------------
    | Storage Disk
    |--------------------------------------------------------------------------
    | Laravel filesystem disk for uploaded logos and favicons.
    | Supports public, s3, r2, digitalocean, or any custom disk.
    */
    'disk' => env('FILAMENT_WHITE_LABEL_DISK', 'public'),

    /*
    |--------------------------------------------------------------------------
    | Storage Path Prefix
    |--------------------------------------------------------------------------
    | Base path for tenant-scoped upload directories.
    */
    'storage_path_prefix' => 'brand',

    /*
    |--------------------------------------------------------------------------
    | Defaults
    |--------------------------------------------------------------------------
    | Fallback values used when no tenant settings exist.
    | Every value here can be overridden per tenant, per panel.
    */
    'defaults' => [

        /*
        |----------------------------------------------------------------------
        | Brand Identity
        |----------------------------------------------------------------------
        */
        'brand_name' => env('APP_NAME', 'Filament'),
        'logo' => null,
        'dark_mode_logo' => null,
        'favicon' => null,
        'brand_logo_height' => null,

        /*
        |----------------------------------------------------------------------
        | Colors — Six color roles with hex defaults
        |----------------------------------------------------------------------
        */
        'colors' => [
            'primary' => '#3b82f6',
            'secondary' => '#64748b',
            'danger' => '#ef4444',
            'warning' => '#f59e0b',
            'success' => '#22c55e',
            'info' => '#3b82f6',
        ],

        /*
        |----------------------------------------------------------------------
        | Typography
        |----------------------------------------------------------------------
        */
        'font_family' => 'Inter',

        /*
        |----------------------------------------------------------------------
        | Layout
        |----------------------------------------------------------------------
        */
        'topbar' => true,
        'top_navigation' => false,
        'sidebar_collapsible_on_desktop' => false,
        'sidebar_fully_collapsible_on_desktop' => false,
        'collapsible_navigation_groups' => true,
        'breadcrumbs' => true,

        /*
        |----------------------------------------------------------------------
        | Behavior
        |----------------------------------------------------------------------
        */
        'unsaved_changes_alerts' => false,
        'spa_mode' => false,

        /*
        |----------------------------------------------------------------------
        | Notifications
        |----------------------------------------------------------------------
        */
        'database_notifications' => false,
        'database_notifications_polling' => '30s',

        /*
        |----------------------------------------------------------------------
        | CSS Theme
        |----------------------------------------------------------------------
        */
        'border_radius' => 'default',
        'input_border_radius' => null,
        'badge_shape' => 'default',
        'shadow_intensity' => 'default',

        /*
        |----------------------------------------------------------------------
        | Dimensions
        |----------------------------------------------------------------------
        */
        'container_width' => null,
        'sidebar_width' => null,
        'heading_size' => 'default',
        'nav_item_spacing' => 'default',

        /*
        |----------------------------------------------------------------------
        | Density
        |----------------------------------------------------------------------
        */
        'font_scale' => null,
        'form_density' => 'default',
        'table_row_density' => 'default',
        'modal_size' => 'default',
        'transition_speed' => 'default',

        /*
        |----------------------------------------------------------------------
        | Footer
        |----------------------------------------------------------------------
        */
        'footer_text' => null,
        'footer_links' => [],
    ],

    /*
    |--------------------------------------------------------------------------
    | Security
    |--------------------------------------------------------------------------
    */
    'security' => [

        /*
        |----------------------------------------------------------------------
        | Disable Custom CSS
        |----------------------------------------------------------------------
        | When true, custom CSS is globally blocked regardless of per-tenant
        | settings. Recommended for high-security environments.
        */
        'disable_custom_css' => env('FILAMENT_WHITE_LABEL_DISABLE_CSS', false),

        /*
        |----------------------------------------------------------------------
        | Max CSS Length
        |----------------------------------------------------------------------
        | Maximum length (bytes) of custom CSS stored per tenant.
        */
        'max_css_length' => 50000,
    ],

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    | Customize the Filament navigation integration.
    */
    'ui' => [
        'navigation_group' => 'White Label',
        'navigation_sort' => 10,
        'show_preview' => env('FILAMENT_WHITE_LABEL_PREVIEW', false),
    ],

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */
    'login' => [
        'enabled' => env('FILAMENT_WHITE_LABEL_LOGIN_ENABLED', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Fonts
    |--------------------------------------------------------------------------
    */
    'fonts' => [
        'enabled' => true,
        'api_key' => env('GOOGLE_FONTS_API_KEY'),
    ],
];
```

---

## Environment Variables

Add these to your `.env` file to control behavior without editing config:

```ini
# Master switch — set to false to disable all white-label features
FILAMENT_WHITE_LABEL_ENABLED=true

# Cache duration in seconds (0 = no caching)
FILAMENT_WHITE_LABEL_CACHE_TTL=300

# Storage disk for uploaded logos and favicons
FILAMENT_WHITE_LABEL_DISK=public

# Block all custom CSS globally
FILAMENT_WHITE_LABEL_DISABLE_CSS=false

# Google Fonts API key (optional, for future dynamic loading)
GOOGLE_FONTS_API_KEY=
```

---

## Default Values

Every config key in `defaults` serves as the fallback when no tenant settings exist. This means you can:

- **Set organization-wide defaults** in config that all tenants inherit
- **Let tenants override** any value from the White Label UI
- **Deploy new defaults** without touching tenant data

### Example: Organization-Wide Colors

```php
'defaults' => [
    'colors' => [
        'primary' => '#1a56db',   // Your brand blue
        'secondary' => '#4b5563',
        'danger' => '#dc2626',
        'warning' => '#d97706',
        'success' => '#059669',
        'info' => '#0891b2',
    ],
],
```

Tenants see these colors by default but can customize every role.

---

## Disabling Features

You can hide specific settings from tenants while keeping control yourself:

- **Custom CSS**: Set `security.disable_custom_css = true` to remove the CSS textarea from the Brand page
- **Entire plugin**: Set `FILAMENT_WHITE_LABEL_ENABLED=false` to disable all white-label features
- **Branded login**: Set `FILAMENT_WHITE_LABEL_LOGIN_ENABLED=false` to disable login branding

---

## Storage Configuration

Uploaded logos and favicons are stored in tenant-scoped directories:

```
brand/App.Models.Team-5/logos/
brand/App.Models.Team-5/favicons/
brand/global/logos/
```

Configure the disk via `FILAMENT_WHITE_LABEL_DISK`:

| Disk | Use Case |
|---|---|
| `public` | Local development, single-server deployments |
| `s3` | AWS S3 — production, auto-scaling |
| `r2` | Cloudflare R2 — S3-compatible, zero egress fees |
| `digitalocean` | DigitalOcean Spaces |

:::tip Symbolic Links
When using the `public` disk, run `php artisan storage:link` to create the symbolic link from `public/storage` to `storage/app/public`.
:::

---

## Cache Configuration

Settings are cached per tenant + panel combination. Cache keys use the format:

```
filament-white-label:tenant:{morphClass}:{tenantId}:panel:{panelId}
```

Cache is invalidated automatically whenever settings are saved or deleted via the `WhiteLabelSettingsObserver`. To clear manually:

```bash
php artisan white-label:clear-cache
```

Set `cache_ttl` to `0` in config to disable caching entirely. Useful during development or when values must reflect changes instantly.

---

## Multi-Panel Configuration

The `panel_id` column lets a single tenant have different branding per panel:

```php
// Admin panel gets one set of settings (panel_id = 'admin')
// Client panel gets another (panel_id = 'app')
// panel_id = null serves as fallback for any undefined panel
```

Resolution priority: specific panel → global (null panel_id) → config defaults.

---

## Next Steps

- **[Getting Started](/filament-white-label/getting-started)** — Walk through every settings page
- **[Integration Patterns](/filament-white-label/features/integration-patterns)** — Choose how to wire the package
- **[Resolution Flow](/filament-white-label/reference/resolution-flow)** — Understand how settings resolve at runtime
