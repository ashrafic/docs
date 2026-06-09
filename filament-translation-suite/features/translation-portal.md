---

# Translation Portal

The Translation Portal is a permission-gated interface designed for external translators who don't need — and shouldn't have — full access to your Filament admin panel.

---

## The Problem

Giving a freelance translator access to your entire Filament panel is risky:
- They might accidentally edit records they shouldn't touch
- They see sensitive business data
- You have to manage their permissions across multiple resources
- They get overwhelmed by features they don't need

The Translation Portal solves this by providing a focused, single-purpose interface.

---

## How It Works

### Access Control

The portal is gated by the `fts.portal.access` permission. Only users with this ability can see the page in navigation or access it directly.

```php
// In your Filament service provider or seeders
$user->givePermissionTo('fts.portal.access');
```

::: tip
The suite does not create this permission automatically. You should define it in your application's permission system (e.g., Spatie Laravel Permission) and assign it to translator roles.
:::

### What Translators See

The portal presents a clean, focused view:
- **All translatable keys** from the `system_translations` table
- **Grouped by locale** for easy navigation
- **Editable values** — translators can submit suggestions
- **No access** to other Filament resources, settings, or data

### Submission Flow

1. A translator opens the portal and navigates to their assigned locale
2. They edit empty or outdated translation values
3. Submitted values are saved with `source: portal_suggestion` and `is_published: false`
4. An admin reviews portal submissions in the main System Translations resource
5. Approved changes are published to `lang/` files

This two-step workflow ensures quality control while giving translators autonomy.

---

## Portal vs. Full Admin

| Capability | Full Admin | Translation Portal
|------------|-----------|-------------------
| Edit translations | ✅ | ✅
| Import/export CSV | ✅ | ❌
| Bulk translate | ✅ | ❌
| Publish to files | ✅ | ❌
| Scan codebase | ✅ | ❌
| View coverage | ✅ | ❌
| Access other resources | ✅ | ❌

---

## Customizing the Portal View

The portal view is rendered from:

```
resources/views/vendor/filament-translation-suite/pages/translation-portal.blade.php
```

You can publish and customize this view:

```bash
php artisan vendor:publish --tag=filament-translation-suite-views
```

---

## Disabling the Portal

If you don't work with external translators, disable the portal:

```php
'features' => [
    'portal' => false,
    // ...
],
```

---

## Next Steps

- **[CSV Import / Export](/filament-translation-suite/features/csv-import-export)** — Alternative workflow for external translators
- **[File Translations](/filament-translation-suite/features/file-translations)** — Review portal submissions in the admin interface
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Track translation progress across all contributors
