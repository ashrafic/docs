---
title: Templates
sidebar_position: 5
---

Don't configure the same trigger from scratch for every model. Templates let you save a trigger's entire configuration — trigger type, conditions, payload settings, destination — and apply it instantly to a different model.

---

## How Templates Work

A template captures everything about a trigger except:

- The specific model class (you choose that when applying the template)
- The name and description (you provide those at creation time)
- The secret (auto-generated when the trigger is created)
- Active state (new triggers start inactive by default)

Everything else — trigger type config, conditions, payload mode, field mapping, destination type, template — is preserved and pre-filled into the create form.

---

## Creating Templates

### From a Trigger

1. Open any existing trigger (view page)
2. Click **Save as Template** in the header
3. Give the template a name and optional description
4. The template is saved to the `automation_templates` table

---

## Applying a Template

1. Navigate to **Automation Bridge → Templates**
2. Browse the template list
3. Click **Use Template** on any template card
4. The create trigger form opens with all fields pre-populated from the template
5. Choose your model, set a name, and save

---

## Browsing Templates

![Templates List](/filament-automation-bridge/assets/screenshots/templates_list.png)

The Templates page shows:

| Column | Description |
|---|---|
| **Name** | Template name |
| **Description** | Optional description |
| **Model** | The model class the template is designed for |
| **Event** | The event type (created, updated, etc.) |
| **Destination** | Zapier, Make, n8n, or Custom |

---

## Template Management

### Editing

Templates are not directly editable in the UI. To modify a template:

1. Apply it to create a new trigger
2. Adjust the trigger's configuration
3. Save the trigger
4. Save the modified trigger as a new template (optionally delete the old one)

### Deleting

Delete templates from the Templates page.

---

## Programmatic Access

Work with templates via the `TemplateManager`:

```php
use Ashrafic\FilamentAutomationBridge\Services\TemplateManager;

$manager = app(TemplateManager::class);

// Save trigger as template
$template = $manager->saveFromTrigger($trigger, 'User Signup → Slack');

// Apply template to get pre-filled form data
$data = $manager->applyTemplate($template);
```

Templates use the same `AutomationTemplate` Eloquent model, so you can query them directly:

```php
use Ashrafic\FilamentAutomationBridge\Models\AutomationTemplate;

$zapierTemplates = AutomationTemplate::where('destination_type', 'zapier')->get();
```
