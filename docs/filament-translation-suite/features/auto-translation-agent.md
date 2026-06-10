---
title: Auto-Translation Agent
---


## How It Works

The agent runs on a scheduled interval (every 5 minutes by default) and performs two checks:

### 1. File Translation Monitoring

The agent scans for:
- System translations with `source: code_scanner`
- Empty values (`NULL` or empty string)
- Locales other than the fallback locale

For each untranslated key, it:
1. Finds the source locale value (e.g., the English version)
2. Uses DeepL (if configured) to translate the value
3. Preserves placeholders and pluralization patterns
4. Saves the result with `source: auto_deepl`

### 2. Content Model Monitoring

The agent scans all discovered Spatie translatable models and:
- Identifies records missing translations for each non-fallback locale
- Dispatches `BulkTranslationJob` in chunks of `bulk_translation.chunk_size`
- Uses DeepL as the default provider

---

## Configuration

The agent is configured via the `features` array:

```php
'features' => [
    'auto_agent' => true,
    // ...
],
```

And the schedule is registered automatically in the service provider:

```php
$schedule->call(fn () => app(AutoTranslationMonitor::class)->scan())
    ->everyFiveMinutes();
```

:::tip
Make sure your Laravel scheduler is running. Add this cron entry:
```bash
* * * * * cd /path/to/your-project && php artisan schedule:run >> /dev/null 2>&1
```
:::

---

## Requirements

For the agent to function, you need:

1. **DeepL configured** — the agent specifically uses `DeepLAdapter` for automatic translation
2. **Queue workers running** — bulk model translations are dispatched as queue jobs
3. **Scheduler running** — the agent runs on Laravel's schedule, not as a daemon

Add to `.env`:

```ini
FTS_DEEPL_API_KEY=your-deepl-auth-key
```

---

## What Gets Translated Automatically

| Type | Trigger | Provider
|------|---------|--------
| File keys from code scanner | Empty value, non-fallback locale | DeepL
| Model fields | Missing translation, non-fallback locale | DeepL (via queue)

Keys from other sources (manual entry, CSV import, webhooks) are **not** auto-translated — the agent only targets scanner-detected keys to avoid overwriting human-reviewed translations.

---

## Review Before Publishing

Auto-translated values are saved to the database with `is_published: false`. This means:

- They won't be written to `lang/` files automatically
- You can review them in the System Translations resource
- Human translators can refine machine-generated text
- You publish when satisfied

This safety net prevents low-quality machine translations from reaching production.

---

## Disabling the Agent

If you prefer fully manual translation workflows:

```php
'features' => [
    'auto_agent' => false,
    // ...
],
```

---

## Performance Considerations

- The agent scans only `chunk_size` records per model per run to avoid overwhelming your queue
- File translation happens synchronously during the scheduled call (one API call per untranslated key)
- Model translation dispatches queue jobs, so the schedule call itself is fast
- Consider increasing the schedule interval if you have many untranslated keys:
  ```php
  ->everyThirtyMinutes() // instead of everyFiveMinutes()
  ```

---

## Next Steps

- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Understand how DeepL integration works
- **[File Translations](/filament-translation-suite/features/file-translations)** — Review and publish auto-translated keys
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Monitor auto-translation progress
