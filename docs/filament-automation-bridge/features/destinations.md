---
title: Destination Types
sidebar_position: 3
---

The bridge sends data to four destination types. Each type auto-formats the payload so your automation platform receives it in its expected structure — no middleware, no transformer code.

---

## Destination Types

| Type | Formatter Class | Behavior |
|---|---|---|
| **Zapier** | `ZapierFormatter` | Flattens nested arrays into top-level keys. Metadata (`event`, `model`, `triggered_at`, `automation_id`) is merged at the root level alongside data fields. |
| **Make** | `MakeFormatter` | Wraps metadata in a `__metadata` key. Uses `x-make-apikey` header instead of HMAC signature. |
| **n8n** | `N8nFormatter` | Wraps the entire payload in `{"body": {...}}` — the standard n8n webhook format. |
| **Custom** | `CustomFormatter` | Renders a custom JSON template with `{{ field.path }}` placeholder syntax. Full control over output shape. |

---

## Choosing a Destination

### Zapier

Use when: your automation lives in Zapier and you want flat, predictable fields.

**Payload shape:**
```json
{
    "event": "created",
    "model": "App\\Models\\User",
    "triggered_at": "2026-06-23T10:30:00Z",
    "automation_id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "team_name": "Engineering"
}
```

Nested relations are flattened one level: array values are promoted to top-level keys. For example, if you include `team` as a relation with `name` and `plan` attributes, those attributes become top-level fields — not nested under `team`.

### Make (Integromat)

Use when: your scenarios run in Make and you want structured metadata.

**Payload shape:**
```json
{
    "__metadata": {
        "event": "created",
        "triggered_at": "2026-06-23T10:30:00Z",
        "automation_id": 1
    },
    "name": "Jane Doe",
    "email": "jane@example.com"
}
```

Make uses `x-make-apikey` for authentication instead of the standard HMAC header.

### n8n

Use when: your workflows are hosted in n8n.

**Payload shape:**
```json
{
    "body": {
        "event": "created",
        "model": "App\\Models\\User",
        "triggered_at": "2026-06-23T10:30:00Z",
        "automation_id": 1,
        "data": {
            "name": "Jane Doe",
            "email": "jane@example.com"
        }
    }
}
```

### Custom Webhook

Use when: you're sending to a custom API endpoint, Slack webhook, Discord webhook, or any service that expects a specific JSON format.

Create a template with `{{ field.path }}` placeholders:

```json
{
    "text": "New user: {{ name }} ({{ email }})",
    "channel": "#signups"
}
```

See [Payload Builder](/filament-automation-bridge/features/payloads#custom-template) for the full template syntax.

---

## Authentication

Every destination type supports two authentication methods:

### HMAC-SHA256 (default)

The bridge auto-generates a secret for each trigger (`hash('sha256', Str::random(64))`), stored encrypted in the database. Each outbound request includes:

```
X-Automation-Signature: sha256=<hex-encoded-hmac>
X-Automation-Trigger-Id: 1
X-Automation-Delivery-Id: <uuid>
```

Verify the signature at your destination by computing the same HMAC of the raw request body with the shared secret.

### Make API Key

Make destinations use the `x-make-apikey` header instead of HMAC. The trigger's secret is sent as the API key value.

---

## Configuring a Destination

In the trigger form, the "Then send data to..." section:

1. **Destination Type** — Select Zapier, Make, n8n, or Custom
2. **Destination URL** — Paste the webhook URL from your automation platform
3. **Request Timeout** — Seconds before the HTTP call times out (default: 5)
4. **Max Retries** — Override the global retry count for this trigger (default: 3)

---

## URL Validation

Before any webhook call, the `SecurityService` validates the destination URL:

- Cannot be empty
- Must have a valid scheme and host
- Scheme must be in the `allowed_schemes` list (`https`, `http`)
- In production, HTTP is blocked (unless `require_https_in_production` is disabled)
- IP must not resolve to a blocked range (localhost, private IPs — SSRF prevention)

See [Configuration](/filament-automation-bridge/configuration#key-configuration-areas) for details on sandbox mode, rate limiting, and encryption.
