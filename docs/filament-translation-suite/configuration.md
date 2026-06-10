---
title: Configuration
---


## Publishing the Config

If you didn't run the install command, publish the config manually:

```bash
php artisan vendor:publish --tag=filament-translation-suite-config
```

---

## Full Configuration Reference

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Fallback Locale
    |--------------------------------------------------------------------------
    | The default/source locale used as the base for translations.
    */
    'fallback_locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Supported Locales
    |--------------------------------------------------------------------------
    | The locales your application supports. These are used for file
    | translations, model translations, and the machine translation engine.
    */
    'locales' => ['en', 'de', 'fr'],

    /*
    |--------------------------------------------------------------------------
    | Available Locales Metadata
    |--------------------------------------------------------------------------
    | Display labels and flag emojis for each supported locale. Used in
    | the UI for locale switchers, dropdowns, and coverage reports.
    */
    'available_locales' => [
        'en' => ['label' => 'English', 'flag' => '🇬🇧'],
        'de' => ['label' => 'Deutsch', 'flag' => '🇩🇪'],
        'fr' => ['label' => 'Français', 'flag' => '🇫🇷'],
        // ... 30+ locales pre-configured
    ],

    /*
    |--------------------------------------------------------------------------
    | DeepL Configuration
    |--------------------------------------------------------------------------
    */
    'deepl' => [
        'api_key' => env('FTS_DEEPL_API_KEY'),
        'api_host' => env('FTS_DEEPL_API_HOST', 'api-free.deepl.com'),
        'formality' => 'default', // 'default', 'more', 'less'
    ],

    /*
    |--------------------------------------------------------------------------
    | Google Cloud Translation
    |--------------------------------------------------------------------------
    */
    'google_translate' => [
        'api_key' => env('FTS_GOOGLE_API_KEY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | OpenAI Configuration
    |--------------------------------------------------------------------------
    */
    'openai' => [
        'api_key' => env('FTS_OPENAI_API_KEY'),
        'model' => env('FTS_OPENAI_MODEL', 'gpt-4o-mini'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Anthropic Claude Configuration
    |--------------------------------------------------------------------------
    */
    'anthropic' => [
        'api_key' => env('FTS_ANTHROPIC_API_KEY'),
        'model' => env('FTS_ANTHROPIC_MODEL', 'claude-haiku-4-5-20251001'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Code Scanner
    |--------------------------------------------------------------------------
    | Configure which directories and translation functions to scan.
    */
    'scanner' => [
        'paths' => ['app', 'resources/views', 'routes'],
        'functions' => ['__', 'trans', 'trans_choice', '@lang'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Bulk Translation Queue
    |--------------------------------------------------------------------------
    | Configure how bulk translation jobs are dispatched.
    */
    'bulk_translation' => [
        'chunk_size' => 10,
        'queue' => 'default',
    ],

    /*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    | Customize the sidebar navigation group and sort order.
    */
    'navigation' => [
        'group' => 'Translation Suite',
        'sort' => 10,
    ],

    /*
    |--------------------------------------------------------------------------
    | Feature Toggles
    |--------------------------------------------------------------------------
    | Enable or disable individual features of the suite.
    */
    'features' => [
        'file_translation' => true,
        'content_translation' => true,
        'health_dashboard' => true,
        'webhooks' => true,
        'portal' => true,
        'auto_agent' => true,
    ],
];
```

---

## Environment Variables

Add these to your `.env` file:

```ini
# DeepL Machine Translation
FTS_DEEPL_API_KEY=your-deepl-auth-key
FTS_DEEPL_API_HOST=api-free.deepl.com

# Google Cloud Translation
FTS_GOOGLE_API_KEY=your-google-cloud-api-key

# OpenAI / ChatGPT
FTS_OPENAI_API_KEY=sk-...
FTS_OPENAI_MODEL=gpt-4o-mini

# Anthropic / Claude
FTS_ANTHROPIC_API_KEY=sk-ant-...
FTS_ANTHROPIC_MODEL=claude-haiku-4-5-20251001
```

:::tip DeepL Free vs Pro
Use `api-free.deepl.com` for free accounts and `api.deepl.com` for Pro accounts. The suite auto-detects which adapter is configured based on whether an API key is present.
:::

---

## Feature Toggles

You can disable individual features by setting them to `false` in the `features` array:

| Feature | Description
|---------|-------------
| `file_translation` | System Translations resource and file import/publish
| `content_translation` | Content Translation page for Spatie models
| `health_dashboard` | Health Dashboard coverage reporting
| `webhooks` | Webhook endpoints for Phrase, Crowdin, Lokalise
| `portal` | Translation Portal for external contributors
| `auto_agent` | Auto-Translation background monitor

---

## Customizing Locales

To add a new locale, update both `locales` and `available_locales`:

```php
'locales' => ['en', 'de', 'fr', 'ja'],

'available_locales' => [
    // ... existing locales
    'ja' => ['label' => '日本語', 'flag' => '🇯🇵'],
],
```

The `locales` array controls which locales are active for translation. The `available_locales` array provides display metadata.

---

## Scanner Configuration

Customize which directories and functions the code scanner monitors:

```php
'scanner' => [
    'paths' => ['app', 'resources/views', 'routes', 'custom'],
    'functions' => ['__', 'trans', 'trans_choice', '@lang', 'my_custom_trans'],
],
```

:::warning
The scanner only processes `.php` files. Blade templates with `@lang` directives are supported, but JavaScript files are not scanned.
:::

---

## Queue Configuration

Bulk translation jobs are dispatched to Laravel's queue system. Configure the chunk size and queue name:

```php
'bulk_translation' => [
    'chunk_size' => 20,  // Records per job
    'queue' => 'translations',  // Dedicated queue name
],
```

We recommend using a dedicated queue worker for translation jobs to avoid blocking your default queue.
