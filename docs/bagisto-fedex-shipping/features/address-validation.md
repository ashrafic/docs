---
title: Address Validation
sidebar_position: 6
---

FedEx maintains a database of every deliverable address in the US. The package exposes it two ways — a command for one-off checks and a service for your own code.

![Address validation](/bagisto-fedex-shipping/assets/screenshots/address-validation.png)

## From the Command Line

```bash
php artisan fedex:validate-address --street="1600 Amphitheatre Pkwy" --city="Mountain View" --state=CA --zip=94043
```

The command prints:

- **Classification** — how FedEx classifies the address (residential or business)
- **Resolved values** — the normalized address FedEx has on file, field by field
- **Messages** — any warnings FedEx attaches (e.g. "matched to a slightly different address")

Run `php artisan fedex:validate-address --help` for all options. See the [commands reference](/bagisto-fedex-shipping/reference/commands) for details.

## Programmatically

The `AddressValidationService` is resolvable from the container:

```php
use Ashrafic\FedexShipping\Services\AddressValidationService;

$result = app(AddressValidationService::class)->validate([
    'address' => ['1600 Amphitheatre Pkwy'],
    'city' => 'Mountain View',
    'state' => 'CA',
    'zipcode' => '94043',
    'country' => 'US',
]);

$result['classification']; // "MIXED", "RESIDENTIAL", "BUSINESS", ...
$result['resolved'];       // normalized address fields
$result['messages'];       // FedEx customer messages
```

## Why It Matters

- **Residential surcharges** are one of the biggest hidden shipping costs — validating addresses tells you which orders will carry them
- **Failed deliveries** cost real money — a normalized address before you print the label prevents them
- Validate at order import, customer signup, or anywhere addresses enter your system
