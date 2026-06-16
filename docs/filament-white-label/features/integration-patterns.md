---
title: Integration Patterns
sidebar_position: 6
---


Four integration patterns — from one line to full granularity. Choose the one that fits your architecture.

---

## Pattern 1: Macro (Recommended)

Add `->whiteLabel()` to your PanelProvider. Every feature wired at once:

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

The macro wires 16+ settings:
- `brandName()`, `brandLogo()`, `brandLogoHeight()`, `favicon()`
- `colors()` (all 6 roles)
- `font()` (Google Fonts CDN injection)
- `topbar()`, `topNavigation()`
- `sidebarCollapsibleOnDesktop()`, `sidebarFullyCollapsibleOnDesktop()`, `collapsibleNavigationGroups()`
- `breadcrumbs()`
- `unsavedChangesAlerts()`, `spaMode()`
- `databaseNotifications()`, `databaseNotificationsPolling()`
- `renderHook('panels::head.end', ...)` — injects font + theme CSS + custom CSS
- `renderHook('panels::footer', ...)` — injects footer HTML

---

## Pattern 2: Conditional

Gate white-labeling behind a permission:

```php
$panel->whiteLabel(auth()->user()?->can('manage-branding'));
```

Disabled users see panel defaults. Nothing breaks.

You can also check for tenant context:

```php
$panel->whiteLabel(
    Filament::getTenant() && Filament::getTenant()->hasWhiteLabelSubscription()
);
```

---

## Pattern 3: Granular (Pick & Choose)

Use the `HasWhiteLabel` concern on your PanelProvider. Pick exactly which settings to wire:

```php
use FilamentWhiteLabel\Concerns\HasWhiteLabel;
use Filament\Panel;

class AdminPanelProvider extends PanelProvider
{
    use HasWhiteLabel;

    public function panel(Panel $panel): Panel
    {
        return $panel
            // Brand Identity
            ->brandName($this->whiteLabelBrandName())
            ->brandLogo($this->whiteLabelLogo())
            ->favicon($this->whiteLabelFavicon())

            // Colors
            ->colors($this->whiteLabelColors())

            // Typography
            ->font($this->whiteLabelFontFamily())

            // Layout
            ->topbar($this->whiteLabelTopbar())
            ->topNavigation($this->whiteLabelTopNavigation())
            ->sidebarCollapsibleOnDesktop($this->whiteLabelSidebarCollapsible())
            ->sidebarFullyCollapsibleOnDesktop($this->whiteLabelSidebarFullyCollapsible())
            ->collapsibleNavigationGroups($this->whiteLabelCollapsibleNavigationGroups())
            ->breadcrumbs($this->whiteLabelBreadcrumbs())

            // Behavior
            ->unsavedChangesAlerts($this->whiteLabelUnsavedChangesAlerts())
            ->spaMode($this->whiteLabelSpaMode())

            // Notifications
            ->databaseNotifications($this->whiteLabelDatabaseNotifications())
            ->databaseNotificationsPolling($this->whiteLabelDatabaseNotificationsPolling())

            // Sidebar width
            ->sidebarWidth($this->whiteLabelSidebarWidth())

            // Render hooks (CSS + footer)
            ->renderHook('panels::head.end', $this->whiteLabelHeadHook())
            ->renderHook('panels::footer', $this->whiteLabelFooter());
    }
}
```

Each method returns a closure that resolves at runtime against the current tenant context.

### Composite Convenience

The concern also provides a composite `whiteLabel()` method:

```php
use FilamentWhiteLabel\Concerns\HasWhiteLabel;

class AdminPanelProvider extends PanelProvider
{
    use HasWhiteLabel;

    public function panel(Panel $panel): Panel
    {
        return $this->whiteLabel($panel); // Chains all closures at once
    }
}
```

This is functionally equivalent to Pattern 1 but uses the trait instead of the macro.

---

## Pattern 4: Static Facade (Zero Traits)

Programmatic access — no traits, no macros. Call directly:

```php
use FilamentWhiteLabel\FilamentWhiteLabel;

// Single values
$brandName = FilamentWhiteLabel::brandName();
$logoUrl = FilamentWhiteLabel::logoUrl();
$faviconUrl = FilamentWhiteLabel::faviconUrl();
$fontFamily = FilamentWhiteLabel::fontFamily();
$colors = FilamentWhiteLabel::colors();

// Boolean getters
$topbar = FilamentWhiteLabel::topbar();
$topNavigation = FilamentWhiteLabel::topNavigation();

// CSS generation
$customCssTag = FilamentWhiteLabel::customCssTag();
$fontLinkTag = FilamentWhiteLabel::fontLinkTag();

// Get everything as an array
$all = FilamentWhiteLabel::toArray();

// Clear cache programmatically
FilamentWhiteLabel::clearCache();
```

Use this when you need white-label values outside of a PanelProvider — in middleware, mail templates, API responses, or custom views.

---

## Pattern Comparison

| Pattern | Complexity | Use When |
|---|---|---|
| **Macro** | Lowest | Standard setup — one tenant, one panel |
| **Conditional** | Low | Gating branding behind permissions or subscriptions |
| **Granular Trait** | Medium | You want some settings from the tenant, others hardcoded |
| **Static Facade** | Medium | You need white-label values outside PanelProvider context |

---

## Render Hooks

The macro and granular trait automatically register two render hooks:

### `panels::head.end`

Injects into the `<head>` of every page:
- Google Fonts preconnect + stylesheet link
- Generated CSS theme (`<style>` block for border radius, shadows, density, etc.)
- Custom CSS (`<style>` block, sanitized)

### `panels::footer`

Injects footer HTML at the bottom of every page:
- Footer text (escaped)
- Footer links (each label + href, escaped)
- Links are rendered inline with separators

---

## Manual Render Hook Registration

If using the static facade pattern, register render hooks yourself:

```php
use FilamentWhiteLabel\FilamentWhiteLabel;

$panel
    ->renderHook('panels::head.end', function () {
        return FilamentWhiteLabel::fontLinkTag()
            . FilamentWhiteLabel::generatedThemeCss()
            . FilamentWhiteLabel::customCssTag();
    })
    ->renderHook('panels::footer', function () {
        return FilamentWhiteLabel::footerHtml();
    });
```

---

## Next Steps

- [Resolution Flow](/filament-white-label/reference/resolution-flow) — Understand how each call resolves
- [Configuration](/filament-white-label/configuration) — Set defaults for all settings
- [Getting Started](/filament-white-label/getting-started) — Walk through the full workflow
