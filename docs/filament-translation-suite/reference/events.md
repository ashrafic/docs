---
title: Events
---

All events are under the `Ashrafic\FilamentTranslationSuite\Events` namespace. Every event uses Laravel's `Dispatchable` trait — listen with `Event::listen()` or standard Laravel event listeners.

---

## Translation Events

### `TranslationsImportedEvent`

Fires when language files are imported into the database.

| Property | Type | Description |
|----------|------|-------------|
| `$importedCount` | `int` | Number of translation keys imported |
| `$locale` | `string` | Target locale |

```php
Event::listen(TranslationsImportedEvent::class, function ($event) {
    Log::info("Imported {$event->importedCount} keys for {$event->locale}");
});
```

### `TranslationsPublishedEvent`

Fires when database translations are written back to `lang/` files.

| Property | Type | Description |
|----------|------|-------------|
| `$locales` | `array` | Locales that were published |
| `$count` | `int` | Total keys published |

```php
Event::listen(TranslationsPublishedEvent::class, function ($event) {
    Notification::route('slack', config('services.slack.webhook'))
        ->notify(new TranslationsPublishedNotification($event->locales));
});
```

### `TranslationSavedEvent`

Fires when a single translation key is saved.

| Property | Type | Description |
|----------|------|-------------|
| `$key` | `string` | Translation key |
| `$group` | `string` | Translation group |
| `$locale` | `string` | Locale |
| `$value` | `string` | New translation value |

### `TranslationDeletedEvent`

Fires when a single translation key is deleted.

| Property | Type | Description |
|----------|------|-------------|
| `$key` | `string` | Deleted translation key |
| `$group` | `string` | Translation group |

---

## Scanner Events

### `TranslationsScannedEvent`

Fires when the code scanner finds and registers missing translation keys.

| Property | Type | Description |
|----------|------|-------------|
| `$foundCount` | `int` | New keys discovered |
| `$registeredCount` | `int` | Keys successfully registered |

---

## Backup Events

### `BackupCreatedEvent`

Fires when a translation backup snapshot is created.

| Property | Type | Description |
|----------|------|-------------|
| `$filePath` | `string` | Path to the backup file |
| `$label` | `string` | Backup label |

```php
Event::listen(BackupCreatedEvent::class, function ($event) {
    Log::info('Translation backup created', [
        'path' => $event->filePath,
        'label' => $event->label,
    ]);
});
```

### `BackupRestoredEvent`

Fires when a backup is restored, overwriting current translations.

| Property | Type | Description |
|----------|------|-------------|
| `$filePath` | `string` | Path to the restored backup file |

---

## CSV Events

### `CsvImportedEvent`

Fires when a CSV file import completes.

| Property | Type | Description |
|----------|------|-------------|
| `$importedCount` | `int` | Number of translations imported |
| `$fileName` | `string` | Name of the imported file |

### `CsvExportedEvent`

Fires when a CSV export is triggered, before the download begins.

| Property | Type | Description |
|----------|------|-------------|
| *(none)* | | Event itself is the signal |

---

## Machine Translation Events

### `MachineTranslationStartedEvent`

Fires when a bulk AI translation job begins processing.

| Property | Type | Description |
|----------|------|-------------|
| `$provider` | `string` | Translation provider (deepl, google, openai, anthropic) |
| `$sourceLocale` | `string` | Source locale |
| `$targetLocale` | `string` | Target locale |
| `$totalKeys` | `int` | Total keys to translate |

### `MachineTranslationCompletedEvent`

Fires when a bulk AI translation job finishes.

| Property | Type | Description |
|----------|------|-------------|
| `$provider` | `string` | Translation provider |
| `$sourceLocale` | `string` | Source locale |
| `$targetLocale` | `string` | Target locale |
| `$translated` | `int` | Successfully translated count |
| `$failed` | `int` | Failed count |

```php
Event::listen(MachineTranslationCompletedEvent::class, function ($event) {
    AiUsageLog::create([
        'provider' => $event->provider,
        'locale' => $event->targetLocale,
        'translated' => $event->translated,
        'failed' => $event->failed,
    ]);
});
```

### `SingleTranslationCompletedEvent`

Fires when a single field is translated via the editor buttons.

| Property | Type | Description |
|----------|------|-------------|
| `$key` | `string` | Translation key |
| `$provider` | `string` | Translation provider used |
| `$locale` | `string` | Target locale |

---

## Webhook Event

### `WebhookTranslationReceivedEvent`

Fires when a webhook receives translations from an external platform.

| Property | Type | Description |
|----------|------|-------------|
| `$platform` | `string` | Platform (phrase, crowdin, lokalise) |
| `$translations` | `array` | Received translation data |

---

## Registering Listeners

Register in `AppServiceProvider::boot()` or a dedicated event service provider:

```php
use Ashrafic\FilamentTranslationSuite\Events\TranslationsPublishedEvent;
use Ashrafic\FilamentTranslationSuite\Events\BackupCreatedEvent;
use Ashrafic\FilamentTranslationSuite\Events\MachineTranslationCompletedEvent;
use Illuminate\Support\Facades\Event;

public function boot(): void
{
    Event::listen(TranslationsPublishedEvent::class, function ($event) {
        // Notify your team
    });

    Event::listen(BackupCreatedEvent::class, function ($event) {
        // Log the backup
    });

    Event::listen(MachineTranslationCompletedEvent::class, function ($event) {
        // Track AI usage
    });
}
```
