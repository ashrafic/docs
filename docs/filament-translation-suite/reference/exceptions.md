---
title: Exceptions
---

All exceptions are under the `Ashrafic\FilamentTranslationSuite\Exceptions` namespace. Each uses static factory methods for descriptive messages.

---

## Translation Exceptions

### `InvalidLocaleException`

Thrown when an invalid or unsupported locale is provided.

```php
throw InvalidLocaleException::notConfigured('xx');
```

### `TranslationNotFoundException`

Thrown when a requested translation key does not exist.

```php
throw TranslationNotFoundException::forKey('messages.welcome');
```

### `TranslationProviderException`

Thrown when a machine translation provider fails to process a request.

```php
throw TranslationProviderException::requestFailed('deepl', $statusCode);
```

---

## Import / Export Exceptions

### `ImportFailedException`

Thrown when a translation import operation fails.

```php
try {
    app(ImportManager::class)->importAll();
} catch (ImportFailedException $e) {
    Log::error('Translation import failed', ['message' => $e->getMessage()]);
}
```

### `PublishFailedException`

Thrown when publishing translations to `lang/` files fails.

### `BackupFailedException`

Thrown when creating or restoring a translation backup fails.

---

## Catching Exceptions

All exceptions extend Laravel's base exception class. Catch by type for granular handling:

```php
use Ashrafic\FilamentTranslationSuite\Exceptions\ImportFailedException;
use Ashrafic\FilamentTranslationSuite\Exceptions\BackupFailedException;
use Ashrafic\FilamentTranslationSuite\Exceptions\TranslationProviderException;

try {
    // Import translations
    app(ImportManager::class)->importAll();
} catch (ImportFailedException $e) {
    // Handle import failure
    session()->flash('error', 'Import failed. Check the logs.');
} catch (TranslationProviderException $e) {
    // Provider issues are usually transient
    session()->flash('warning', 'AI translation temporarily unavailable.');
} catch (BackupFailedException $e) {
    // Backup is critical — escalate
    Log::critical('Backup failed', ['error' => $e->getMessage()]);
}
```

---

:::tip Event-Driven Error Handling
For production applications, consider combining [Events](/filament-translation-suite/reference/events) with exception handling. Listen for failure events and catch exceptions for immediate UI feedback.
:::
