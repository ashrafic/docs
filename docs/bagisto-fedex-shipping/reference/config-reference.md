---
title: Config Reference
---

There is no config file to publish. Defaults live in the package's `config/carriers.php`, and every runtime value is resolved by the `ConfigResolver` with this precedence:

1. **Bagisto admin value** — `core()->getConfigData('sales.carriers.fedex.…')` when running inside Bagisto
2. **Config file default** — `config('carriers.fedex.…')`
3. **Explicit fallback** — the caller's default

This is why the package needs no vendor:publish — the admin panel is the single source of truth, and the defaults below only matter for programmatic use outside Bagisto.

## Defaults

```php
<?php

return [
    'fedex' => [
        'code' => 'fedex',
        'title' => 'FedEx Shipping',
        'description' => 'FedEx Shipping',
        'active' => false,
        'class' => 'Ashrafic\FedexShipping\Carriers\Fedex',
        'mode' => 'sandbox',
        'client_key' => '',
        'client_secret' => '',
        'account_number' => '',
        'services' => '',
        'weight_unit' => 'LB',
        'packaging_type' => 'YOUR_PACKAGING',
        'max_package_weight' => 150,
        'residential' => true,
        'rate_delivery_estimates' => true,
        'label_disk' => 'private',
        'handling_fee_type' => 'fixed',
        'handling_fee_amount' => 0,
        'rate_cache_ttl' => 15,
        'debug' => false,
    ],
];
```

## Key Reference

| Key | Admin equivalent | Notes |
|---|---|---|
| `mode` | Mode | `sandbox` or `production` — switches the API base URL |
| `client_key` / `client_secret` | API Key / Secret Key | OAuth 2 client credentials |
| `account_number` | FedEx Account Number | Unlocks account rates; required for labels |
| `services` | Allowed Services | CSV string or array of [service codes](/bagisto-fedex-shipping/reference/service-codes); empty = all |
| `weight_unit` | Weight Unit | `LB` or `KG` — dimensions unit follows (`IN`/`CM`) |
| `packaging_type` | Packaging Type | `YOUR_PACKAGING`, `FEDEX_ENVELOPE`, `FEDEX_PAK`, `FEDEX_TUBE`, `FEDEX_SMALL_BOX`, `FEDEX_MEDIUM_BOX`, `FEDEX_LARGE_BOX`, `FEDEX_EXTRA_LARGE_BOX` |
| `max_package_weight` | — | Weight cap per package in the configured unit; default 150 |
| `residential` | Residential Delivery | Flags the quote/ship address residential |
| `rate_delivery_estimates` | Show Delivery Estimates | Appends est. delivery to checkout titles |
| `label_disk` | — | Laravel disk for label PDFs; default `private` |
| `handling_fee_type` / `handling_fee_amount` | Handling Fee | `fixed` or `percent` |
| `rate_cache_ttl` | Rate Cache | Minutes; `0` disables |
| `debug` | Debug Logging | Logs every API call/response |

## Caching Notes

- **OAuth tokens** are cached for the token lifetime minus a 5-minute safety margin, fingerprinted per credential set + mode — you can run sandbox and production side by side without token collisions.
- **Rate quotes** are cached under `fedex-shipping.rates.<fingerprint>` where the fingerprint covers packages, destination, origin, mode, services, handling fee, account number, packaging type, weight unit, and the residential flag.
