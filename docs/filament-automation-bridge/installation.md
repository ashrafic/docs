---
title: Installation
---


## Requirements

Before installing, ensure your environment meets the following requirements:

| Requirement | Version |
|---|---|
| PHP | `^8.2` |
| Laravel | `^11.0` |
| Filament | `^5.0` |

The package uses `spatie/laravel-webhook-server` for webhook delivery with retry support — this is installed automatically as a dependency.

---

## Installation

```bash
composer require ashrafic/filament-automation-bridge
```

Run the install command to publish config and migrations:

```bash
php artisan automation-bridge:install
```

This command will:

1. Publish the configuration file to `config/filament-automation-bridge.php`
2. Publish migrations to `database/migrations/`

Run the migrations:

```bash
php artisan migrate
```

Three tables are created:

| Table | Purpose |
|---|---|
| `automation_triggers` | Your configured automation rules |
| `automation_deliveries` | Log of every webhook call with status and response |
| `automation_templates` | Saved trigger configurations for reuse |

---

---

## Queue Worker

Webhook deliveries are dispatched to a queue. Start a queue worker to process them:

```bash
php artisan queue:work
```

You can customize the queue name in `config/filament-automation-bridge.php` under the `queue` section. If you configure a dedicated queue name, start the worker on that queue:

:::warning Don't Skip the Queue Worker
Without a running queue worker, deliveries will be created but never sent. The bridge dispatches every delivery as a queued job — no synchronous webhook calls.
:::

---

## Panel Registration

Add the plugin to your Filament PanelProvider:

```php
use Ashrafic\FilamentAutomationBridge\FilamentAutomationBridgePlugin;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->plugin(FilamentAutomationBridgePlugin::make())
            ->resources([
                // your resources
            ]);
    }
}
```

Once registered, three new navigation items appear in your panel under the **"Automation Bridge"** group:

| Page | Description |
|---|---|
| **Triggers** | Create, edit, and manage automation rules |
| **Templates** | Browse and apply saved trigger templates |
| **Delivery Log** | Monitor every webhook call with full request/response details |

The navigation group label, sort order, and icon are all configurable — see [Configuration](/filament-automation-bridge/configuration#ui-settings).

---

## Scheduler

The package registers two scheduled tasks automatically via the service provider:

```php
// In your Console/Kernel.php — no action needed, just ensure the scheduler is running
$schedule->command('automation-bridge:process-scheduled')->everyMinute();
$schedule->command('automation-bridge:prune-logs')->daily();
```

Add the Laravel scheduler to your server's crontab if you haven't already:

```bash
* * * * * php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1
```

---

## Quick Start Workflow

### 1. Navigate to Automation Bridge

After panel registration, click **Automation Bridge → Triggers** in the sidebar.

### 2. Create your first trigger

Click **Create**. Choose "Model Event" as the trigger type, select your model (e.g., `User`), and pick the `created` event.

### 3. Set a destination

Under "Then send data to...", select **Zapier** as the destination type and paste your Zapier webhook URL.

### 4. Test the connection

Save the trigger, open it, and click **Test Connection** to verify your webhook URL is reachable.

### 5. Activate and observe

Toggle the trigger to **Active**. Create a new user and watch the delivery appear in the Delivery Log.

That's it. Your first automation is live.

---

## Next Steps

- **[Getting Started](/filament-automation-bridge/getting-started)** — Walk through the full workflow
- **[Configuration](/filament-automation-bridge/configuration)** — Full config reference and environment variables
- **[Trigger Types](/filament-automation-bridge/features/trigger-types)** — Explore all six trigger types
