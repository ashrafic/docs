---

# CSV Import / Export

Working with professional translation agencies often means spreadsheets. The CSV Import / Export feature provides a clean round-trip workflow: export your translations, send them to your team, and import the completed file.

---

## Export

Click **"Export CSV"** from the **System Translations** header actions.

### What Gets Exported

Every translation in the database is included, with columns for:
- **group** — the translation group
- **key** — the translation key
- **{locale}** — one column per configured locale

Example:

```csv
group,key,en,de,fr
messages,welcome,Welcome,Willkommen,Bienvenue
messages,goodbye,Goodbye,Auf Wiedersehen,Au revoir
*,Hello,Hello,Hallo,Bonjour
auth,failed,These credentials do not match our records.,Diese Zugangsdaten stimmen nicht mit unseren Aufzeichnungen überein.,Ces identifiants ne correspondent pas à nos enregistrements.
```

### File Naming

Exported files are named `translations-YYYY-MM-DD.csv` with the current date.

---

## Import

Click **"Import CSV"** from the header actions and upload your completed spreadsheet.

### Expected Format

The CSV must have:
- A header row with `group, key,` followed by locale codes
- One row per translation key
- Empty cells are skipped (existing translations are preserved)

### Import Behavior

- **Existing keys** are updated with new values from the CSV
- **New keys** are created with `source: import_csv`
- **Empty cells** are ignored — they don't overwrite existing translations
- **Missing group or key** causes the row to be skipped

After import, you'll see a notification with the count of imported and skipped rows.

---

## Sample File

Not sure about the format? The import modal shows a live preview of the expected CSV structure, including sample data in all your configured locales.

You can also generate a sample file:

```php
use Ashrafic\FilamentTranslationSuite\Services\CsvHandler;

app(CsvHandler::class)->sample();
```

This returns a downloadable CSV with example rows in every configured locale.

---

## Round-Trip Workflow

Here's the typical workflow with an external translation agency:

1. **Export** your current translations from the System Translations page
2. **Send** the CSV to your agency with instructions
3. **Receive** the completed CSV back
4. **Import** the file — new translations are merged in
5. **Review** changes in the database (safe staging)
6. **Publish** to `lang/` files when satisfied

---

## Tips for Agencies

When sending CSVs to external translators:

- **Include the sample** so they understand the format
- **Lock the group and key columns** — translators should only edit locale columns
- **Provide context** — some strings need app context to translate accurately
- **Specify placeholders** — remind them not to translate `:name`, `:count`, etc.

---

## Next Steps

- **[Translation Portal](/filament-translation-suite/features/translation-portal)** — Give translators direct access without CSV files
- **[Webhooks](/filament-translation-suite/features/webhooks)** — Receive translations automatically from Phrase, Crowdin, or Lokalise
- **[File Translations](/filament-translation-suite/features/file-translations)** — Understand the database staging model
