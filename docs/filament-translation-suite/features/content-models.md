---
title: Content Models
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks through setting up translatable database content — model configuration, auto-discovery, form morphing, table columns, bulk translation, and common patterns.

---

## Model Setup

Add the `HasTranslations` trait from `spatie/laravel-translatable` to your Eloquent model and define a `$translatable` array with the fields you want to translate:

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

For a model to be discovered and managed by the suite, it needs:

1. **The `HasTranslations` trait** from `spatie/laravel-translatable`
2. **A `$translatable` array** defining which fields are translatable
3. **To live in `app/Models`** (or a subdirectory thereof)

That's it. No extra configuration needed.

:::tip Spatie Integration
Filament Translation Suite stores all model translations via `spatie/laravel-translatable`. For advanced configuration options — fallback locales, query scoping, translation loading strategies — see the [official Spatie documentation](https://spatie.be/docs/laravel-translatable).
:::

---

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

## Form Morphing

Wrap translatable fields in one of the suite's morphing components to enable locale tabs on your resource forms:

<Tabs>
<TabItem value="tabs" label="Tabs">

Each translatable field gets its own locale tabs — best for most forms:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableTabs;

TranslatableTabs::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

![Form Tabs](/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png)

</TabItem>
<TabItem value="fieldsets" label="Fieldsets">

Each locale in a bordered fieldset — lighter visual grouping:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableFieldsets;

TranslatableFieldsets::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

![Form Fieldset](/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png)

</TabItem>
<TabItem value="sections" label="Sections">

Each locale in a collapsible section — good for long forms:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableSections;

TranslatableSections::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

![Form Sections](/filament-translation-suite/assets/screenshots/translatable_fields_sections.png)

</TabItem>
<TabItem value="stack" label="Stack">

All locales displayed vertically — best for quick comparison:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableStack;

TranslatableStack::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

![Form Stack](/filament-translation-suite/assets/screenshots/translatable_fields_stack.png)

</TabItem>
</Tabs>

For more details on how morphing works and all layout options, see the dedicated **[Form Morphing](/filament-translation-suite/features/form-morphing)** page.

---

## Table Columns

Display translatable values in Filament tables with automatic locale detection:

```php
use Ashrafic\FilamentTranslationSuite\Components\TranslatableColumn;

TranslatableColumn::make('title')
    ->fallbackLocale('en'),
```

- Displays the value in the **current application locale**
- Falls back to the configured `fallbackLocale` if the current locale has no translation
- Fallback values are shown in *italics* with a locale badge (e.g., `(EN)`)
- Shows **"Missing"** if no translation exists at all

---

## Bulk Translation

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

### Queue Configuration

```php
'bulk_translation' => [
    'chunk_size' => 20,       // Records per job
    'queue' => 'translations', // Dedicated queue name
],
```

Bulk translation uses Laravel's queue system. The job is chunked into batches so it won't overwhelm your queue workers or API rate limits. You'll receive a Filament notification when the batch completes.

---

## Coverage Tracking

The [Health Dashboard](/filament-translation-suite/features/health-dashboard) aggregates model coverage across your entire application:

- **Total translatable fields** — count of all translatable attributes × record count
- **Translated count** — fields that have a non-empty value for the locale
- **Missing count** — fields that need translation
- **Percentage** — visual coverage bar

This gives you a single number to track translation health across your content layer.

---

## Common Patterns

### Slug Fields

Keep slug fields outside the morphing component to stay in the source locale only:

```php
TextInput::make('slug'),
// ... other non-translatable fields

TranslatableTabs::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

### Grouped Fields

Wrap multiple related fields in a single morphing component so they share locale controls:

```php
TranslatableStack::make()
    ->schema([
        TextInput::make('title'),
        Textarea::make('excerpt'),
        RichEditor::make('body'),
    ]);
```

All three fields switch locales together, keeping the form compact.

### Layout Control

Morphing components support Filament's standard layout options:

```php
TranslatableStack::make()
    ->columnSpanFull()
    ->columns(2)
    ->schema([
        TextInput::make('title')->columnSpan(1),
        TextInput::make('slug')->columnSpan(1),
        RichEditor::make('body')->columnSpanFull(),
    ]);
```

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

- **[Form Morphing](/filament-translation-suite/features/form-morphing)** — Deep dive into all morphing modes and layout options
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Set up DeepL, Google, ChatGPT, and Claude
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Monitor content model coverage across your app
