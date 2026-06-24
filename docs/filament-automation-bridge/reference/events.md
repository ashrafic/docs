---
title: Events
---

All events live under the `Ashrafic\FilamentAutomationBridge\Events` namespace. Every event uses Laravel's `Dispatchable` and `SerializesModels` traits, supporting `::dispatch()` for manual firing and proper queue serialization.

---

## Event Overview (8 events)

| # | Event | Fires When |
|---|---|---|
| 1 | `TriggerChanged` | Trigger is created, updated, or deleted |
| 2 | `TriggerActivated` | Trigger's `active` toggles from `false` to `true` |
| 3 | `TriggerDeactivated` | Trigger's `active` toggles from `true` to `false` |
| 4 | `AutomationDispatched` | Delivery is queued successfully |
| 5 | `AutomationDeliveryCompleted` | HTTP delivery succeeds (2xx) |
| 6 | `AutomationDeliveryFailed` | HTTP delivery fails (non-retryable or all retries exhausted) |
| 7 | `RateLimitHit` | Rate limit exceeded for a destination hostname (informational) |
| 8 | `HistoricalSyncCompleted` | A historical sync batch completes processing all records |

---

## Trigger Lifecycle Events

### TriggerChanged

```
Ashrafic\FilamentAutomationBridge\Events\TriggerChanged
```

Fires on every save or delete of an `AutomationTrigger` model — dispatched from the model's `booted()` lifecycle hooks.

| Property | Type | Description |
|---|---|---|
| `$trigger` | `AutomationTrigger` | The fully hydrated trigger model |
| `$action` | `string` | `'created'`, `'updated'`, or `'deleted'` |

**Use cases:**
- Audit logging of trigger configuration changes
- Sync trigger state to external configuration management
- Notify team when automations are modified
- Rebuild internal trigger indexes or caches

### TriggerActivated

```
Ashrafic\FilamentAutomationBridge\Events\TriggerActivated
```

Fires when an existing trigger's `active` column changes from `false` to `true`.

| Property | Type |
|---|---|
| `$trigger` | `AutomationTrigger` |

**Use cases:**
- Log activation events for compliance
- Send notification that an automation went live
- Trigger an initial sync of the first matching records

### TriggerDeactivated

```
Ashrafic\FilamentAutomationBridge\Events\TriggerDeactivated
```

Fires when an existing trigger's `active` column changes from `true` to `false`.

| Property | Type |
|---|---|
| `$trigger` | `AutomationTrigger` |

**Use cases:**
- Cancel pending deliveries for the deactivated trigger
- Alert team that an automation was paused
- Clean up any trigger-specific resources

---

## Delivery Events

### AutomationDispatched

```
Ashrafic\FilamentAutomationBridge\Events\AutomationDispatched
```

Fires after a delivery record is created and the `ProcessAutomationDelivery` job is queued. This is the "optimistic" event — it fires before the HTTP call is made.

| Property | Type |
|---|---|
| `$delivery` | `AutomationDelivery` |

**Use cases:**
- Record delivery attempt counts for analytics
- Log dispatch events to external monitoring
- Track delivery volume per trigger

### AutomationDeliveryCompleted

```
Ashrafic\FilamentAutomationBridge\Events\AutomationDeliveryCompleted
```

Fires when the HTTP delivery receives a 2xx response (or in sandbox mode, after logging).

| Property | Type |
|---|---|
| `$delivery` | `AutomationDelivery` |

The delivery is hydrated and persisted — access `$delivery->http_status`, `$delivery->response_body`, `$delivery->duration_ms`.

**Use cases:**
- Log successful deliveries
- Trigger downstream workflows on successful webhook calls
- Aggregate success metrics per destination

### AutomationDeliveryFailed

```
Ashrafic\FilamentAutomationBridge\Events\AutomationDeliveryFailed
```

Fires when HTTP delivery fails — non-retryable status, GuzzleException, or after the job's `failed()` method runs when all retries are exhausted.

| Property | Type |
|---|---|
| `$delivery` | `AutomationDelivery` |
| `$errorMessage` | `string` |

**Use cases:**
- Alert on-call team about failing webhooks
- Log failure details to error tracking (Sentry, Bugsnag)
- Automatically deactivate triggers with consistent failures
- Trigger fallback workflows when automations break

---

## Rate Limiting Events

### RateLimitHit

```
Ashrafic\FilamentAutomationBridge\Events\RateLimitHit
```

Fires when the per-hostname rate limit is exceeded, immediately before the `RateLimitException` is thrown.

| Property | Type |
|---|---|
| `$hostname` | `string` |
| `$trigger` | `?AutomationTrigger` |

**Use cases:**
- Monitor rate limit incidents
- Dynamically adjust rate limits based on demand
- Alert when a destination is being throttled

---

## Sync Events

### HistoricalSyncCompleted

```
Ashrafic\FilamentAutomationBridge\Events\HistoricalSyncCompleted
```

Fires when all batches of a historical sync finish processing.

| Property | Type |
|---|---|
| `$batchUuid` | `string` |
| `$total` | `int` |
| `$successful` | `int` |
| `$failed` | `int` |

**Use cases:**
- Log sync completion for audit
- Trigger a post-sync verification step
- Report sync results to a dashboard
- Chain another sync after one finishes

---

## Registering Listeners

Register event listeners in your `AppServiceProvider::boot()` or a dedicated event service provider:

```php
use Ashrafic\FilamentAutomationBridge\Events\AutomationDeliveryFailed;
use Ashrafic\FilamentAutomationBridge\Events\TriggerActivated;
use Illuminate\Support\Facades\Event;

public function boot(): void
{
    Event::listen(AutomationDeliveryFailed::class, function ($event) {
        \Log::error('Webhook delivery failed', [
            'trigger_id' => $event->delivery->trigger_id,
            'error' => $event->errorMessage,
            'http_status' => $event->delivery->http_status,
        ]);
    });

    Event::listen(TriggerActivated::class, function ($event) {
        // Notify team, start monitoring, etc.
    });
}
```

Dedicated listener class:

```php
Event::listen(
    AutomationDeliveryFailed::class,
    \App\Listeners\AlertOnFailedWebhook::class,
);
```

All events support `::dispatch()` for manual firing in tests or custom logic.
