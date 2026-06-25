---
title: Translatable UI
---

All suite labels, notifications, actions, and helper texts — ~300 strings — are translatable. Publish the language files:

```bash
php artisan vendor:publish --tag=filament-translation-suite-translations
```

This copies 13 language files to `lang/vendor/filament-translation-suite/`. Duplicate the `en/` folder for any locale and translate the strings. Once published, your translations take priority over the package defaults.
