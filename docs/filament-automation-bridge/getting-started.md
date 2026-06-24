---
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Filament Automation Bridge connects your Eloquent models to external services — Zapier, Make, n8n, or any webhook endpoint — by defining automations directly from your Filament admin panel.

:::tip Before You Begin
Make sure you've completed [Installation](/filament-automation-bridge/installation) and [Configuration](/filament-automation-bridge/configuration) first. Once the package is [registered in your Filament panel](/filament-automation-bridge/installation#panel-registration), you're ready to create triggers.

By default, all users can access the bridge. To restrict access, see [Authorization](/filament-automation-bridge/authorization).
:::

This guide walks you through the full workflow — from creating your first trigger to monitoring deliveries.

---

## How It Works

1. **A model event fires** — created, updated, deleted, restored, force deleted, or any custom event
2. **The bridge evaluates** conditions and trigger rules against the model
3. **A payload is built** — hand-picked fields, all attributes, or a custom JSON template
4. **The payload is signed** with HMAC-SHA256 and dispatched to the destination
5. **Every delivery is logged** with status, response, and duration — retry on failure

```
Model Event → Condition Evaluation → Payload Builder → HMAC Sign → Queue → Webhook POST → Delivery Log
```

---

## Creating a Trigger

![Triggers List](/filament-automation-bridge/assets/screenshots/triggers_list.png)

Navigate to **Automation Bridge → Triggers** in your Filament sidebar. Click **Create** to open the trigger form.

The form is organized into three logical sections:

### 1. "When this happens..."

Choose your trigger type, select a model, and configure when it fires.

| Trigger Type | Use Case |
|---|---|
| **Model Event** | Fire when a model is created, updated, or deleted. Add watch fields to only fire when specific columns change. |
| **Status Changed** | Fire when a model field transitions from one value to another (e.g., `status` from `pending` to `completed`). |
| **Schedule** | Fire on a recurring schedule — hourly, daily, weekly, monthly, or custom cron expression. |
| **Date Condition** | Fire based on a date field — X days before, after, or exactly on a date. Optionally at a specific time. |
| **Manual** | No automatic firing. Trigger manually from a Filament resource action button. |
| **Event** | Fire when any Laravel event class is dispatched — not tied to a specific model. |

![Trigger Form — Configuration](/filament-automation-bridge/assets/screenshots/trigger_create_top.png)

### 2. "Only if these conditions match"

Add conditions to filter which model instances trigger the automation. Conditions support **nine operators** (equals, not equals, contains, greater than, less than, is empty, is not empty, changed, changed to) and **AND/OR logic**:

- **AND group** — all conditions must match
- **OR separator** — any of the groups must match

The `changed` and `changed_to` operators compare the model's current value against its original state — only available for Update events.

### 3. "Then send data to..."

Choose your destination and configure the payload:

- **Destination type** — Zapier, Make, n8n, or Custom
- **n8n Auth Mode** — API Key, Basic Auth, or Bearer Token (visible for n8n destinations)
- **Destination URL** — the webhook URL from your automation platform
- **Payload mode** — Summary (selected fields), All (every attribute), or Custom (JSON template)
- **Field mapping** — pick and choose which model fields to include, including nested relations

In the **Settings** section you can set the **HTTP Method** (GET, POST, PUT, PATCH, DELETE) and configure authentication secrets. See [Destinations](/filament-automation-bridge/features/destinations#authentication) for full auth details.

The payload preview updates live as you configure your selections.

![Trigger Form — Destination & Payload](/filament-automation-bridge/assets/screenshots/trigger_create_bottom.png)

---

## Testing a Connection

Before activating a trigger, test your destination URL:

1. Open the trigger's view page (click on it from the list)
2. Click **Test Connection** in the header
3. Review the HTTP status, response body, and response time

A successful test confirms the URL is reachable and your automation platform is ready to receive data.

![Test Connection](/filament-automation-bridge/assets/screenshots/trigger_edit_top.png)

---

## Monitoring Deliveries

Navigate to **Automation Bridge → Delivery Log** to see every webhook call across all triggers.

| Column | Description |
|---|---|
| **Status** | Success (green), Failed (red), Pending (yellow), Cancelled (gray) |
| **HTTP Status** | The response code returned by the destination |
| **Duration** | Request time in milliseconds |
| **Retry Count** | How many times the delivery was retried |
| **Trigger** | Which automation triggered this delivery |
| **Payload** | The full JSON payload that was sent |

Click any delivery to see the slide-over detail panel with request headers, payload, response headers, response body, and error messages.

### Retrying Failed Deliveries

Failed deliveries can be retried individually or in bulk:

- **Single retry** — Click the retry button on any failed delivery row
- **Bulk retry** — Select multiple failed deliveries and click Bulk Retry

Retries use the trigger's `max_retries` and follow exponential backoff (10ms → 100ms → 1000ms → ...).

---

## The Health Widget

The Automation Health widget sits on your Filament dashboard, showing:

- **Active Triggers** — count of currently enabled automations
- **24h Deliveries** — total deliveries in the last 24 hours
- **Success Rate** — color-coded: green (≥90%), yellow (≥70%), red (&lt;70%)
- **Recent Failures** — last 5 failed deliveries with one-click retry

The widget auto-polls every N seconds (configurable via `ui.polling_interval`).

---

## Using Templates

Don't start from scratch every time. Browse **Automation Bridge → Templates** to:

- **Browse built-in templates** — shipped with the package for common scenarios
- **Save any trigger as a template** — from the trigger view page, click "Save as Template"
- **Apply a template to a new trigger** — click "Use Template" on any template card to pre-fill the create form

---

## Historical Sync

Need to backfill existing records into an automation? Navigate to the trigger list, open a trigger's action menu, and choose **Sync Historical Records**. This:

1. Queries every record of the trigger's model
2. Evaluates conditions (unless `--no-conditions` is specified)
3. Dispatches them in configurable batch sizes via the queue
4. Tracks progress through cache keys — retrieve current status at any time

See [Historical Sync](/filament-automation-bridge/features/historical-sync) for batch configuration, progress tracking, and cancellation.

---

## Next Steps

- [Install the package](/filament-automation-bridge/installation)
- [Full configuration reference](/filament-automation-bridge/configuration)
- [Explore all trigger types](/filament-automation-bridge/features/trigger-types)
- [Condition builder deep-dive](/filament-automation-bridge/features/conditions)
- [Understanding payloads](/filament-automation-bridge/features/payloads)
