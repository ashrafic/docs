---
title: Form Morphing
---


## The Problem

When using `spatie/laravel-translatable`, you traditionally have to manually configure locale tabs for every field:

```php
use Filament\Forms\Components\Tabs;

Tabs::make('Translations')
    ->tabs([
        Tabs\Tab::make('English')
            ->schema([
                TextInput::make('title'),
                RichEditor::make('body'),
            ]),
        Tabs\Tab::make('German')
            ->schema([
                TextInput::make('title'),
                RichEditor::make('body'),
            ]),
        // ... repeat for every locale
    ])
```

This is tedious, error-prone, and makes your form definitions explode in size.

---

## The Solution

Filament Translation Suite uses a morphing system that wraps your form components automatically. You write your forms exactly as before:

```php
TextInput::make('title')
RichEditor::make('body')
```

The suite detects that the underlying model has `title` and `body` in its `$translatable` array, and automatically renders them with locale-aware UI.

---

## Morphing Modes

The suite provides four presentation modes for translatable fields:

### 1. Tabs Mode (Default)

Each translatable field gets its own set of locale tabs. This is the default behavior and works well for most forms.

```php
// No extra code needed — happens automatically
TextInput::make('title')
```

### 2. Stack Mode

All locales are displayed as vertically stacked inputs. Great when you want to see all translations at once without clicking tabs.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableStack;

TranslatableStack::make()
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

### 4. Fieldsets Mode

Each locale gets a fieldset border. A lighter visual grouping than sections.

```php
use Ashrafic\FilamentTranslationSuite\Forms\Components\TranslatableFieldsets;

TranslatableFieldsets::make()
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

## Per-Field Mode Override

You can override the mode for individual fields:

```php
// Default is tabs
TextInput::make('title')

// Force stacked presentation
TextInput::make('description')->translatableMode('stacked')

// Hide all locales except source (useful for slugs)
TextInput::make('slug')->translatableMode('hidden')
```

Available modes:

| Mode | Behavior
|------|----------
| `tabs` | Each field gets locale tabs (default)
| `stacked` | All locales visible vertically
| `sections` | Each locale in a collapsible section
| `fieldsets` | Each locale in a bordered fieldset
| `hidden` | Only the source locale is shown

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

### Stack Mode

All locales displayed vertically for quick comparison:

![Translatable Fields Stack](/filament-translation-suite/assets/screenshots/translatable_fields_stack.png)

### Sections Mode

Each locale wrapped in a collapsible section:

![Translatable Fields Sections](/filament-translation-suite/assets/screenshots/translatable_fields_sections.png)

### Fieldsets Mode

A lighter bordered grouping per locale:

![Translatable Fields Fieldset](/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png)

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

The suite registers a form fill hook that:

1. Detects if the form's model uses `HasTranslations`
2. Identifies which fields are in the model's `$translatable` array
3. Wraps those fields in the configured morphing component
4. Duplicates the field schema for each configured locale
5. Maps each locale-specific field to the correct JSON path (`title->en`, `title->de`)
6. Handles fill and save automatically

All of this happens at runtime. Your form definitions stay clean and maintainable.

---

## Next Steps

- **[Content Models](/filament-translation-suite/features/content-models)** — See how model discovery and form morphing work together
- **[Configuration](/filament-translation-suite/configuration)** — Customize available locales and their display labels
