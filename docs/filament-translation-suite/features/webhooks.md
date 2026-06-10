---
title: Webhooks
---


## Supported Platforms

The suite includes built-in webhook handlers for three major platforms:

| Platform | Webhook URL | Payload Format
|----------|-------------|----------------
| **Phrase** | `POST /fts/webhooks/phrase` | Phrase webhook v2
| **Crowdin** | `POST /fts/webhooks/crowdin` | Crowdin string-based webhook
| **Lokalise** | `POST /fts/webhooks/lokalise` | Lokalise key-based webhook

---

## How It Works

1. Configure your translation platform to send webhooks to your app's webhook endpoint
2. When translations are completed, the platform POSTs the data to your app
3. The suite normalizes the payload and updates (or creates) the corresponding translation keys
4. Keys received via webhook are marked with `source: webhook_{platform}` and `is_published: false`
5. Review in the database, then publish to `lang/` files when ready

---

## Setting Up Webhooks

### Phrase

1. In Phrase, go to your project **Settings → Webhooks**
2. Add a webhook URL: `https://your-app.com/fts/webhooks/phrase`
3. Select the event: **Translations updated**
4. Save and test

### Crowdin

1. In Crowdin, go to **Project Settings → Webhooks**
2. Add a webhook URL: `https://your-app.com/fts/webhooks/crowdin`
3. Select the event: **File translated**
4. Save and test

### Lokalise

1. In Lokalise, go to **Project Settings → Webhooks**
2. Add a webhook URL: `https://your-app.com/fts/webhooks/lokalise`
3. Select the event: **Key modified**
4. Save and test

:::tip Webhook Security
Make sure your webhook endpoints are publicly accessible. If your app is behind a firewall or VPN, webhooks from external platforms won't reach it. Consider using a service like ngrok for local development testing.
:::

---

## Payload Normalization

Each platform uses a different payload format. The suite normalizes them all into a common structure:

```php
[
    ['group' => 'messages', 'key' => 'welcome', 'locale' => 'de', 'value' => 'Willkommen'],
    ['group' => 'messages', 'key' => 'goodbye', 'locale' => 'de', 'value' => 'Auf Wiedersehen'],
]
```

Group/key parsing uses dot notation:
- `messages.welcome` → group: `messages`, key: `welcome`
- `validation.required` → group: `validation`, key: `required`
- `Hello World` → group: `*`, key: `Hello World`

---

## Review Before Publishing

Webhook translations are imported with `is_published: false` by default. This means:

- They are safe to review in the database before committing to files
- They won't overwrite your existing `lang/` files until you explicitly publish
- You can run the code scanner or review usage to verify context

This staging approach prevents webhook errors or bad translations from corrupting your production language files.

---

## Activity Logging

Every webhook import is logged in the activity feed:

```
Import via webhook_phrase — 450 keys updated
```

This gives you full visibility into what your external platforms are doing.

---

## Disabling Webhooks

If you don't use external translation platforms, disable the webhook feature:

```php
'features' => [
    'webhooks' => false,
    // ...
],
```

This removes the webhook routes from your application.

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Review and publish webhook-received translations
- **[Health Dashboard](/filament-translation-suite/features/health-dashboard)** — Monitor coverage after webhook imports
- **[CSV Import / Export](/filament-translation-suite/features/csv-import-export)** — Alternative workflow for platforms without webhook support
