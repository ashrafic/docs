---
title: Authorization
---

By default, all authenticated users can access and manage the Automation Bridge. The package registers six gates that you can customize to restrict access based on roles, permissions, or any custom logic.

---

## Available Gates

When `authorization.auto_register_gates` is enabled (default), these gates are automatically registered with the `automation_bridge` prefix:

| Gate | Controls |
|---|---|
| `automation_bridge.view_triggers` | View the trigger list and individual triggers |
| `automation_bridge.create_triggers` | Create new automation triggers |
| `automation_bridge.edit_triggers` | Edit existing triggers |
| `automation_bridge.delete_triggers` | Delete triggers |
| `automation_bridge.view_deliveries` | View the delivery log |
| `automation_bridge.retry_deliveries` | Retry failed deliveries |

---

## Defining Authorization

### Laravel Gate

Override any gate in your `AppServiceProvider::boot()`:

```php
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('automation_bridge.view_triggers', function ($user) {
        return $user->isAdmin();
    });

    Gate::define('automation_bridge.create_triggers', function ($user) {
        return $user->isAdmin();
    });
}
```

### Spatie Permission Roles

If you're using `spatie/laravel-permission`:

```php
Gate::define('automation_bridge.view_triggers', function ($user) {
    return $user->hasRole('admin') || $user->hasPermissionTo('manage-automations');
});
```

### Custom Logic

Gate closures can use any condition:

```php
Gate::define('automation_bridge.create_triggers', function ($user) {
    return $user->team->plan === 'enterprise';
});

Gate::define('automation_bridge.retry_deliveries', function ($user) {
    return $user->isAdmin() && $user->team->subscription()->active();
});
```

### Environment-Based Access

Disable access entirely in certain environments:

```php
Gate::define('automation_bridge.view_triggers', function ($user) {
    return !app()->environment('production') || $user->isAdmin();
});
```

---

## Disabling Auto-Registration

If you prefer to define all gates manually, disable auto-registration:

```php
// config/filament-automation-bridge.php
'authorization' => [
    'auto_register_gates' => false,
],
```

Then define each gate you need in your service provider. Any undefined gate will deny access.

---

## Permission Prefix

The authorization prefix can be customized:

```php
'authorization' => [
    'permission_prefix' => 'fab',
],
```

This changes the gate names to `fab.view_triggers`, `fab.create_triggers`, etc.

---

## Next Steps

- **[Getting Started](/filament-automation-bridge/getting-started)** — Walk through the full workflow
- **[Configuration](/filament-automation-bridge/configuration)** — Full config reference
- **[Trigger Types](/filament-automation-bridge/features/trigger-types)** — Explore all six trigger types
