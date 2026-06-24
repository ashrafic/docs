---
title: Trigger Types
sidebar_position: 1
---

The bridge provides six trigger types — each answers _"when should this automation fire?"_ in a different way. Every trigger implements the `TriggerContract` interface, making the system extensible: you can register custom trigger types that integrate seamlessly with the condition builder, payload generator, and delivery pipeline.

---

## Model Event

**Type key:** `model-event`

Fires on standard Eloquent model lifecycle events. This is the most common trigger type — use it when an automation should fire as a direct response to a model being created, updated, or deleted.

### Configuration

| Field | Description |
|---|---|
| **Event** | `created`, `updated`, `deleted`, `restored`, or `forceDeleted` |
| **Watch Fields** | (optional) When event is `updated`, limit firing to specific columns that changed. Visible only for update events. |

### How It Works

1. The `AutomationEventSubscriber` listens to all `eloquent.*` events
2. When a model event fires, it parses the event name (e.g., `eloquent.created: App\Models\User`)
3. It queries active triggers for that model class + event type
4. Each matching trigger's conditions are evaluated
5. Qualifying triggers dispatch a delivery

### Watch Fields

When you select the `updated` event, a "Watch Fields" multi-select appears. Only trigger when one of the selected fields actually changed:

```
User updated → watch_fields: ['email', 'name']
→ If email changed: fire
→ If only password changed: skip
```

Leave watch fields empty to fire on any update to the model.

---

## Status Changed

**Type key:** `status-changed`

Fires when a model field transitions from one specific value to another. Ideal for pipeline stages, workflow states, and approval flows.

### Configuration

| Field | Description |
|---|---|
| **Status Field** | The model attribute to watch (e.g., `status`) |
| **From Status** | The value it must transition from (e.g., `pending`) |
| **To Status** | The value it must transition to (e.g., `completed`) |

### How It Works

On the `updated` Eloquent event, the trigger compares the model's `$original` value against its current value for the status field. Only fires when both the "from" and "to" match exactly.

```
Order status: pending → completed ✓ fires
Order status: pending → cancelled  ✗ skipped
Order status: shipped → completed  ✗ skipped (from doesn't match)
```

### Use Cases

- **Order fulfilled** — `Order.status`: `processing` → `shipped` → notify fulfillment warehouse
- **Lead qualified** — `Lead.stage`: `new` → `qualified` → push to CRM
- **Subscription cancelled** — `Subscription.status`: `active` → `cancelled` → update billing system
- **User suspended** — `User.status`: `active` → `suspended` → revoke access tokens

---

## Schedule

**Type key:** `schedule`

Fires on a recurring time interval — hourly, daily, weekly, monthly, or a custom cron expression. Schedule triggers are not tied to model events; they fire based on the Laravel scheduler.

### Configuration

| Field | Description |
|---|---|
| **Model** | The Eloquent model to query records from |
| **Schedule Type** | `hourly`, `daily`, `weekly`, `monthly`, or `custom` |
| **Custom Cron** | (Only when type is `custom`) A cron expression (e.g., `0 9 * * 1` for 9 AM every Monday) |

### How It Works

1. The `automation-bridge:process-scheduled` artisan command runs every minute via the Laravel scheduler
2. It finds all active schedule triggers
3. For each trigger, it queries all records of the specified model
4. Conditions are evaluated; matching records are dispatched

### Use Cases

- **Daily report** — Every morning at 8 AM, send yesterday's order summary to a reporting webhook
- **Weekly cleanup** — Every Sunday night, notify of stale records
- **Hourly health check** — Ping a monitoring endpoint with system metrics

:::note Performance
Schedule triggers query potentially large datasets. Use conditions to filter records, and keep the cron frequency reasonable for your data volume.
:::

---

## Date Condition

**Type key:** `date-condition`

Fires based on a date field on the model — X days before, after, or exactly on a date. Useful for reminders, expirations, and follow-ups.

### Configuration

| Field | Description |
|---|---|
| **Date Field** | The date attribute on the model (e.g., `expires_at`, `due_date`) |
| **Condition Type** | `before` (X days before), `after` (X days after), or `on` (exactly on that date) |
| **Days** | Number of days offset |
| **Time of Day** | (optional) Specific time to fire, e.g., `09:00` |

### How It Works

The `automation-bridge:process-scheduled` command evaluates date conditions every minute. For each active date-condition trigger:

1. Queries all records of the trigger's model
2. Filters: `whereDate('date_field', '=', Carbon::now()->addDays(X))` for "before" (with appropriate sign for each type)
3. Evaluates conditions
4. Dispatches matching records

### Use Cases

- **Subscription reminder** — 7 days before `expires_at`, notify the billing system
- **Follow-up** — 3 days after `last_contacted_at`, push to CRM for follow-up
- **Deadline alert** — On the day of `due_date`, fire a Slack notification
- **Renewal notice** — 30 days before `subscription_ends_at`, trigger an email automation

---

## Manual

**Type key:** `manual`

No automatic firing. Manual triggers are invoked on-demand via a Filament action button added to any resource.

### Configuration

No configuration is needed. The trigger form shows a placeholder message indicating that this trigger must be fired manually.

### How It Works

1. Add `ManualTriggerAction::make('sendToAutomation')` to any Filament resource table
2. The action auto-discovers all active manual triggers for the current record's model class
3. When a user clicks the action, a dropdown appears to select which trigger to fire
4. The selected trigger's conditions are evaluated and, if they pass, the delivery is queued

```php
use Ashrafic\FilamentAutomationBridge\Filament\ManualTriggerAction;

// In your Filament resource table
return $table
    ->actions([
        ManualTriggerAction::make('sendToZapier'),
    ]);
```

The action is only visible when at least one active manual trigger exists for the model.

### Use Cases

- **Data export** — Manually push a specific record to an external service
- **Reconciliation** — Admins trigger a sync for individual records
- **Review workflows** — Reviewer approves and manually pushes to downstream systems

---

## Event

**Type key:** `event`

Fires when any Laravel event class is dispatched — not tied to a specific Eloquent model. Use this to connect custom application events to external automations.

### Configuration

| Field | Description |
|---|---|
| **Event Class** | FQCN of the Laravel event to listen for (e.g., `App\Events\PaymentReceived`) |

### How It Works

1. The `TriggerManager` subscribes to each event trigger's target event class
2. When the Laravel event fires, the trigger manager's listener is called
3. The bridge evaluates conditions (using event payload as context) and dispatches deliveries

### Use Cases

- **Payment received** → `App\Events\PaymentReceived` → POST to accounting webhook
- **File uploaded** → `App\Events\FileUploaded` → trigger a malware scan via webhook
- **User login from new device** → `Illuminate\Auth\Events\Login` → push to security monitoring

:::tip Custom Event Payloads
Use the `HasAutomationTriggers` trait's `getAutomationContextData()` method or configure the event class to include a `toAutomationPayload()` method for maximum control over the data sent.
:::

---

## Extending with Custom Triggers

Every trigger type must implement the `TriggerContract` interface:

```php
interface TriggerContract
{
    public static function type(): string;
    public static function name(): string;
    public static function description(): string;
    public static function icon(): string;
    public static function color(): string;
    public static function configSchema(): array;     // Filament form fields
    public static function defaultConfig(): array;
    public function shouldFire(Model $model, array $config, array $context = []): bool;
    public function getContextData(Model $model, array $config): array;
    public function subscribe(AutomationTrigger $trigger): ?\Closure;
    public function unsubscribe(AutomationTrigger $trigger): void;
}
```

Register your custom trigger in a service provider:

```php
use Ashrafic\FilamentAutomationBridge\Triggers\TriggerManager;

app(TriggerManager::class)->register(\App\Automation\MyCustomTrigger::class);
```

Your trigger appears in the trigger type dropdown with its defined name, description, icon, and color — fully integrated.
