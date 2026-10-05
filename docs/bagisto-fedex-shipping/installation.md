---
title: Installation
---


## Requirements

Before installing, ensure your environment meets the following requirements:

| Requirement | Version
|-------------|--------
| PHP | `^8.3`
| Laravel | `^11.0 &#124; ^12.0`
| Bagisto | `2.2` or newer
| FedEx credentials | Free test keys — no FedEx account or credit card needed

---

## Installation
### Composer Registry

Bagisto FedEx Shipping is distributed through the **Ashrafic Labs Private Composer Registry**. After [purchasing your license](/bagisto-fedex-shipping/pricing), you'll receive a license key via email. You can also find it anytime in the [License Portal](https://packages.ashraficlabs.com/portal).

### 1. Add the repository

Add the registry to your `composer.json` by running this command:

```bash
composer config repositories.ashrafic composer https://packages.ashraficlabs.com/composer
```

Or manually add it to your `composer.json`:

```json
"repositories": [
    {
        "name": "ashrafic",
        "type": "composer",
        "url": "https://packages.ashraficlabs.com/composer"
    }
]
```

### 2. Authenticate

Authenticate with the registry by running this command, using your email address and license key:

```bash
composer config --auth http-basic.packages.ashraficlabs.com "YOUR_EMAIL_ADDRESS" "YOUR_LICENSE_KEY"
```

### 3. Install the package

Install the package by running this command:

```bash
composer require ashrafic/bagisto-fedex-shipping
```

Finish by running the migrations and clearing the caches:

```bash
php artisan migrate          # creates the fedex_shipments table
php artisan optimize:clear
```

That's it. Laravel package discovery registers the service provider automatically — no config file edits, no provider registration, no manual cache rebuilds.

---

## Get FedEx Credentials

The package talks to the FedEx REST API using your own credentials from the FedEx Developer Portal. Test keys are free and work immediately against the sandbox.

1. Register at the [FedEx Developer Portal](https://developer.fedex.com) — free, no card needed
2. Create an **organization**, then a **project**, selecting these APIs:
   - **Rates and Transit Times API** — checkout rates
   - **Basic Integrated Visibility** — the Track API
   - **Ship API** — label creation
   - **Address Validation API** — address checking
3. Copy the **API Key** and **Secret Key** from the project (the secret is shown once)

Test keys work immediately against the sandbox — a FedEx shipping account is only required to move to production.

---

## Verify the Install

Configure your keys under Admin → **Configure → Sales → Shipping Methods → FedEx Shipping**, then smoke-test:

```bash
php artisan fedex:test --postcode=10001
```

You should see a table of live sandbox rates:

```text
Service               Code                        Amount
 -------------------- --------------------------- ---------
 FedEx Ground         FEDEX_GROUND                USD 12.34
 FedEx 2Day           FEDEX_2_DAY                 USD 45.67
```

:::note Sandbox Prices
The FedEx sandbox is a virtualizer — prices are simulated and will look unrealistic. It proves your plumbing works. Real pricing appears in production mode.
:::

---

## Next Steps

- **[Configuration](/bagisto-fedex-shipping/configuration)** — FedEx developer portal setup, every admin field explained, and the going-live checklist
- **[Live Rates](/bagisto-fedex-shipping/features/live-rates)** — How checkout quoting works
- **[Shipping Labels](/bagisto-fedex-shipping/features/shipping-labels)** — Create, download, and void labels
- **[Commands](/bagisto-fedex-shipping/reference/commands)** — `fedex:test` and `fedex:validate-address` reference

---

## Support

Bagisto FedEx Shipping is a commercial product. See [Pricing & Licensing](/bagisto-fedex-shipping/pricing) for details.

- **Documentation**: You're reading it
- **Website**: [ashraficlabs.com](https://ashraficlabs.com)
- **Purchases & Licenses**: Manage through the [License Portal](https://packages.ashraficlabs.com/portal)
- **Licensing**: See our [Pricing page](/bagisto-fedex-shipping/pricing)
