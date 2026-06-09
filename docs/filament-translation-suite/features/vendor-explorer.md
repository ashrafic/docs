
## The Vendor Translation Problem

When you install a Laravel package, its translations are loaded from the vendor directory. If you want to customize them, you traditionally have two options:

1. **Publish the package's language files** — `php artisan vendor:publish --lang` — but this copies *all* files, cluttering your `lang/` directory
2. **Edit vendor files directly** — changes are lost on `composer update`

The Vendor Explorer gives you a third, better option: browse vendor translations in the UI and selectively import the keys you want to override.

---

## How It Works

### Browsing Vendor Translations

From **System Translations**, vendor package translations are detected and imported with `source: vendor` during the initial import process.

Vendor keys appear in the table alongside your app keys, distinguished by the `vendor` source badge.

### Overriding Vendor Keys

When you edit a vendor translation key:
1. The modified value is saved to the database
2. On publish, it is written to your app's `lang/vendor/{package}` directory (or the appropriate group file)
3. Laravel's translation loader will prefer your override over the package default

### Tracking Overrides

The source badge and activity log make it easy to see which vendor keys you've customized. This is useful when upgrading packages — you can quickly review which translations might need re-verification.

---

## Supported Packages

The Vendor Explorer works with any Laravel package that provides translation files in the standard `resources/lang` or `lang` directory structure. This includes:

- Laravel Framework (validation, auth, pagination)
- Filament (table, form, notifications)
- Spatie packages
- Laravel Cashier / Spark / Nova
- Any custom package in your application

---

## Importing Vendor Translations

Vendor translations are imported automatically when you run **"Import from Files"** or **"Publish Laravel Lang Files"**. They are tagged with `source: vendor` so they don't mix with your app keys.

You can filter the System Translations table by source to view only vendor keys:

1. Open the **Source** filter dropdown
2. Select **"Vendor"**
3. Review and edit as needed

---

## Best Practices

- **Only override what you need** — don't import every vendor key if you only want to change a few
- **Document your overrides** — use the activity log to track why a vendor translation was changed
- **Re-review on package updates** — when you update a package, check if your overrides still make sense

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Manage all translations in one place
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — See vendor translation coverage alongside app translations
