---

# Health Dashboard

The Health Dashboard is your mission control for translation health. It provides a unified, at-a-glance view of coverage across both file translations and content model translations, plus a real-time activity feed.

---

## Coverage Reporting

### Combined Coverage

The dashboard aggregates two types of coverage into a single percentage per locale:

1. **File Translation Coverage** — what percentage of your `lang/` keys have a non-empty translation
2. **Model Translation Coverage** — what percentage of translatable model fields have a non-empty translation

### Per-Locale Breakdown

For each configured locale, you see:

| Metric | Description
|--------|------------
| **Total Keys** | Combined count of file keys + model fields
| **Translated** | Count with non-empty values
| **Missing** | Count that need translation
| **Percentage** | Visual progress bar

This gives you a single number to track: "Our German translations are 87% complete."

---

## File Coverage Details

File coverage is calculated from the `system_translations` table:

```php
$total = SystemTranslation::count();
$translated = SystemTranslation::whereNotNull("values->{$locale}")
    ->where("values->{$locale}", '!=', '')
    ->count();
```

Every key in the database counts toward the total. A key is "translated" for a locale if it has a non-empty string value.

---

## Model Coverage Details

Model coverage is calculated by:

1. Discovering all Spatie translatable models
2. Counting `total_records * translatable_field_count` as the total
3. Counting records where the first translatable field has a non-empty value for the locale

This provides a fast approximation without scanning every field of every record.

---

## Activity Feed

The dashboard includes a real-time activity feed showing:

- **What happened** — import, export, translation, publish, scan
- **Who did it** — user attribution via the activity logger
- **When** — timestamp with "X minutes ago" formatting
- **Details** — counts, providers, and other context

Activities are stored in the `translation_activities` table and include:

| Activity | Trigger
|----------|--------
| `import` | Import from files, CSV, or webhook
| `export` | CSV export
| `translate` | Machine translation (individual or bulk)
| `publish` | Publishing to `lang/` files
| `scan` | Code scanner registration

---

## Using the Dashboard

### Daily Check

Make the Health Dashboard your first stop when managing translations:

1. Check the coverage percentage for your target locales
2. Identify which locale has the lowest coverage
3. Drill down into that locale's missing translations
4. Use bulk translation or the Translation Portal to fill gaps

### Team Reporting

The coverage percentages and activity feed are perfect for:
- **Sprint planning** — "We need to get French from 65% to 90% this sprint"
- **Stakeholder updates** — "German UI is 100% complete; content models at 78%"
- **Translator accountability** — "The agency imported 450 keys yesterday"

---

## Screenshots

### Health Dashboard Overview

Your mission control for translation coverage across the entire application:

![Health Dashboard](/filament-translation-suite/assets/screenshots/health_dashboard.png)

### Recent Activity Feed

Track every import, export, and translation with full attribution:

![Recent Activity](/filament-translation-suite/assets/screenshots/health_dash_recent_activity.png)

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Improve file translation coverage
- **[Content Models](/filament-translation-suite/features/content-models)** — Improve model translation coverage
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Bulk translate missing keys
