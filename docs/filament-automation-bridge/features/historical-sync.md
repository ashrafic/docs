---
title: Historical Sync
sidebar_position: 7
---

Triggers only fire when events happen _after_ they're created. But what about the records that already exist? Historical Sync lets you backfill every existing record into any automation — bringing your automations up to date with data that predates the trigger.

---

## How It Works

1. Select a trigger from the list
2. Choose "Sync Historical Records" from the action menu
3. The bridge queries all records of the trigger's model
4. Conditions are evaluated against each record (unless `--no-conditions` is specified)
5. Qualifying records are chunked into batches and dispatched via the queue
6. Progress is tracked via cache keys — retrieved at any time

---

## Starting a Sync

### From the UI

1. Navigate to **Automation Bridge → Triggers**
2. Open the action menu on any trigger
3. Click **Sync Historical Records**
4. Configure batch options (optional)
5. Confirm to start

### From the CLI

```bash
php artisan automation-bridge:sync 5
php artisan automation-bridge:sync 5 --batch=200
php artisan automation-bridge:sync 5 --no-conditions
```

Parameters:

| Parameter | Description |
|---|---|
| `triggerId` | The ID of the automation trigger (required) |
| `--batch=` | Records per batch (default: config `historical_sync.batch_size`, 100) |
| `--no-conditions` | Skip condition evaluation — sync every record |

---

## Batch Configuration

Control chunk size and timing:

```php
'historical_sync' => [
    'batch_size' => 100,         // Records per batch
    'max_batch_size' => 1000,    // Maximum allowed batch size
    'batch_delay_seconds' => 1,  // Delay between batches
],
```

Larger batches mean fewer queue jobs but higher memory usage per job. The `max_batch_size` prevents accidental oversized batches from the CLI `--batch` flag.

---

## Progress Tracking

Sync progress is stored in cache with atomic locks to prevent race conditions:

```php
// Cache keys (per batch UUID):
"automation_bridge.sync.{$batchUuid}.progress"     // processed, total, successful, failed
"automation_bridge.sync.{$batchUuid}.status"        // running, completed, cancelled
```

### Checking Progress

Sync progress is stored in a single cache key per batch UUID. The value is an array with `processed`, `total`, `successful`, `failed`, and `status` fields:

```php
$data = Cache::get("automation_bridge.sync.{$batchUuid}");
// $data['processed'] / $data['total'] → percentage
// $data['status'] → 'running', 'completed', or 'cancelled'
```

The `HistoricalSyncCompleted` event fires when all batches are done, carrying the final counts:

```php
use Ashrafic\FilamentAutomationBridge\Events\HistoricalSyncCompleted;

Event::listen(HistoricalSyncCompleted::class, function ($event) {
    // $event->batchUuid, $event->total, $event->successful, $event->failed
    Log::info("Sync {$event->batchUuid} done: {$event->successful}/{$event->total}");
});
```

See [Events](/filament-automation-bridge/reference/events) for all event details.

---

## Cancelling a Sync

Cancel an in-progress sync from the UI or programmatically:

```php
use Ashrafic\FilamentAutomationBridge\Services\HistoricalSyncService;

app(HistoricalSyncService::class)->cancelSync($batchUuid);
```

Cancellation:
- Sets the cache status to `cancelled`
- In-progress batches will complete their current chunk
- Remaining batches will detect the cancelled status and skip

---

## Queue Configuration

Historical sync jobs use a dedicated queue name:

```php
'queue' => [
    'historical_sync_queue_name' => 'webhooks-sync',
],
```

Start the worker for both queues:

```bash
php artisan queue:work --queue=webhooks,webhooks-sync
```

---

## Programmatic Sync

Start a sync outside the UI/CLI:

```php
use Ashrafic\FilamentAutomationBridge\Models\AutomationTrigger;
use Ashrafic\FilamentAutomationBridge\Services\HistoricalSyncService;

$trigger = AutomationTrigger::find(5);
$service = app(HistoricalSyncService::class);
$batchUuid = $service->startSync(
    trigger: $trigger,
    applyConditions: true,
    batchSize: 200,
    delaySeconds: 1,
);
```

The method returns a UUID string for progress tracking. Throws a `RuntimeException` if a sync is already in progress for that trigger.
