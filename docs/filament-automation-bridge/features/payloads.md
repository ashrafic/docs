---
title: Payload Builder
sidebar_position: 4
---

The payload builder determines what data is sent when a trigger fires. Three modes give you full control — from hand-picking individual fields to crafting custom JSON templates.

---

## Payload Modes

| Mode | Constant | Description |
|---|---|---|
| **Summary (Selected Fields)** | `PayloadMode::Summary` | Only includes fields explicitly selected in the field mapping. You pick what goes out. |
| **All Fields** | `PayloadMode::All` | Includes every model attribute (minus hidden/excluded fields like `password`). |
| **Custom Template** | `PayloadMode::Custom` | Uses a user-defined JSON template with `{{ field }}` placeholder syntax. Full control over the output shape. |

---

## The Payload Envelope

Every payload follows a consistent envelope structure regardless of mode:

```json
{
    "event": "created",
    "model": "App\\Models\\User",
    "triggered_at": "2026-06-23T10:30:00Z",
    "automation_id": 1,
    "data": {
        ...
    }
}
```

The `data` key contains the actual model data — formatted according to the selected mode and destination type.

---

## Summary Mode

You pick which fields to include from a checkbox list in the Filament UI. The `FieldMappingBuilder` component renders every model attribute and relation discovered by the field schema analyzer.

### Field Selection

The field picker shows:

- **Direct attributes** — database columns like `name`, `email`, `created_at`
- **Relation trees** — nested relationships like `team.name`, `profile.address.city`
- **Wildcard relations** — `items.*` expands to all attributes on each related item

### Eager Loading

The payload builder automatically eager-loads the selected relations to prevent N+1 queries:

```php
// Selected: name, team.name, items.*.sku
// The builder generates:
User::with(['team', 'items'])->find($userId);
```

---

## All Fields Mode

Sends every model attribute except:

- Attributes listed in `field_schema.excluded_attributes` (default: `password`, `remember_token`, `api_token`)
- Attributes marked as hidden on the Eloquent model (`$hidden`)
- Internal timestamps can be included or excluded per config

:::warning Data Sensitivity
All mode sends everything. Use it for models where all fields are safe to expose. For models with internal or sensitive data, prefer Summary mode with explicit field selection.
:::

---

## Custom Template

Define the exact JSON structure your destination expects using `{{ field }}` placeholders.

### Template Syntax

```
{{ field_name }}           — Direct attribute value
{{ relation.field }}       — Single relation attribute
{{ items.*.sku }}          — Wildcard: all SKUs as an array
{{ field | json }}         — Output raw JSON (for objects/arrays)
```

### Example Templates

**Slack notification:**
```json
{
    "text": "New user registered: {{ name }} ({{ email }})",
    "channel": "#signups"
}
```

**CRM contact:**
```json
{
    "contact": {
        "first_name": "{{ profile.first_name }}",
        "last_name": "{{ profile.last_name }}",
        "email": "{{ email }}",
        "company": "{{ team.name }}"
    },
    "tags": {{ tags | json }}
}
```

**Order fulfillment:**
```json
{
    "order_id": {{ id }},
    "total": {{ total }},
    "items": {{ items | json }},
    "shipping_address": {
        "line1": "{{ address.line1 }}",
        "city": "{{ address.city }}",
        "zip": "{{ address.postal_code }}"
    }
}
```

### Validation

The payload builder validates templates before use:

1. Template is not empty or whitespace-only
2. All `{{ field }}` placeholders resolve to valid model attributes/relations
3. Rendered output is valid JSON
4. Rendered output is a JSON object (not a scalar or array at root — `{"key": "value"}` not `"string"`)
5. Encoded payload size is under `security.max_payload_size_mb` (default: 5MB)

Validation errors throw `InvalidPayloadException` with descriptive messages and an `$errors` array for template-level issues.

---

## Field Schema Analysis

The `FieldSchemaAnalyzer` introspects your Eloquent models to populate the field picker and validate template paths:

### What It Discovers

- **Attributes** — Database columns and their types (string, integer, boolean, datetime, etc.)
- **Relations** — `BelongsTo`, `HasOne`, `HasMany`, `MorphTo`, `MorphMany` (excludes `BelongsToMany`)
- **Recursive depth** — Relations of relations down to `field_schema.max_relation_depth` (default: 3)

### Caching

Schema analysis results are cached to avoid repeated reflection:

```php
// config
'field_schema' => [
    'cache_ttl' => 3600,
],
```

The cache is invalidated when the model discovery cache is cleared.

### Excluded Attributes

Sensitive attributes are excluded globally:

```php
'field_schema' => [
    'excluded_attributes' => ['password', 'remember_token', 'api_token'],
],
```

Additionally, attributes present on the model's `$hidden` array are excluded from the field picker.

---

## Payload Preview

A live JSON preview renders in the trigger form as you configure payload settings. The preview:

- Shows a sample payload against a `make()` instance of the model (no database hit)
- Updates reactively as you toggle fields in the Summary mode builder
- Renders template output for Custom mode showing actual placeholder values from the sample model

---

## Payload Size Protection

Before any delivery is dispatched, the encoded JSON is compared against the max size:

```php
'security' => [
    'max_payload_size_mb' => 5,
],
```

If the payload exceeds the limit, an `InvalidPayloadException` is thrown with the actual and maximum sizes in MB. Increase the limit or reduce the payload via field selection.

---

## Programmatic Payload Building

Build payloads outside the UI:

```php
use Ashrafic\FilamentAutomationBridge\Services\PayloadBuilder;

$builder = app(PayloadBuilder::class);
$payload = $builder->build($trigger, $user, EventEnum::Created);

// Or just get the field list for a model
$fields = app(\Ashrafic\FilamentAutomationBridge\Services\FieldSchemaAnalyzer::class)
    ->analyze(User::class);
```
