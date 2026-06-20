---
title: Installation
---


## Requirements

Before installing, ensure your environment meets the following requirements:

| Requirement | Version
|-------------|--------
| PHP | `^8.2`
| Laravel | `^11.0`
| Filament | <code>^4.0 &#124;&#124; ^5.0</code>
| spatie/laravel-translatable | `^6.0`

:::tip Optional Dependencies
Machine translation providers require their respective SDKs:
- `deeplcom/deepl-php` for DeepL
- `google/cloud-translate` for Google Cloud Translation
- No extra package needed for ChatGPT or Claude (uses HTTP directly)
:::

---

## Installation
### Composer Registry

Filament Translation Suite is distributed through the **Ashrafic Labs Private Composer Registry**. After [purchasing your license](/filament-translation-suite/pricing), you'll receive a license key via email. You can also find it anytime in the [License Portal](https://packages.ashraficlabs.com/portal).

### 1. Add the repository

```json
"repositories": [
    {
        "type": "composer",
        "url": "https://packages.ashraficlabs.com"
    }
]
```

### 2. Authenticate

Use your license key for both username and password:

```bash
composer config http-basic.packages.ashraficlabs.com YOUR_EMAIL YOUR_LICENSE_KEY
```

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

## Content Translation Setup

To enable database content translation (blog posts, product descriptions, etc.), you need to configure your Eloquent models. The suite auto-discovers them and adds locale tabs to your Filament resource forms automatically.

### 1. Configure Your Model

Add the `HasTranslations` trait and define which fields are translatable:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Post extends Model
{
    use HasTranslations;

    protected array $translatable = ['title', 'slug', 'body', 'seo_description'];
}
```

That's it. The suite auto-discovers your model on the **Content Translation** page.

> **Spatie integration:** Filament Translation Suite uses `spatie/laravel-translatable` for all model translation storage. For advanced configuration (fallback locales, query scoping, etc.), see the [official Spatie docs](https://spatie.be/docs/laravel-translatable).

### 2. Apply Form Morphing Components

Wrap translatable fields in one of the suite's morphing components to enable locale tabs on your resource forms:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableTabs;
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableFieldsets;
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableSections;
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableStack;

// Tabs: each field gets its own locale tabs
TranslatableTabs::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

:::tip Full Walkthrough
For an end-to-end guide covering model discovery, form morphing modes, table columns, and bulk translation, see the **[Content Models](/filament-translation-suite/features/content-models)** feature page.
:::

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
- **[Content Models](/filament-translation-suite/features/content-models)** — Complete guide: model setup, form morphing, bulk translation
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Set up DeepL, Google, ChatGPT, and Claude

---

## Support

Filament Translation Suite is a commercial product. See [Pricing & Licensing](/filament-translation-suite/pricing) for details.

- **Documentation**: You're reading it
- **Website**: [ashraficlabs.com](https://ashraficlabs.com)
- **Purchases & Licenses**: Manage through the [License Portal](https://packages.ashraficlabs.com/portal)
- **Licensing**: See our [Pricing page](/filament-translation-suite/pricing)
