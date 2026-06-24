---
title: Commands
---

Five artisan commands ship with the package. All are registered automatically when the service provider boots.

---

## Command Reference

### `automation-bridge:install`

```bash
php artisan automation-bridge:install
```

Publishes the configuration file and migrations. Outputs a summary of next steps:

- Run `php artisan migrate`
- Add `FilamentAutomationBridgePlugin::make()` to your PanelProvider
- Start a queue worker

---

### `automation-bridge:process-scheduled`

```bash
php artisan automation-bridge:process-scheduled
```

Processes all active **schedule** and **date-condition** triggers. Called automatically every minute by the Laravel scheduler — you typically never run this manually.

For each active trigger:
1. Finds all matching records
2. Evaluates conditions
3. Dispatches qualifying records through the delivery pipeline

---

### `automation-bridge:prune-logs`

```bash
php artisan automation-bridge:prune-logs
php artisan automation-bridge:prune-logs --days=30
php artisan automation-bridge:prune-logs --days=60 --dry-run
```

Deletes delivery logs older than the specified number of days. Defaults to the configured `retention.delivery_logs_days` value (90 days).

| Option | Description |
|---|---|
| `--days=` | Override the retention period (days) |
| `--dry-run` | Show how many records would be deleted without actually removing them |

Called automatically daily by the Laravel scheduler when `retention.prune_enabled` is `true`.

---

### `automation-bridge:model-cache`

```bash
php artisan automation-bridge:model-cache
```

Clears and rebuilds the model discovery cache. Run after adding or moving Eloquent models in your application.

The cache stores the list of discovered models. The field schema analyzer cache is also invalidated when this command runs, since schema analysis depends on model resolution.

---

### `automation-bridge:sync`

```bash
php artisan automation-bridge:sync 5
php artisan automation-bridge:sync 5 --batch=200
php artisan automation-bridge:sync 5 --no-conditions
```

Starts a historical sync for a specific trigger. Returns the batch UUID for progress tracking.

| Argument/Option | Description |
|---|---|
| `triggerId` | (required) The ID of the automation trigger |
| `--batch=` | Records per batch (default: config `historical_sync.batch_size`) |
| `--no-conditions` | Skip condition evaluation — sync every record |

See [Historical Sync](/filament-automation-bridge/features/historical-sync) for batch configuration, progress tracking, and cancellation.

---

### `automation-bridge:test`

```bash
php artisan automation-bridge:test 3
```

Tests the connection for a specific trigger. Sends a sample request to the destination URL and displays:

- HTTP status code
- Response time
- Response body

Use this to verify your webhook URL is reachable and responding correctly before activating a trigger.

| Argument | Description |
|---|---|
| `triggerId` | (required) The ID of the automation trigger |

---

## Scheduler Registration

These commands are auto-registered in the Laravel scheduler by the service provider. Ensure your scheduler is running:

```bash
* * * * * php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1
```

| Command | Frequency | Purpose |
|---|---|---|
| `automation-bridge:process-scheduled` | Every minute | Process schedule and date-condition triggers |
| `automation-bridge:prune-logs` | Daily | Clean up old delivery logs |
