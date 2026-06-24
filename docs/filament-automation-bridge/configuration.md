---
title: Configuration
---


## Publishing the Config

If you didn't run the install command, publish the config manually:

```bash
php artisan vendor:publish --tag=filament-automation-bridge-config
```

---

## Full Configuration Reference

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Sandbox Mode
    |--------------------------------------------------------------------------
    | When enabled, deliveries are captured and logged but never sent to
    | external destinations. Use for development and testing.
    */
    'sandbox_mode' => env('AUTOMATION_BRIDGE_SANDBOX', false),

    /*
    |--------------------------------------------------------------------------
    | Model Discovery
    |--------------------------------------------------------------------------
    | Configure how the bridge discovers Eloquent models in your application.
    */
    'models' => [
        'paths' => [app_path('Models')],
        'exclude' => [],
        'cache_key' => 'automation_bridge.models',
        'cache_ttl' => 3600,
    ],

    /*
    |--------------------------------------------------------------------------
    | Field Schema Analysis
    |--------------------------------------------------------------------------
    | Controls how the bridge introspects model attributes and relationships.
    */
    'field_schema' => [
        'max_relation_depth' => 3,
        'cache_ttl' => 3600,
        'excluded_attributes' => ['password', 'remember_token', 'api_token'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Security
    |--------------------------------------------------------------------------
    | Payload signing, URL validation, SSRF prevention, and encryption.
    */
    'security' => [
        'verify_ssl' => env('AUTOMATION_BRIDGE_VERIFY_SSL', true),
        'max_payload_size_mb' => 5,
        'blocked_ip_ranges' => [
            '127.0.0.0/8', '10.0.0.0/8', '172.16.0.0/12',
            '192.168.0.0/16', '::1/128', 'fc00::/7',
        ],
        'allowed_schemes' => ['https', 'http'],
        'require_https_in_production' => true,
        'signature_algorithm' => 'sha256',
        'encryption_driver' => env('AUTOMATION_BRIDGE_ENCRYPTION_DRIVER', 'aes-256-cbc'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Queue Strategy
    |--------------------------------------------------------------------------
    | Queue connection and name overrides for real-time and sync deliveries.
    */
    'queue' => [
        'connection' => env('AUTOMATION_BRIDGE_QUEUE_CONNECTION', config('queue.default')),
        'queue_name' => env('AUTOMATION_BRIDGE_QUEUE', 'default'),
        'historical_sync_queue_name' => env('AUTOMATION_BRIDGE_SYNC_QUEUE', 'default'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Retry Strategy
    |--------------------------------------------------------------------------
    | Exponential backoff and retryable HTTP status codes.
    */
    'retry' => [
        'default_max_attempts' => 3,
        'backoff_base' => 10,
        'retryable_status_codes' => [408, 429, 500, 502, 503, 504],
        'non_retryable_status_codes' => [400, 401, 403, 404, 409, 422],
    ],

    /*
    |--------------------------------------------------------------------------
    | Delivery Log Retention
    |--------------------------------------------------------------------------
    | Auto-prune delivery logs older than the configured number of days.
    */
    'retention' => [
        'delivery_logs_days' => 90,
        'prune_enabled' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting
    |--------------------------------------------------------------------------
    | Per-destination-hostname throttling to prevent overwhelming targets.
    */
    'rate_limiting' => [
        'max_requests_per_minute' => 60,
        'max_concurrent' => 5,
    ],

    /*
    |--------------------------------------------------------------------------
    | Historical Sync
    |--------------------------------------------------------------------------
    | Batch size and timing for backfilling existing records.
    */
    'historical_sync' => [
        'batch_size' => 100,
        'max_batch_size' => 1000,
        'batch_delay_seconds' => 1,
    ],

    /*
    |--------------------------------------------------------------------------
    | UI Settings
    |--------------------------------------------------------------------------
    | Navigation grouping, icons, sorting, and dashboard widget behavior.
    */
    'ui' => [
        'navigation_group' => 'Automation Bridge',
        'navigation_sort' => 80,
        'navigation_icon' => 'heroicon-o-bolt',
        'register_health_widget' => true,
        'polling_interval' => 5,
    ],

    /*
    |--------------------------------------------------------------------------
    | Authorization Gates
    |--------------------------------------------------------------------------
    | Permission prefix and auto-registration for policy gates.
    */
    'authorization' => [
        'permission_prefix' => 'automation_bridge',
        'auto_register_gates' => true,
    ],
];
```

---

## Environment Variables

All config values that reference `env()` can be overridden via your `.env` file:

| Variable | Default | Description |
|---|---|---|
| `AUTOMATION_BRIDGE_SANDBOX` | `false` | Enable sandbox mode |
| `AUTOMATION_BRIDGE_VERIFY_SSL` | `true` | Verify SSL certificates on webhook calls |
| `AUTOMATION_BRIDGE_ENCRYPTION_DRIVER` | `aes-256-cbc` | Encryption driver for field-level encryption |
| `AUTOMATION_BRIDGE_QUEUE_CONNECTION` | `null` (uses default) | Queue connection for webhook jobs |
| `AUTOMATION_BRIDGE_QUEUE` | `default` | Queue name for webhook jobs |
| `AUTOMATION_BRIDGE_SYNC_QUEUE` | `default` | Queue name for historical sync jobs |

---

## Key Configuration Areas

### Sandbox Mode

Enable during development to capture and log deliveries without actually sending them to external URLs:

```env
AUTOMATION_BRIDGE_SANDBOX=true
```

Each delivery will be logged with a note that sandbox mode is active. No HTTP call is made. This is the safest way to test trigger logic without triggering real webhooks.

### Model Discovery

The bridge auto-discovers Eloquent models in the configured paths. By default, it scans `app/Models/`:

```php
'models' => [
    'paths' => [
        app_path('Models'),
        app_path('Models/Shop'),
    ],
    'exclude' => [
        \App\Models\InternalNote::class,
    ],
    'cache_ttl' => 3600, // refresh model list every hour
],
```

Clear the model cache manually:

```bash
php artisan automation-bridge:model-cache
```

### Queue Strategy

Webhook deliveries are dispatched as queued jobs. Configure the connection and queue name:

```php
'queue' => [
    'connection' => 'redis',
    'queue_name' => 'webhooks',
    'historical_sync_queue_name' => 'webhooks-sync',
],
```

Start the queue worker:

```bash
php artisan queue:work --queue=webhooks,webhooks-sync
```

### Retry Strategy

Failed deliveries retry with exponential backoff. The backoff formula is `backoff_base ^ attempt`:

| Attempt | Delay |
|---|---|
| 1 | 10ms |
| 2 | 100ms |
| 3 | 1,000ms |
| 4 | 10,000ms |

Only HTTP status codes in `retryable_status_codes` trigger a retry. Codes in `non_retryable_status_codes` (e.g., 400, 401, 403) fail immediately without retry.

### Rate Limiting

Per-destination-hostname throttling prevents overwhelming a single webhook endpoint:

```php
'rate_limiting' => [
    'max_requests_per_minute' => 60,
    'max_concurrent' => 5,          // reserved for future use
],
```

Per-destination-hostname throttling uses `max_requests_per_minute` via Laravel's built-in `RateLimiter`. When the limit is exceeded, a `RateLimitException` is caught internally and the delivery is marked as failed.

### UI Settings

Control how the bridge appears in your Filament panel:

```php
'ui' => [
    'navigation_group' => 'Automation Bridge',
    'navigation_sort' => 80,
    'navigation_icon' => 'heroicon-o-bolt',
    'register_health_widget' => true,
    'polling_interval' => 5, // dashboard widget auto-refresh in seconds
],
```

---

## Next Steps

- **[Getting Started](/filament-automation-bridge/getting-started)** — Walk through the full workflow
- **[Authorization](/filament-automation-bridge/authorization)** — Restrict access with gates
- **[Destinations](/filament-automation-bridge/features/destinations)** — HMAC signing, URL validation, SSRF prevention
- **[Commands Reference](/filament-automation-bridge/reference/commands)** — All artisan commands
