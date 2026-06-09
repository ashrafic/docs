---

# File Translations

File translations — also called **System Translations** or **UI Translations** — are the strings that power your application's interface. They live in PHP array files and JSON files inside your `lang/` directory.

Filament Translation Suite turns these static files into a dynamic, database-backed workflow that's safe, auditable, and collaborative.

---

## The Problem with File-Only Workflows

Traditional Laravel translation management means editing PHP arrays directly:

```php
// lang/en/validation.php
return [
    'required' => 'The :attribute field is required.',
    'email' => 'The :attribute must be a valid email address.',
];
```

This approach breaks down at scale:
- ❌ No audit trail — you don't know who changed what or when
- ❌ No safe staging — every edit goes straight to version control
- ❌ No coverage visibility — you can't see which locales are incomplete
- ❌ No collaboration — giving repository access to translators is risky
- ❌ No machine translation integration — copy-pasting to DeepL is tedious

---

## The Database Staging Model

The suite imports your `lang/` files into a `system_translations` database table. This becomes your **source of truth** for editing. Changes are staged in the database until you're ready to publish them back to files.

### Benefits

- ✅ **Safe editing** — mistakes stay in the database until you publish
- ✅ **Audit trail** — every change is logged with user attribution
- ✅ **Coverage tracking** — see per-locale completion percentages in real time
- ✅ **Collaboration** — translators work in the Filament UI, not your repo
- ✅ **Machine translation** — one-click DeepL/Google/ChatGPT/Claude per field or in bulk
- ✅ **Merge-safe publishing** — the publish process preserves file values that aren't in the database

---

## Importing Translations

### From Existing Lang Files

Open **Translation Suite → System Translations** and click **"Import from Files"** in the header actions.

This scans your entire `lang/` directory and creates database records for every key. Already-imported keys are updated, not duplicated.

### Laravel Default Language Files

Click **"Publish Laravel Lang Files"** to copy Laravel's built-in validation and auth translations into your app's `lang/` directory, then import them into the database.

::: tip
Use **"Force Publish Laravel Lang Files"** only if you want to overwrite existing custom translations with Laravel defaults. This is destructive — use with caution.
:::

### From Code Scanner

After running the [Code Scanner](/filament-translation-suite/features/code-scanner), register missing keys directly. They are imported with `source: code_scanner` so you can track where they came from.

### From CSV

Use **"Import CSV"** to upload a spreadsheet of translations. See [CSV Import / Export](/filament-translation-suite/features/csv-import-export) for the expected format.

---

## Editing Translations

The System Translations resource provides a powerful table interface:

### Table Columns

| Column | Description
|--------|------------
| **Group** | The translation group (e.g., `validation`, `messages`)
| **Key** | The translation key within the group
| **Translations** | Preview of translated values with flag indicators
| **Published** | Whether the current database state has been written to `lang/` files
| **Source** | Where this key originated (file, vendor, code scanner, CSV, webhook)

### Inline Actions

Each row provides quick actions:

- **Edit** — Open the full editor with locale tabs
- **Usage** — See every place in your codebase where this translation key is used
- **Publish** — Write this single key back to its `lang/` file
- **Delete** — Remove from the database (does not delete from files)

### Bulk Operations

Header actions let you operate on the entire dataset:

- **Import Translations** — From files, Laravel defaults, or CSV
- **Export CSV** — Download all translations as a spreadsheet
- **Bulk Translate** — Queue machine translation for all untranslated keys
- **Scan Codebase** — Find and register missing translation keys
- **Publish All** — Write all database changes back to `lang/` files

---

## The Translation Editor

When editing a single translation, you get a clean form with:

- **Group** and **Key** — locked on edit to prevent accidental rekeying
- **Locale Stack** — a stacked input for every configured locale, showing the flag emoji and language name
- **Source** — visible on create to track provenance
- **Auto-Publish** — toggle to write changes to `lang/` files immediately after saving

---

## Publishing to Files

### Publish Single Key

Use the row action **"Publish"** to write one key back to its file. This is useful when you're making small, verified changes and want to keep files in sync incrementally.

### Publish All

Click **"Publish All"** to write every translation from the database back to the `lang/` directory.

The publish process is **merge-safe**:
- Database values are written to their respective files
- Existing file values that are **not** in the database are preserved
- New keys from the database are added
- No data is lost

::: tip
Keep the `auto_publish` toggle enabled on frequently-edited keys if you want changes to propagate to files immediately. For batch work, leave it off and run "Publish All" when you're done.
:::

---

## Filtering & Search

The table supports powerful filtering:

- **Group filter** — show only keys from a specific group
- **Published filter** — find unpublished (staged) changes
- **Source filter** — review keys from a specific origin
- **Search** — full-text search across group, key, and translation values

---

## Source Tracking

Every translation key carries a `source` label:

| Source | Meaning
|--------|--------
| `file` | Imported from existing `lang/` files
| `vendor` | Imported from a Composer package's translations
| `code_scanner` | Detected and registered by the code scanner
| `import_csv` | Imported via CSV upload
| `webhook_phrase` | Received from Phrase webhook
| `webhook_crowdin` | Received from Crowdin webhook
| `webhook_lokalise` | Received from Lokalise webhook
| `auto_deepl` | Translated by the Auto-Translation Agent
| `portal_suggestion` | Submitted via the Translation Portal

This provenance tracking helps you understand where your translations came from and whether they need human review.

---

## Screenshots

### System Translations List

The main interface for managing all your file-based translations:

![System Translations List](/filament-translation-suite/assets/screenshots/sys_trans_list.png)

### Bulk Translate Modal

Queue machine translation for hundreds of keys at once:

![Bulk Translate Modal](/filament-translation-suite/assets/screenshots/sys_trans_bulk_trans_modal.png)

---

## Next Steps

- **[Code Scanner](/filament-translation-suite/features/code-scanner)** — Find missing translation keys automatically
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Translate untranslated keys in bulk
- **[CSV Import / Export](/filament-translation-suite/features/csv-import-export)** — Work with external translators via spreadsheets
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — See your file translation coverage at a glance
