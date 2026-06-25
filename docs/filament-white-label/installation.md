---
title: Installation
---


## Requirements

Before installing, ensure your environment meets the following requirements:

| Requirement | Version |
|---|---|
| PHP | `^8.2` |
| Laravel | `^11.0` |
| Filament | `^5.0` |

---

## Installation

```bash
composer require ashrafic/filament-white-label
```

Run the install command to publish config and migrations:

```bash
php artisan white-label:install
```

This command will:
1. Publish the configuration file to `config/filament-white-label.php`
2. Publish the migration for the `white_label_settings` table

Run the migration:

```bash
php artisan migrate
```

### Translations

All ~230 UI strings are translatable. Publish the language files (optional):

```bash
php artisan vendor:publish --tag=filament-white-label-translations
```

This copies `lang/en/filament-white-label.php` to your app's `lang/vendor/filament-white-label/` directory. Duplicate it for any locale.

---

## Tenant Model Setup

Add the `HasWhiteLabel` trait to your tenant model. Skip this step if you don't use multi-tenancy — the package works with a single global settings record.

```php
use FilamentWhiteLabel\Traits\HasWhiteLabel;

class Team extends Model
{
    use HasWhiteLabel;
}
```

The trait:
- Adds a `whiteLabelSettings()` polymorphic relationship
- Auto-creates a default settings record when a tenant is created

---

## Panel Registration

Add `->whiteLabel()` to your PanelProvider. Every feature is wired at once:

```php
use Filament\Panel;
use Filament\PanelProvider;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->tenant(Team::class)
            ->whiteLabel() // <-- all branding, auto-wired
            ->resources([
                \FilamentWhiteLabel\Resources\WhiteLabelSettingsResource::class,
            ]);
    }
}
```

Once registered, a new **"White Label"** navigation item will appear in your Filament panel with three sub-pages:

- **Brand** — Logo, colors, fonts, CSS theme, custom CSS
- **Layout** — Navigation, sidebar, breadcrumbs, dimensions, footer
- **Advanced** — SPA mode, notifications, density, modals, transitions

---

## Branded Login

To brand the login page, swap the login class in your PanelProvider:

```php
use FilamentWhiteLabel\Pages\Auth\BrandedLogin;

$panel->login(BrandedLogin::class);
```

The login page automatically renders the tenant's logo, brand name, and colors. All auth features are preserved.

:::tip Conditional Branding
You can make white-labeling conditional:

```php
$panel->whiteLabel(auth()->user()?->can('manage-branding'));
```

Disabled users see panel defaults. Nothing breaks.
:::

---

## Quick Start Workflow

### 1. Tenant visits White Label settings

Navigate to **White Label → Brand** in the sidebar.

### 2. Upload logo and set brand name

Upload light and dark mode logos. Set your brand name.

### 3. Choose colors

Pick from palette presets or enter custom hex values for all six color roles.

### 4. Set a font

Select any of 49 Google Fonts from the searchable dropdown.

### 5. Configure layout

Toggle top navigation, sidebar behavior, breadcrumbs, and content width.

### 6. Add a footer

Enter footer text and add links. All changes take effect immediately.

That's it. Your panel now reflects the tenant's brand — no code required.

---

## Cache Management

Settings are cached for 300 seconds (configurable). Cache is invalidated automatically on save. To clear manually:

```bash
php artisan white-label:clear-cache
```

---

## Next Steps

- **[Configuration](/filament-white-label/configuration)** — Full config reference and env variables
- **[Getting Started](/filament-white-label/getting-started)** — Walk through every settings page
- **[Integration Patterns](/filament-white-label/features/integration-patterns)** — Macro, trait, static facade, manual options
