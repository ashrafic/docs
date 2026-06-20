---
title: Form Morphing
---


:::tip New to translatable models?
For a step-by-step walkthrough — model setup, auto-discovery, form morphing, table columns, and bulk translation — see the **[Content Models](/filament-translation-suite/features/content-models)** guide.
:::

Filament Translation Suite provides morphing components that wrap your translatable fields and render them with locale tabs, fieldsets, sections, or stacks. Wrap your fields in one of the suite's components:

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableTabs;

TranslatableTabs::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ]);
```

The suite detects that the underlying model has `title` and `body` in its `$translatable` array, and renders each field per locale inside the chosen layout.

---

## Morphing Modes

The suite provides four presentation modes for translatable fields:

### 1. Tabs Mode

Each translatable field gets its own set of locale tabs. Best for most forms.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableTabs;

TranslatableTabs::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ])
```

### 2. Fieldsets Mode

Each locale gets a fieldset border. A lighter visual grouping than sections.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableFieldsets;

TranslatableFieldsets::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ])
```

### 3. Sections Mode

Each locale gets its own section (collapsible card). Useful for long forms where you want to group all fields for a locale together.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableSections;

TranslatableSections::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ])
```

### 4. Stack Mode

All locales are displayed as vertically stacked inputs. Great when you want to see all translations at once without clicking tabs.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableStack;

TranslatableStack::make()
    ->schema([
        TextInput::make('title'),
        RichEditor::make('body'),
    ])
```

---

## Grouped Fields

Sometimes you want multiple fields to share a single locale switcher. Use the `TranslatableGroup` (or any of the grouping components) to wrap related fields:

```php
TranslatableStack::make()
    ->schema([
        TextInput::make('title'),
        Textarea::make('excerpt'),
        RichEditor::make('body'),
    ])
```

All three fields will share the same locale tabs, keeping your form compact.

---

---

## Column Span and Layout

All morphing components support Filament's standard layout options:

```php
TranslatableStack::make()
    ->columnSpanFull()
    ->columns(2)
    ->schema([
        TextInput::make('title')->columnSpan(1),
        TextInput::make('slug')->columnSpan(1),
        RichEditor::make('body')->columnSpanFull(),
    ])
```

---

## Locale Labels

The suite automatically adds flag emojis and language names to locale tabs:

```
🇬🇧 English    🇩🇪 Deutsch    🇫🇷 Français
```

This makes it immediately clear which locale you're editing, even for non-technical users.

---

## Screenshots

### Tabs Mode

The default presentation — each field gets its own locale tabs:

![Translatable Fields Tabs](/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png)

### Fieldsets Mode

A lighter bordered grouping per locale:

![Translatable Fields Fieldset](/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png)

### Sections Mode

Each locale wrapped in a collapsible section:

![Translatable Fields Sections](/filament-translation-suite/assets/screenshots/translatable_fields_sections.png)

### Stack Mode

All locales displayed vertically for quick comparison:

![Translatable Fields Stack](/filament-translation-suite/assets/screenshots/translatable_fields_stack.png)

### Locale Switcher

The locale switcher appears automatically in your form header:

![Language Switcher](/filament-translation-suite/assets/screenshots/lang_switcher.png)

---

## Table Columns

When displaying translatable data in Filament tables, use the `TranslatableColumn` to automatically show the value in the current locale, with graceful fallback to the default locale:

```php
use Ashrafic\FilamentTranslationSuite\Components\TranslatableColumn;

TranslatableColumn::make('title')
    ->fallbackLocale('en')
```

### How It Works

- Displays the translation for the **current application locale**
- If the current locale has no translation, it falls back to the configured `fallbackLocale`
- Fallback values are shown in *italics* with a locale badge (e.g., `(EN)`)
- If no translation exists at all, it shows **"Missing"**

This is especially useful in index tables where you want to show content in the admin's preferred language without manual locale handling.

---

## How It Works Under the Hood

When you wrap fields in a morphing component, the suite:

1. Detects if the form's model uses `HasTranslations`
2. Identifies which fields are in the model's `$translatable` array
3. Duplicates each translatable field for every configured locale
4. Maps each locale-specific field to the correct JSON path (`title->en`, `title->de`)
5. Handles fill and save automatically from the model's JSON column

---

## Next Steps

- **[Content Models](/filament-translation-suite/features/content-models)** — See how model discovery and form morphing work together
- **[Configuration](/filament-translation-suite/configuration)** — Customize available locales and their display labels
