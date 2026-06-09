---

# Getting Started

Welcome to **Filament Translation Suite** — the professional translation management system built natively for Laravel Filament.

This guide will walk you through installation, configuration, and your first translation workflow.

---

## Requirements

Before installing, ensure your environment meets the following requirements:

| Requirement | Version
|-------------|--------
| PHP | `^8.2`
| Laravel | `^11.0`
| Filament | `^5.0`
| spatie/laravel-translatable | `^6.0`

::: tip Optional Dependencies
Machine translation providers require their respective SDKs:
- `deeplcom/deepl-php` for DeepL
- `google/cloud-translate` for Google Cloud Translation
- No extra package needed for ChatGPT or Claude (uses HTTP directly)
:::

---

## Installation

Filament Translation Suite is distributed through [Anystack](https://anystack.sh). After purchasing your license, follow these steps:

### 1. Add the repository

```json
"repositories": [
    {
        "type": "composer",
        "url": "https://filament-translation-suite.composer.sh"
    }
]
```

### 2. Authenticate

```bash
composer config http-basic.filament-translation-suite.composer.sh EMAIL KEY
```

Replace `EMAIL` and `KEY` with the license credentials from your Anystack account.

### 3. Install the package

```bash
composer require ashrafic/filament-translation-suite
```

Run the install command to publish config and migrations:

```bash
php artisan filament-translation-suite:install
```

This command will:
1. Publish the configuration file to `config/filament-translation-suite.php`
2. Publish the migration files for the suite's database tables
3. Publish Laravel's default language files to your `lang/` directory

Run the migrations:

```bash
php artisan migrate
```

---

## Panel Registration

Register the plugin in your Filament Panel Provider:

```php
<?php

namespace App\Providers\Filament;

use Ashrafic\FilamentTranslationSuite\FilamentTranslationSuitePlugin;
use Filament\Panel;
use Filament\PanelProvider;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            // ... other configuration
            ->plugin(FilamentTranslationSuitePlugin::make());
    }
}
```

Once registered, a new **"Translation Suite"** navigation group will appear in your Filament panel with these pages:

- **System Translations** — File-based UI translation management
- **Content Translation** — Spatie translatable model management
- **Health Dashboard** — Unified coverage and activity reporting
- **Translation Portal** — External translator access page
- **Translation Backups** — Snapshot and restore management

---

## Quick Start Workflow

### 1. Import Existing Translations

Open **Translation Suite → System Translations** and click **"Import from Files"** to load all existing `lang/` translations into the database staging table.

### 2. Scan for Missing Strings

Click **"Scan Codebase"** to detect any `__()`, `trans()`, `trans_choice()`, or `@lang()` calls that don't exist in your translation database. Register missing keys in one click.

### 3. Translate

- Edit translations inline using the database-backed editor
- Use the **D** (DeepL) or **G** (Google) buttons for one-click machine translation on individual fields
- Run **Bulk Translate** from the header actions to translate thousands of keys via queue workers

### 4. Publish

When you're satisfied with your translations, click **"Publish All"** to write changes back to your `lang/` files. The publish process uses merge-safe writes — existing file values not in the database are preserved.

---

## Locale Switcher

The plugin automatically injects a **locale switcher** into your Filament panel's user menu. This lets you and your team change the application locale directly from the admin panel.

![Language Switcher](/filament-translation-suite/assets/screenshots/lang_switcher.png)

### How It Works

- The switcher appears in the **user menu dropdown** (top-right of your Filament panel)
- It lists all locales configured in `filament-translation-suite.locales`
- Each locale shows its flag emoji and native label
- Clicking a locale immediately switches the app locale and refreshes the page

### Middleware

The plugin registers a persistent middleware (`SetLocale`) that reads the locale from the session on every request. This ensures that:
- Translatable columns display values in the selected locale
- Filament's own translations render in the correct language
- Your application's locale-aware logic works seamlessly

You don't need to configure anything — the middleware is registered automatically when you add the plugin.

### Programmatic Locale Switching

You can also switch locales programmatically:

```php
// Redirect back to the previous page
return redirect()->route('fts.switch-locale', ['locale' => 'de']);
```

Or set it directly in the session:

```php
session()->put('locale', 'de');
app()->setLocale('de');
```

---

## Next Steps

- **[Configuration](/filament-translation-suite/configuration)** — Customize locales, providers, scanner paths, and more
- **[File Translations](/filament-translation-suite/features/file-translations)** — Deep dive into UI string management
- **[Content Models](/filament-translation-suite/features/content-models)** — Learn how model translations work
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Set up DeepL, Google, ChatGPT, and Claude

---

## Support

Filament Translation Suite is a commercial product sold through [Anystack](https://ashraficlabs.lemonsqueezy.com).

- **Documentation**: You're reading it
- **Website**: [ashraficlabs.com](https://ashraficlabs.com)
- **Purchases & Licenses**: Manage through your [Anystack dashboard](https://ashraficlabs.lemonsqueezy.com)
- **Licensing**: See our [Pricing page](/filament-translation-suite/pricing)
