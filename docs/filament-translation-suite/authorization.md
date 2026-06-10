---
title: Authorization
---

Filament Translation Suite provides a single authorization gate that controls access to all suite resources and pages.

## Basic Usage

Use the `authorize()` method when registering the plugin in your `PanelProvider`:

```php
use Ashrafic\FilamentTranslationSuite\FilamentTranslationSuitePlugin;

$panel->plugins([
    FilamentTranslationSuitePlugin::make()
        ->authorize(fn ($user) => $user->can('manage-translations')),
]);
```

## How It Works

- `authorize()` accepts a closure that receives the authenticated user
- Return `true` to grant access, `false` to deny
- If `authorize()` is never called, access is **open to all users** (default)

## Patterns

### Laravel Gate / Permission

```php
->authorize(fn ($user) => $user->can('manage-translations'))
```

### Spatie Permission Roles

```php
->authorize(fn ($user) => $user->hasRole('admin') || $user->hasRole('translator'))
```

### Custom Logic

```php
->authorize(function ($user) {
    return $user->can('manage-translations') && $user->team->plan === 'pro';
})
```

### Environment-Based

```php
->authorize(function ($user) {
    if (app()->environment('local')) return true;
    return $user->can('manage-translations');
})
```

## Programmatic Check

The `isAuthorized()` method is available if you need to check access outside the plugin:

```php
$plugin = FilamentTranslationSuitePlugin::make();

if ($plugin->isAuthorized(auth()->user())) {
    // User has access
}
```

---

:::tip Where to Register
Authorization is set during [panel registration](/filament-translation-suite/installation#panel-registration). See the [Installation guide](/filament-translation-suite/installation) for the full setup.
:::
