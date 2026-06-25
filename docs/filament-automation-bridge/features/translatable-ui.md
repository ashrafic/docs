---
title: Translatable UI
---

All ~330 UI strings — labels, form fields, table columns, actions, notifications, widgets, enum values, and command output — are translatable. Publish the language files:

```bash
php artisan vendor:publish --tag=filament-automation-bridge-translations
```

This copies `resources/lang/en/automation-bridge.php` to `resources/lang/vendor/filament-automation-bridge/`. Duplicate it for any locale and translate the strings. Once published, your translations take priority over the package defaults.
