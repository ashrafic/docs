---
title: Features Overview
sidebar_position: 0
---

Filament Automation Bridge turns your Filament admin panel into a no-code integration hub. Define what should happen, when it should fire, and where the data goes — all from a clean UI.

---

## Core Concepts

The bridge operates on three pillars:

| Pillar | What It Answers |
|---|---|
| **Triggers** | _When_ does the automation fire? |
| **Conditions** | _Which_ records should fire it? |
| **Destinations** | _Where_ does the data go? |

---

## Feature Map

### Trigger Engine

| Feature | Description |
|---|---|
| [Model Event Triggers](/filament-automation-bridge/features/trigger-types#model-event) | Fire on Eloquent created, updated, deleted, restored, force deleted events |
| [Status Changed Triggers](/filament-automation-bridge/features/trigger-types#status-changed) | Fire when a field transitions from one value to another |
| [Schedule Triggers](/filament-automation-bridge/features/trigger-types#schedule) | Fire on hourly, daily, weekly, monthly, or custom cron schedules |
| [Date Condition Triggers](/filament-automation-bridge/features/trigger-types#date-condition) | Fire X days before, after, or on a date field |
| [Manual Triggers](/filament-automation-bridge/features/trigger-types#manual) | Fire on-demand from a Filament resource action button |
| [Event Triggers](/filament-automation-bridge/features/trigger-types#event) | Fire when any Laravel event class is dispatched |

### Payload & Filtering

| Feature | Description |
|---|---|
| [Condition Builder](/filament-automation-bridge/features/conditions) | 9 operators, AND/OR logic, changed/changed_to for update-aware filtering |
| [Payload Builder](/filament-automation-bridge/features/payloads) | Three modes (Summary, All, Custom), nested relations, field mapping, live preview |

### Delivery & Monitoring

| Feature | Description |
|---|---|
| [Destination Types](/filament-automation-bridge/features/destinations) | Zapier, Make, n8n, or custom webhook — each with auto-formatting |
| [Delivery Log](/filament-automation-bridge/features/delivery-monitoring#delivery-log) | Full history of every webhook call with status, response, duration, and retry |
| [Health Widget](/filament-automation-bridge/features/delivery-monitoring#health-widget) | Dashboard widget showing active triggers, success rate, and recent failures |
| [Retries](/filament-automation-bridge/features/delivery-monitoring#retries) | Exponential backoff with configurable retryable HTTP codes |

### Data Operations

| Feature | Description |
|---|---|
| [Historical Sync](/filament-automation-bridge/features/historical-sync) | Bulk backfill existing records into any automation via queue |
| [Templates](/filament-automation-bridge/features/templates) | Save and reuse trigger configurations across models |
| [Model Discovery](/filament-automation-bridge/features/model-discovery) | Auto-scan your app for Eloquent models with caching |

### Security

| Feature | Description |
|---|---|
| HMAC-SHA256 Signing | Every payload signed with a per-trigger secret |
| SSRF Prevention | Blocks webhook calls to localhost and private IP ranges |
| Sandbox Mode | Capture and log deliveries without sending externally |
| Rate Limiting | Per-destination throttling to prevent overwhelming targets |
| Encryption | Field-level payload encryption and secrets encrypted at rest |

### Internationalization

| Feature | Description |
|---|---|
| [Translatable UI](/filament-automation-bridge/features/translatable-ui) | All ~330 UI strings translatable. Publish and localize to any language. |

---

## Architecture Philosophy

**Non-blocking by design.** Every delivery goes through the queue. Model events fire, the bridge captures them, conditions are evaluated synchronously, and if the trigger fires, a queued job handles the HTTP call. Your users never wait for a webhook to complete.

**Configurable, not prescriptive.** Every aspect — from retry backoff to rate limits to excluded attributes — is configurable via the `filament-automation-bridge.php` config file. The defaults are sensible; the overrides are yours.

**Security-first.** HMAC signing, SSRF prevention, HTTPS enforcement in production, encrypted secrets at rest, and per-destination rate limiting are all on by default. You don't opt in to security — you'd have to opt out.

**Extensible.** Every trigger type implements a `TriggerContract` interface. Every condition operator implements a `ConditionOperator` interface. Every formatter implements a `PayloadFormatter` interface. Write your own, register them with the managers, and they integrate seamlessly.

**Translatable.** All ~330 UI strings go through Laravel's `__()` helper. See **[Translatable UI](/filament-automation-bridge/features/translatable-ui)** for the publish command and setup.
