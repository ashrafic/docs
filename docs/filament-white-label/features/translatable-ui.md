---
title: Translatable UI
---

All ~230 UI strings — labels, section headers, field descriptions, select options, command output, and helper texts — are translatable. Publish the language files:

```bash
php artisan vendor:publish --tag=filament-white-label-translations
```

This copies `lang/en/filament-white-label.php` to `lang/vendor/filament-white-label/`. Duplicate it for any locale and translate the strings. Once published, your translations take priority over the package defaults.
