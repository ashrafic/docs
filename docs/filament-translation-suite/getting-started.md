---
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Filament Translation Suite is a complete translation management system built natively for Laravel Filament. 

:::tip Before You Begin
Make sure you've completed [Installation](/filament-translation-suite/installation) and [Configuration](/filament-translation-suite/configuration) first. Once the package is [registered in your Filament panel](/filament-translation-suite/installation#panel-registration), you're ready to start translating.

By default, all users can access the suite. To restrict access, see [Authorization](/filament-translation-suite/authorization).
:::

This guide walks you through the full workflow — from scanning your codebase to publishing translations.

---

## Workflow

1. **Scan & Import** translation keys from your codebase and existing `lang/` files
2. **Edit** translations in the Filament UI — single key, bulk, or AI-powered
3. **Publish** changes back to `lang/` files with merge-safe writes

---

## Translation List

![System Translations List](/filament-translation-suite/assets/screenshots/sys_trans_list.png)

Browse all translations with dynamic columns for each locale. Search by key, group, or translation value. Filter by group, type (system vs vendor), missing translations, or unpublished changes.

---

## Importing Translations

![Importing Translations](/filament-translation-suite/assets/screenshots/system_trans_list_import.png)

Load translations from `lang/` files into the database. The suite preserves your existing translations — nothing is overwritten without confirmation.

### CSV Workflows

- **CSV Export** — Download all translations for external translators, agencies, or backup
- **CSV Import** — Upload translations from a CSV file. See [CSV Import / Export](/filament-translation-suite/features/csv-import-export) for the format.

---

## Content Translation

![Content Translation Page](/filament-translation-suite/assets/screenshots/content_trans_page.png)

Manage all your translatable database models in one place. The suite auto-discovers every model using Spatie's `HasTranslations` trait and shows coverage status at a glance.

![Bulk Content Translation](/filament-translation-suite/assets/screenshots/content_trans_bulk_trans.png)

**What you can do here:**
- See all translatable models with per-locale coverage
- Bulk translate entire models via background queues
- Check translation status without opening each record

:::tip Model Setup
Make sure your models are properly configured. See the [Content Models](/filament-translation-suite/features/content-models) guide for setup instructions.
:::

---

## Editing Individual Translations

Open any translation key to edit all locale values on a single page. Each locale field shows AI translation buttons (DeepL, Google, ChatGPT, Claude) when services are configured — click to translate that field instantly.

---

## Bulk AI Translation

![Bulk Translate Modal](/filament-translation-suite/assets/screenshots/sys_trans_bulk_trans_modal.png)

Translate an entire locale in seconds:

1. Click **Bulk Translate** from the translation list page
2. Select target language
3. Choose translation service (DeepL, Google, ChatGPT, or Claude)
4. Select mode: translate only untranslated values, or retranslate everything
5. Watch real-time progress

Laravel placeholders (`:name`, `:count`) and pluralization syntax are preserved automatically.

---

## Change Tracking

The suite tracks which translations have unpublished changes — values that differ from what is currently in `lang/` files.

**Visual indicators:**
- Table view: Modified locale values are highlighted
- Edit page: Each modified field shows the previous value from files
- Filter: Use "Has Unpublished Changes" to see only modified translations

This makes it clear exactly what will be written when you publish.

---

## Form Translation Views

To make a field translatable, apply one of the package's form classes to your Filament form schema. The suite provides four display modes:

![Translatable Fields Tabs](/filament-translation-suite/assets/screenshots/translatable_fields_tabs.png)

**Tabs** — Each locale gets its own tab above the field

![Form Sections](/filament-translation-suite/assets/screenshots/translatable_fields_sections.png)

**Sections** — Locales displayed as separate form sections

![Form Stack](/filament-translation-suite/assets/screenshots/translatable_fields_stack.png)

**Stack** — Locales stacked vertically with labels

![Form Fieldset](/filament-translation-suite/assets/screenshots/trans_fields_fieldset.png)

**Fieldset** — Locales grouped inside a fieldset

:::tip One Class Per Mode
Use the appropriate class from the package on each translatable field in your Filament resource form. See [Form Morphing](/filament-translation-suite/features/form-morphing) for code examples and class references.
:::

---

## Language Switcher

![Language Switcher](/filament-translation-suite/assets/screenshots/lang_switcher.png)

A locale switcher appears in the Filament header, letting you quickly change the current editing language. Available to any user with translation permissions — no need to navigate back to the translations page.

---

---

## Publishing

Click **Publish** to write all translations from the database to `lang/` files. Publishing:

- **Merges** rather than replaces — existing custom translations are preserved
- **Creates a backup** automatically before writing
- Only publishes translations with unpublished changes

---

## Health Dashboard

![Health Dashboard](/filament-translation-suite/assets/screenshots/health_dashboard.png)

Unified coverage reporting across file translations and content models.

![Recent Activity](/filament-translation-suite/assets/screenshots/health_dash_recent_activity.png)

Real-time activity feed with user attribution. Know exactly where your translations stand — and what's missing — at a glance. See [Health Dashboard](/filament-translation-suite/features/health-dashboard) for details.

---

## Backups

![Translation Backups](/filament-translation-suite/assets/screenshots/trans_backup.png)

Automatic backups before every publish. Any previous backup can be restored. See [Translation Backups](/filament-translation-suite/features/translation-backups) for details.

---

## Next Steps

- [Install the suite](/filament-translation-suite/installation)
- [Configure providers & locales](/filament-translation-suite/configuration)
- [Explore all features](/filament-translation-suite/features)
- [View pricing](/filament-translation-suite/pricing)
