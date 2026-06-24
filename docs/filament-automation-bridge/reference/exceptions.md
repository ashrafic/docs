---
title: Exceptions
---

All exceptions live under `Ashrafic\FilamentAutomationBridge\Exceptions`. Every exception extends `\RuntimeException` directly.

---

## Exception Hierarchy

```
\RuntimeException
├── TriggerNotFoundException
├── DeliveryFailedException
├── ModelNotFoundException
├── RateLimitException
├── InvalidPayloadException
├── SecurityException
└── ConditionEvaluationException
```

---

## Exception Reference

### TriggerNotFoundException

```
Ashrafic\FilamentAutomationBridge\Exceptions\TriggerNotFoundException
```

**Thrown when:** `TriggerManager::get()` is called with a trigger type key that was never registered.

```php
throw new TriggerNotFoundException($type);
// Message: "Unknown trigger type: some_unknown_key"
```

---

### DeliveryFailedException

```
Ashrafic\FilamentAutomationBridge\Exceptions\DeliveryFailedException
```

**Thrown when:**

1. `DeliveryService::retry()` is called on a delivery that cannot be retried (status is Cancelled, Pending, or retry_count >= max_retries)

```php
throw new DeliveryFailedException('Delivery cannot be retried.');
```

2. The service provider catches a Spatie `WebhookCallFailedEvent` and wraps the error

```php
throw new DeliveryFailedException($event->errorMessage ?? 'Automation call failed');
```

---

### ModelNotFoundException

```
Ashrafic\FilamentAutomationBridge\Exceptions\ModelNotFoundException
```

**Thrown when:** A model class string doesn't resolve to an existing class.

**Factory methods:**

| Method | Message | Called From |
|---|---|---|
| `forClass($class)` | `"Model class does not exist: {$class}"` | `PayloadBuilder::buildSample()`, `HistoricalSyncService::startSync()` |
| `forTrigger($id)` | `"Automation trigger with ID {$id} not found."` | Available for external use |
| `forDelivery($id)` | `"Automation delivery with ID {$id} not found."` | Available for external use |

`forTrigger()` and `forDelivery()` are defined but not called internally — use them in your own code.

---

### RateLimitException

```
Ashrafic\FilamentAutomationBridge\Exceptions\RateLimitException
```

**Thrown when:** The per-hostname rate limit bucket is full.

```php
throw new RateLimitException($hostname, $maxRequestsPerMinute);
// Message: "Rate limit exceeded for host 'hooks.zapier.com' (max 60 requests/min). Please retry later."
```

**Caught by:** `DeliveryService::dispatch()` and `dispatchGeneric()` — the delivery is marked as failed, a warning is logged, and the delivery is returned (not re-thrown).

---

### InvalidPayloadException

```
Ashrafic\FilamentAutomationBridge\Exceptions\InvalidPayloadException
```

**Thrown when:** Payload building fails validation or exceeds size limits.

**Properties:** `$errors` — array of validation error strings (populated when using `templateErrors()` factory).

**Factory methods:**

| Method | Message | Called From |
|---|---|---|
| `emptyTemplate()` | `"Custom payload template is empty."` | `PayloadBuilder::renderTemplate()` |
| `templateErrors($errors)` | `"Invalid payload template: {error1}; {error2}"` | `PayloadBuilder::renderTemplate()` |
| `invalidJson($error)` | `"Invalid JSON in payload template: {$error}"` | `PayloadBuilder::renderTemplate()` (2 places) |
| `payloadTooLarge($size, $maxSize)` | `"Payload size ({X}MB) exceeds maximum allowed size ({Y}MB)."` | `PayloadBuilder::validatePayloadSize()` |
| `classDoesNotExist($class)` | `"Model class does not exist: {$class}"` | Defined but not called internally |

---

### SecurityException

```
Ashrafic\FilamentAutomationBridge\Exceptions\SecurityException
```

**Thrown when:** URL validation fails for any of five security checks.

| Condition | Message |
|---|---|
| Empty URL string | `'URL cannot be empty.'` |
| Invalid URL format or missing scheme/host | `'Invalid URL format.'` |
| Scheme not in `allowed_schemes` | `"URL scheme '{$scheme}' is not allowed."` |
| HTTP URL in production when `require_https_in_production` is true | `'HTTP URLs are not allowed in production.'` |
| IP resolves to blocked range (localhost, private IPs) | `'URL resolves to a blocked IP address.'` |

All checks run in `SecurityService::validateUrl()`.

---

### ConditionEvaluationException

```
Ashrafic\FilamentAutomationBridge\Exceptions\ConditionEvaluationException
```

**Thrown when:** `ConditionRegistry::get()` is called with an unknown operator key.

```php
throw new ConditionEvaluationException("Condition operator [{$key}] not found.");
```

**Caught by:** `ConditionEvaluator::evaluateSingle()` — logged as a warning, the condition returns `false`.

---

## Catching Exceptions

### Granular Catch

Catch specific exceptions for precise error handling:

```php
use Ashrafic\FilamentAutomationBridge\Exceptions\InvalidPayloadException;
use Ashrafic\FilamentAutomationBridge\Exceptions\ModelNotFoundException;

try {
    $payload = $builder->build($trigger, $model, $event);
} catch (InvalidPayloadException $e) {
    // Payload-specific issue — review template or field mapping
    Log::error('Invalid payload', ['errors' => $e->errors]);
} catch (ModelNotFoundException $e) {
    // Model class no longer exists — deactivate trigger
    $trigger->update(['active' => false]);
}
```

### Catch-All

All exceptions extend `\RuntimeException`, so you can catch that for a broad handler:

```php
use Ashrafic\FilamentAutomationBridge\Exceptions\RateLimitException;

try {
    $service->dispatch($trigger, $model, $event);
} catch (RateLimitException $e) {
    // Handled internally by DeliveryService — won't reach here
    // But you can catch it if calling services directly
} catch (\RuntimeException $e) {
    Log::error('Automation bridge error', [
        'exception' => get_class($e),
        'message' => $e->getMessage(),
    ]);
}
```

:::tip Event-Driven Error Handling
For delivery failures, listen to `AutomationDeliveryFailed` instead of catching exceptions. The delivery is already persisted and the event carries both the delivery record and the error message — no need to wrap calls in try/catch.
:::
