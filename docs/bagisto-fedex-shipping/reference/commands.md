---
title: Commands
---

The package ships two artisan commands for developing and debugging without touching the browser.

## `fedex:test`

Smoke-test your credentials and print sample rates for a destination.

```bash
php artisan fedex:test {--postcode=10001} {--country=US}
```

| Option | Default | Description |
|---|---|---|
| `--postcode` | `10001` | Destination postcode |
| `--country` | `US` | Destination country |

The command:

1. Prints the active **mode** (`SANDBOX` or `PRODUCTION`)
2. Quotes a single 5 lb package against the destination
3. Prints a table of every returned rate — service, code, and priced amount

```text
Mode: SANDBOX

Service               Code                 Amount
 -------------------- -------------------- ---------
 FedEx Ground          FEDEX_GROUND         USD 12.34
 FedEx Home Delivery   FEDEX_HOME_DELIVERY  USD 11.99
```

**Interpreting results:**

- **`FedEx request failed: […]`** — credentials, mode, or connectivity problem. The message is FedEx's own error text.
- **`Request succeeded but no services were returned`** — everything works, but nothing matched your **Allowed Services** list (or the sandbox returned nothing for that lane — try another postcode).

If the store **Shipping Origin** isn't configured yet, the command notes it and uses a default origin so you can test before finishing setup.

## `fedex:validate-address`

Validate any address against the FedEx address database.

```bash
php artisan fedex:validate-address
    {--street= : Street address line}
    {--city= : City}
    {--state= : State or province code}
    {--zip= : Postcode}
    {--country=US : Country code}
```

| Option | Default | Description |
|---|---|---|
| `--street` | — | Street address line |
| `--city` | — | City |
| `--state` | — | State or province code (e.g. `CA`) |
| `--zip` | — | Postcode |
| `--country` | `US` | Country code |

Output:

- **Classification** — FedEx's classification of the address (`RESIDENTIAL`, `BUSINESS`, `MIXED`)
- A **resolved values** table — the normalized address FedEx has on file
- **Messages** — any warnings FedEx attaches to the match

```bash
php artisan fedex:validate-address --street="1600 Amphitheatre Pkwy" --city="Mountain View" --state=CA --zip=94043
```

Both commands fail loudly with FedEx's error message when something is wrong — pair them with **Debug Logging** for full request/response visibility.
