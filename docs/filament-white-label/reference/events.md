---
title: Events
---


Two events dispatch automatically from the `WhiteLabelSettings` model via Laravel's `$dispatchesEvents` property. Both carry the fully hydrated `WhiteLabelSettings` model.

---

## WhiteLabelSettingsSaved

```
FilamentWhiteLabel\Events\WhiteLabelSettingsSaved
```

Fires on every save — create or update — of a `WhiteLabelSettings` record (Brand, Layout, or Advanced page).

| Property | Type |
|---|---|
| `$settings` | `WhiteLabelSettings` |

The model is fully hydrated — you have access to the tenant morph, `panel_id`, and the complete `metadata` array.

**Use cases:**

- Notify tenant admins that branding changed
- Sync logo URLs to a CDN
- Rebuild cached CSS assets
- Log brand changes for an audit trail
- Push settings to an external service

---

## WhiteLabelSettingsDeleted

```
FilamentWhiteLabel\Events\WhiteLabelSettingsDeleted
```

Fires when a `WhiteLabelSettings` record is deleted.

| Property | Type |
|---|---|
| `$settings` | `WhiteLabelSettings` |

**Use cases:**

- Clean up tenant-scoped uploaded files (logos, favicons)
- Reset fallback branding
- Notify integrations that white-label settings were removed

---

## Built-in Listener

`FilamentWhiteLabel\Listeners\ClearWhiteLabelCache` is auto-registered by the service provider. It listens to both events and clears the relevant cache key. No action needed — it just works.

---

## Registering Your Own Listener

Register in `AppServiceProvider::boot()` or a dedicated event service provider:

```php
use FilamentWhiteLabel\Events\WhiteLabelSettingsSaved;
use Illuminate\Support\Facades\Event;

public function boot(): void
{
    Event::listen(WhiteLabelSettingsSaved::class, function ($event) {
        $settings = $event->settings;

        // Access tenant
        $tenant = $settings->tenant;

        // Access panel
        $panelId = $settings->panel_id;

        // Access full metadata
        $brandName = $settings->metadata['brand_name'] ?? 'Default';
        $colors = $settings->metadata['colors'] ?? [];

        // Your logic here
    });
}
```

```php
// Dedicated listener class
Event::listen(
    WhiteLabelSettingsSaved::class,
    \App\Listeners\SyncBrandAssets::class,
);
```

---

## Key Facts

- Both events use `Illuminate\Foundation\Events\Dispatchable` — supports `::dispatch()` for manual firing
- Dispatched via the model's `$dispatchesEvents` property — automatic on any save or delete, no manual `event()` calls needed
- The model is fully hydrated — access `$settings->tenant`, `$settings->panel_id`, `$settings->metadata`
- Cache clearing listener is conditional on `config('filament-white-label.enabled', true)`
