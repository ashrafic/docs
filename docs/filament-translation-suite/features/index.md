---
title: Features
sidebar_label: Overview
sidebar_position: 1
---


## The Two Worlds of Translation

Every Laravel application deals with two distinct types of translations:

### 1. File-Based UI Translations
These are the strings your users see in buttons, labels, validation messages, and flash notifications. They live in `lang/en.json`, `lang/en/validation.php`, and similar files.

**The problem:** Editing PHP array files is tedious, error-prone, and doesn't scale. You can't give a non-technical translator access to your repository. You don't have audit trails. And you have no idea which strings are missing until a user reports it.

### 2. Database-Driven Content Translations
These are the translatable fields in your Eloquent models — blog post titles, product descriptions, page content. They typically use `spatie/laravel-translatable` to store JSON columns.

**The problem:** You manage these through Filament forms, but every translatable field needs manual locale tab setup. You can't see coverage across models. Bulk translation requires custom code. And your translators need full admin access.

---

## How the Suite Solves Both

Filament Translation Suite unifies both worlds into a single, coherent interface inside your Filament panel:

| Capability | File Translations | Model Translations
|------------|-------------------|-------------------
| **Database staging** | ✅ Import `lang/` files safely | ✅ Auto-discovers all Spatie models
| **Coverage tracking** | ✅ Per-locale percentage | ✅ Per-model, per-locale bars
| **Machine translation** | ✅ DeepL, Google, ChatGPT, Claude | ✅ Same engines, bulk dispatch
| **Collaboration** | ✅ Translation Portal, CSV, Webhooks | ✅ Portal access, bulk export
| **Audit & restore** | ✅ Activity log, backups | ✅ Included in unified health view
| **Zero-config forms** | N/A | ✅ Automatic locale tabs on every field

---

## Feature Map

### Core Translation Management
- **[File Translations](/filament-translation-suite/features/file-translations)** — Import, edit, and publish `lang/` files via database staging
- **[Content Models](/filament-translation-suite/features/content-models)** — Auto-detect and manage Spatie translatable models
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — DeepL, Google Translate, ChatGPT, and Claude integration
- **[Form Morphing](/filament-translation-suite/features/form-morphing)** — Automatic locale tabs, stacks, sections, and fieldsets

### Discovery & Workflow
- **[Code Scanner](/filament-translation-suite/features/code-scanner)** — Detect translation usage across your codebase
- **[Vendor Explorer](/filament-translation-suite/features/vendor-explorer)** — Browse and override vendor package translations
- **[CSV Import / Export](/filament-translation-suite/features/csv-import-export)** — Round-trip workflow for external translators

### Monitoring & Automation
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Unified coverage and activity reporting
- **[Auto-Translation Agent](/filament-translation-suite/features/auto-translation-agent)** — Background monitor for untranslated strings
- **[Translation Backups](/filament-translation-suite/features/translation-backups)** — Snapshot and restore translation states

### Collaboration
- **[Translation Portal](/filament-translation-suite/features/translation-portal)** — Permission-gated page for external contributors
- **[Webhooks](/filament-translation-suite/features/webhooks)** — Receive translations from Phrase, Crowdin, and Lokalise

---

## Architecture Philosophy

### Zero Configuration Where Possible

The suite is designed to work out of the box. Install it, register the plugin, and your existing Spatie models automatically get locale tabs. Your existing `lang/` files are importable with one click. The code scanner finds your translation functions automatically.

### Non-Destructive by Default

Every write operation is safe. Publishing to `lang/` files merges rather than replaces. Bulk translation never overwrites existing values. Backups are created automatically. You can always undo.

### Queue-First for Scale

Bulk operations dispatch to Laravel's queue system. Whether you're translating 10 keys or 10,000 model records, the UI stays responsive and your users are never blocked.

### Pluralization & Placeholder Preservation

The suite understands Laravel's translation conventions. `:name`, `:count`, `:attribute`, and `|` pluralization patterns are stripped before machine translation and restored after, ensuring your translated strings remain valid Laravel translation keys.

---

## Next Steps

Dive into the feature that matters most to your workflow:

- **New to the suite?** Start with [File Translations](/filament-translation-suite/features/file-translations) and [Getting Started](/filament-translation-suite/getting-started)
- **Already have Spatie models?** Jump to [Content Models](/filament-translation-suite/features/content-models) and [Form Morphing](/filament-translation-suite/features/form-morphing)
- **Need to translate fast?** Check out [Machine Translation](/filament-translation-suite/features/machine-translation)
- **Working with a translation agency?** See [CSV Import / Export](/filament-translation-suite/features/csv-import-export) and the [Translation Portal](/filament-translation-suite/features/translation-portal)
