---
title: Branded Login
sidebar_position: 5
---


The branded login page extends Filament's native login screen with the tenant's logo, brand name, and colors. One class swap — everything renders automatically.

---

## Setup

In your PanelProvider, swap the login class:

```php
use FilamentWhiteLabel\Pages\Auth\BrandedLogin;
use Filament\Panel;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->tenant(Team::class)
            ->whiteLabel()
            ->login(BrandedLogin::class) // <-- branded login
            ->resources([
                \FilamentWhiteLabel\Resources\WhiteLabelSettingsResource::class,
            ]);
    }
}
```

That's it. The login page now renders:

| Element | Source |
|---|---|
| **Logo** | Tenant's light/dark logo (falls back to config default) |
| **Brand Name** | Tenant's brand name (falls back to `APP_NAME`) |
| **Colors** | Tenant's primary, secondary, and other color roles |

---

## What It Extends

`BrandedLogin` extends Filament's native `Login` page. It doesn't replace it — it layers on top:

```php
namespace FilamentWhiteLabel\Pages\Auth;

use Filament\Pages\Auth\Login;

class BrandedLogin extends Login
{
    // Injects brandName, brandLogo, and brandColors into the view data
    // All native auth features are preserved
}
```

Every feature of Filament's login is preserved:
- Password reset flow
- Multi-factor authentication (MFA)
- Social login providers (if configured)
- Rate limiting
- Remember me
- Custom form fields

---

## Multi-Tenant Login

When using multi-tenancy, the login page appears **before** a tenant is selected. The package handles this:

- If no tenant context exists, the branded login uses **global settings** (the `WhiteLabelSettings` record with `tenant_type = NULL`)
- If a panel ID is available (e.g., from the URL path), the panel-specific global record is used
- Falls back to config defaults if no global record exists

This means your login page can have a consistent **platform-level** brand while individual tenants use their own branding once logged in.

### Setting Up Global Branding

To brand the login page, create a global settings record:

1. Navigate to **White Label → Brand** in your panel
2. Set the logo, brand name, and colors you want on the login page
3. These are stored with `tenant_type = NULL, tenant_id = NULL`

The login page resolves against this global record.

---

## Conditional Branded Login

You can conditionally apply the branded login:

```php
use FilamentWhiteLabel\Pages\Auth\BrandedLogin;
use Filament\Pages\Auth\Login;

$panel->login(
    config('filament-white-label.login.enabled')
        ? BrandedLogin::class
        : Login::class
);
```

Or disable it entirely via env:

```ini
FILAMENT_WHITE_LABEL_LOGIN_ENABLED=false
```

---

## Customization

### Override the Branded Login Page

You can extend `BrandedLogin` to add your own logic:

```php
use FilamentWhiteLabel\Pages\Auth\BrandedLogin as BaseBrandedLogin;

class CustomBrandedLogin extends BaseBrandedLogin
{
    protected function getViewData(): array
    {
        return [
            ...parent::getViewData(),
            'customMessage' => 'Welcome to our platform',
        ];
    }
}
```

### Customize the View

Publish the Filament login view and modify it:

```bash
php artisan vendor:publish --tag=filament-panels-views
```

Add your own rendering of the injected `$brandName`, `$brandLogo`, and `$brandColors` variables.

---

## How Data Reaches the Login View

The branded login page's `getViewData()` method calls the `WhiteLabel` service:

```php
use FilamentWhiteLabel\FilamentWhiteLabel;

protected function getViewData(): array
{
    return [
        ...parent::getViewData(),
        'brandName' => FilamentWhiteLabel::brandName(),
        'brandLogo' => FilamentWhiteLabel::logoUrl(),
        'brandColors' => FilamentWhiteLabel::colors(),
    ];
}
```

The service resolves from:
1. Global settings record (if exists)
2. Config defaults (`filament-white-label.defaults.*`)

---

## Disabling Branded Login

Set `login.enabled` to `false` in config:

```php
// config/filament-white-label.php
'login' => [
    'enabled' => false,
],
```

Or via env:

```ini
FILAMENT_WHITE_LABEL_LOGIN_ENABLED=false
```

The login page reverts to Filament's default look.

---

## Next Steps

- [Integration Patterns](/filament-white-label/features/integration-patterns) — Wire the entire package into your PanelProvider
- [Configuration](/filament-white-label/configuration) — Control login defaults
- [Resolution Flow](/filament-white-label/reference/resolution-flow) — Understand how settings resolve per context
