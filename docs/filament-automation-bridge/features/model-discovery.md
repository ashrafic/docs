---
title: Model Discovery
sidebar_position: 8
---

The bridge automatically discovers Eloquent models in your application so you don't have to manually register them. The model list populates the trigger form's model selector, and the field schema analyzer builds attribute and relation trees from discovered models.

---

## How Discovery Works

The `ModelDiscoveryService` scans configured directories for PHP classes that extend `Illuminate\Database\Eloquent\Model`:

1. Scans `models.paths` directories recursively
2. Identifies classes extending Eloquent's base `Model`
3. Excludes classes listed in `models.exclude`
4. Optionally filters to models using the `HasAutomationTriggers` trait
5. Caches results for performance

## Configuration

```php
'models' => [
    'paths' => [
        app_path('Models'),
        app_path('Models/Shop'),   // additional directory
    ],
    'exclude' => [
        \App\Models\InternalNote::class,
        \App\Models\AuditLog::class,
    ],
    'cache_key' => 'automation_bridge.models',
    'cache_ttl' => 3600,           // 1 hour
],
```

### Excluding Models

Add FQCNs to the `exclude` array to hide models from the selector. Useful for:

- Internal pivot models
- Audit/log models that shouldn't trigger automations
- Temporary or staging models
- Models managed by other packages

### Cache

The model list is cached to avoid filesystem scanning on every request:

- Cache key is configurable (`models.cache_key`)
- TTL is configurable (`models.cache_ttl`)
- Cleared automatically when the `automation-bridge:model-cache` command runs
- Invalidated when triggers are created/deleted

---

## Artisan Command

Clear and rebuild the model discovery cache:

```bash
php artisan automation-bridge:model-cache
```

Run this after:
- Adding new Eloquent models
- Moving models between directories
- Changing the `models.paths` or `models.exclude` config
- Deploying code with new model classes

---

## HasAutomationTriggers Trait

Optionally add the `HasAutomationTriggers` trait to your Eloquent models for fine-grained control:

```php
use Ashrafic\FilamentAutomationBridge\Concerns\HasAutomationTriggers;

class User extends Model
{
    use HasAutomationTriggers;

    public static function getAutomationDisplayName(): string
    {
        return 'User Account';
    }

    public static function getAutomationStatusField(): ?string
    {
        return 'status';
    }

    public static function getAutomationWatchableFields(): array
    {
        return ['email', 'status', 'plan'];
    }

    public function shouldTriggerAutomations(): bool
    {
        return !$this->trashed();
    }

    public function getAutomationContextData(): array
    {
        return [
            'tenant_id' => $this->team_id,
            'environment' => app()->environment(),
        ];
    }
}
```

### Trait Methods

| Method | Returns | Purpose |
|---|---|---|
| `getAutomationDisplayName()` | `string` | Human-readable name shown in the model selector |
| `getAutomationStatusField()` | `?string` | Default status field for Status Changed triggers |
| `getAutomationWatchableFields()` | `array` | Suggested fields for watch-on-update triggers |
| `shouldTriggerAutomations()` | `bool` | Per-record gate: return `false` to skip this record |
| `getAutomationContextData()` | `array` | Extra context data merged into the payload |

---

## Field Schema Analysis

Once models are discovered, the `FieldSchemaAnalyzer` introspects each one to build the field picker and validate template paths. See [Payload Builder](/filament-automation-bridge/features/payloads#field-schema-analysis) for details on relation depth, caching, and excluded attributes.
