---
title: Delivery Monitoring & Retries
sidebar_position: 6
---

Every webhook call is logged, tracked, and recoverable. The Delivery Log gives you full visibility into what was sent, whether it succeeded, and why it failed. The health widget summarizes everything at a glance on your dashboard.

---

## Delivery Lifecycle

```
1. Model event fires
     ↓
2. Conditions evaluated, payload built
     ↓
3. AutomationDelivery record created → status: pending
     ↓
4. ProcessAutomationDelivery job queued
     ↓
5. HTTP POST to destination URL
     ├─ 2xx → status: success → AutomationDeliveryCompleted event
     └─ error → status: failed → AutomationDeliveryFailed event
                   ↓
              Retryable? → yes → backoff → retry
              Retryable? → no  → stay failed
```

---

## Delivery Log

Navigate to **Automation Bridge → Delivery Log** for a full table of every delivery.

### Table Columns

![Delivery Log](/filament-automation-bridge/assets/screenshots/delivery_log_list.png)

| Column | Description |
|---|---|
| **UUID** | Unique identifier auto-generated on creation |
| **Trigger** | Which automation triggered this delivery |
| **Model** | The Eloquent model record (if applicable) |
| **Status** | Pending, Success, Failed, or Cancelled — color-coded badge |
| **HTTP Status** | Response code from the destination server |
| **Duration** | Request time in milliseconds |
| **Retry Count** | How many attempts have been made |
| **Source** | `realtime`, `historical_sync`, `test`, or `manual_retry` |
| **Dispatched At** | When the HTTP call was actually made |
| **Completed At** | When the response was received (success or failure) |

### Filters

| Filter | Options |
|---|---|
| **Trigger** | Filter by specific automation trigger |
| **Status** | Pending, Success, Failed, Cancelled |
| **HTTP Status Range** | Min and max HTTP status code |
| **Source** | Realtime, Historical Sync, Test, Manual Retry |
| **Date Range** | Created at date filter |

### Delivery Details Slide-Over

Click any delivery row to open a detailed slide-over panel:

| Section | Contents |
|---|---|
| **Request** | Full JSON payload (syntax-highlighted), request headers |
| **Response** | Response headers, response body (truncated at 10,240 chars) |
| **Error** | Error message from the failed attempt |
| **Metadata** | UUID, trigger name, status badge, duration, retry count, source, timestamps |

Payload and response body are displayed as formatted JSON with copy-to-clipboard buttons.

![Delivery Details](/filament-automation-bridge/assets/screenshots/delivery_log_details.png)

---

## Retries

### When Retries Happen

Deliveries retry automatically when the HTTP response has a **retryable status code**:

```php
'retry' => [
    'retryable_status_codes' => [408, 429, 500, 502, 503, 504],
],
```

These indicate temporary server issues — a retry is likely to succeed.

### When Retries Do NOT Happen

Non-retryable status codes fail immediately:

```php
'non_retryable_status_codes' => [400, 401, 403, 404, 409, 422],
```

These indicate client errors — retrying won't fix the problem.

Guzzle connection errors (DNS failure, timeout, connection refused) are always retried.

### Backoff Strategy

Each attempt waits longer than the previous using exponential backoff:

| Attempt | Delay | Formula |
|---|---|---|
| 1st retry | 10ms | `base ^ 1` |
| 2nd retry | 100ms | `base ^ 2` |
| 3rd retry | 1,000ms | `base ^ 3` |
| 4th retry | 10,000ms | `base ^ 4` |

The base is configurable via `retry.backoff_base` (default: 10).

### Manual Retry

Failed deliveries can be retried manually from the Delivery Log:

- **Single** — Click the retry action on any failed delivery row
- **Bulk** — Select multiple failed deliveries and click Bulk Retry

Manual retries reset the retry counter and are marked with source `manual_retry`. A delivery can only be retried if:
- Its status is not Cancelled
- Its status is not Pending (already in flight)
- Its `retry_count` is less than its `max_retries`

---

## Health Widget

The `AutomationHealthWidget` sits on your Filament dashboard when `ui.register_health_widget` is `true`.

### Stat Cards

| Stat | Description |
|---|---|
| **Active Triggers** | Number of currently enabled triggers |
| **Last 24h** | Total deliveries dispatched in the last 24 hours |
| **Success Rate** | Color-coded: green (≥90%), yellow (≥70%), red (&lt;70%) |
| **Needs Attention** | Failed deliveries with exhausted retries — requires manual intervention |

### Recent Failures Table

The widget includes a compact table of the last 5 failed deliveries:

| Column | Description |
|---|---|
| **Trigger** | Trigger name |
| **Model** | Source model type and ID |
| **Error** | Truncated error message |
| **Time** | How long ago the failure occurred |
| **Action** | Retry button for each failed delivery |

The widget auto-refreshes every N seconds (configurable via `ui.polling_interval`, default: 5).

---

## Cancelling Pending Deliveries

Pending deliveries (status: `pending`, not yet dispatched) can be cancelled:

```php
use Ashrafic\FilamentAutomationBridge\Services\DeliveryService;

app(DeliveryService::class)->cancelPendingDeliveries($triggerId);
```

This is useful when deactivating a trigger or cleaning up after a config change.

---

## Delivery Log Retention

Delivery logs auto-prune via the daily scheduled task:

```php
'retention' => [
    'delivery_logs_days' => 90,
    'prune_enabled' => true,
],
```

Manually prune:

```bash
php artisan automation-bridge:prune-logs --days=30
php artisan automation-bridge:prune-logs --days=60 --dry-run
```

Add `--dry-run` to see how many records would be deleted without actually removing them.
