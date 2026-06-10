---
title: Translation Backups
---


## How It Works

The suite includes a `TranslationBackup` model and resource that tracks snapshots of your translation data. Every time you publish translations, a backup is automatically created before any changes are written to disk.

### Backup Model

Each backup record stores:
- **Snapshot data** — serialized translation state as JSON
- **Metadata** — key count, locale count, and files affected
- **Created at** — timestamp for restore point selection
- **User** — who triggered the backup (for audit trails)

---

## Creating Backups

### From the UI

Open **Translation Suite → Translation Backups** and click **"Create Backup"**. You can provide a custom label or accept the default. The snapshot is created instantly and appears in the backup list.

### Programmatically

You can also trigger backups from code:

```php
use Ashrafic\FilamentTranslationSuite\Services\Sync\BackupManager;

app(BackupManager::class)->create('pre_publish');
```

### Scheduled Backups

Add to your `App\Console\Kernel`:

```php
$schedule->call(function () {
    app(\Ashrafic\FilamentTranslationSuite\Services\Sync\BackupManager::class)
        ->create('scheduled');
})->daily();
```

### Pre-Publish Backups

Backups are automatically created before every **"Publish All"** operation. No configuration needed — it's a safety net that just works.

---

## Restoring from Backup

### From the UI

From the **Translation Backups** list, click **"Restore"** on any backup row. A confirmation modal shows the backup label, key count, and locale count, plus a clear warning that this will truncate the current database. If the backup file is missing or corrupted, the restore is aborted and the current database is left untouched.

### Programmatically

```php
use Ashrafic\FilamentTranslationSuite\Services\Sync\BackupManager;

$backup = TranslationBackup::latest()->first();
app(BackupManager::class)->restore($backup);
```

:::warning
Restoring a backup overwrites the current database state. Consider creating a new backup before restoring an old one, so you can undo the undo.
:::

---

## Backup Resource

The **Translation Backups** resource in your Filament panel provides a complete backup management interface:

### Table Columns

| Column | Description
|--------|-------------
| **Label** | Backup name (e.g., "Pre-publish: 2024-06-05 14:30:00")
| **Keys** | Number of translation keys in the snapshot
| **Locales** | Number of locales covered
| **Files** | Source files affected (truncated if many)
| **Created By** | User who triggered the backup, or "System"
| **Created** | Timestamp with relative formatting

### Actions

**Header Actions:**
- **Create Backup** — Manually snapshot the current translation database

**Row Actions:**
- **Restore** — Revert the database to this snapshot (with confirmation)
- **Download** — Export the backup JSON file
- **Delete** — Remove the backup record and its file

---

## Best Practices

1. **Backup before publishing** — especially when bulk translating or importing CSVs
2. **Schedule daily backups** — catch changes you might want to roll back
3. **Label your backups** — use descriptive types like `pre_bulk_deepl` or `before_agency_import`
4. **Test restores** — periodically verify that your backup/restore pipeline works

---

## Screenshot

The Translation Backups resource gives you full control over snapshots:

![Translation Backups](/filament-translation-suite/assets/screenshots/trans_backup.png)

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Understand what gets backed up
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Monitor translation health over time
