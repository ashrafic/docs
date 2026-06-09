
## Auto-Discovery

The suite automatically scans your `app/Models` directory and identifies every model that uses the `HasTranslations` trait.

For each discovered model, it calculates:
- **Translatable fields** — which attributes are configured for translation
- **Total records** — how many rows exist in the table
- **Per-locale coverage** — how many records have translations for each locale

All of this appears in **Translation Suite → Content Translation** without writing a single line of configuration.

---

## The Content Translation Page

Open **Translation Suite → Content Translation** to see a dashboard of all your translatable models.

### Model Cards

Each model is displayed as a card with:
- **Model name** and table name
- **Record count** — total rows in the database
- **Translatable fields** — list of attributes that support translation
- **Coverage bars** — visual progress indicator for each locale

### Coverage Calculation

Coverage is calculated per-locale by checking whether the first translatable field has a non-empty value for that locale. This gives you a reliable approximation of translation completeness without expensive full-table scans.

---

## Editing Model Translations

Click any model card to browse its records and edit translations.

### Inline Editing

Each translatable field in the model's Filament form automatically gets locale tabs thanks to [Form Morphing](/filament-translation-suite/features/form-morphing). You don't need to configure anything — the suite intercepts your existing form schema and adds translation capabilities.

### Per-Record Translation

Navigate to a specific record in your model's resource (e.g., `Edit Post`) and every translatable field will show tabs for each configured locale.

---

## Bulk Translation for Models

Translating content model records one by one doesn't scale. The suite provides bulk translation for entire model tables.

### How It Works

1. From the Content Translation page, click **"Bulk Translate"** on any model card
2. Select:
   - **Source Locale** — the language to translate from
   - **Target Locale** — the language to translate into
   - **Provider** — DeepL, Google, ChatGPT, or Claude
3. The suite dispatches a background queue job that:
   - Loads records missing the target locale translation
   - Translates each translatable field using the selected provider
   - Preserves placeholders and pluralization patterns
   - Saves translations back to the database

### Queue-Based Processing

Bulk translation uses Laravel's queue system. The job is chunked into batches (configurable via `bulk_translation.chunk_size`) so it won't overwhelm your queue workers or API rate limits.

You'll receive a Filament notification when the batch completes.

::: tip
Use a dedicated queue for translations to avoid blocking other background jobs:
```php
'bulk_translation' => [
    'queue' => 'translations',
],
```
:::

---

## Coverage Tracking

The [Health Dashboard](/filament-translation-suite/features/health-dashboard) aggregates model coverage across your entire application:

- **Total translatable fields** — count of all translatable attributes × record count
- **Translated count** — fields that have a non-empty value for the locale
- **Missing count** — fields that need translation
- **Percentage** — visual coverage bar

This gives you a single number to track translation health across your content layer.

---

## Model Requirements

For a model to be discovered and managed by the suite, it needs:

1. **The `HasTranslations` trait** from `spatie/laravel-translatable`
2. **A `$translatable` array** defining which fields are translatable
3. **To live in `app/Models`** (or a subdirectory thereof)

Example:

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

That's it. No extra configuration needed.

---

## Screenshots

### Content Translation Page

The dashboard showing all your translatable models with coverage tracking:

![Content Translation Page](/filament-translation-suite/assets/screenshots/content_trans_page.png)

### Bulk Translate for Models

Queue bulk translation for an entire model table:

![Content Bulk Translate](/filament-translation-suite/assets/screenshots/content_trans_bulk_trans.png)

---

## Limitations

- The suite only discovers models in `app/Models` and its subdirectories
- Models must be instantiable (not abstract) and must extend `Illuminate\Database\Eloquent\Model`
- Coverage calculation checks the first translatable field per record as a proxy for full record translation

---

## Next Steps

- **[Form Morphing](/filament-translation-suite/features/form-morphing)** — Learn how locale tabs appear automatically in your forms
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Set up DeepL, Google, ChatGPT, and Claude
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Monitor content model coverage across your app
