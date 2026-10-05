---
title: Configuration
---

All FedEx settings live in the Bagisto admin panel — no config files to edit, no environment variables to deploy.

**Location:** Admin → **Configure → Sales → Shipping Methods → FedEx Shipping**

Most fields are **channel-based**, so multi-channel stores can quote and ship differently per channel.

:::warning Configure the Shipping Origin First
FedEx rejects rate and label requests without a shipper origin. Set your store origin under **Configure → Sales → Shipping Settings → Origin** (address, city, state, postcode, country, and a contact number — the phone number is required for label creation).
:::

---

## Get FedEx Credentials

1. Register at the [FedEx Developer Portal](https://developer.fedex.com) — free, no card needed
2. Create an **organization**, then a **project**, selecting:
   - **Rates and Transit Times API**
   - **Basic Integrated Visibility** (the Track API)
   - **Ship API**
   - **Address Validation API**
3. Copy the **API Key** and **Secret Key** (the secret is shown once)

Test keys work immediately against the sandbox. A FedEx shipping account is only required to move to production.

---

## Field Reference

| Field | Type | Default | Notes |
|---|---|---|---|
| **Title** | text | — | Carrier name shown at checkout (channel & locale based) |
| **Description** | textarea | — | Shown under the carrier title at checkout (channel & locale based) |
| **Calculate Tax** | boolean | `on` | Whether shipping price is tax-calculable |
| **Status** | boolean | off | Enables the FedEx carrier for the channel |
| **Mode** | select | `Sandbox` | `Sandbox` hits `apis-sandbox.fedex.com`, `Production` hits `apis.fedex.com` |
| **API Key** | text | — | Client key from your developer portal project |
| **Secret Key** | password | — | Client secret — shown once when created |
| **FedEx Account Number** | text | — | Optional in sandbox. Required in production — unlocks account (negotiated) rates and is mandatory for labels |
| **Allowed Services** | multiselect | all | Which FedEx services are offered at checkout and in the label service picker |
| **Weight Unit** | select | `LB` | `LB` or `KG`. Cart weights are converted from the store's unit automatically |
| **Packaging Type** | select | `Your Packaging` | Your Packaging, Envelope, Pak, Tube, Small/Medium/Large/Extra-Large Box |
| **Residential Delivery** | boolean | `on` | Quote and ship as a residential address — affects pricing |
| **Show Delivery Estimates** | boolean | `on` | Appends "est. delivery …" to each service at checkout |
| **Handling Fee Type** | select | `Fixed` | `Fixed` amount or `Percent` of the rate |
| **Handling Fee** | number | `0` | Added to every quoted rate |
| **Rate Cache** | number | `15` | Quote cache lifetime in minutes. `0` disables caching |
| **Debug Logging** | boolean | off | Logs every FedEx request/response to the default log channel |

### Advanced Defaults

Two more settings ship as sane defaults (see the [config reference](/bagisto-fedex-shipping/reference/config-reference)):

| Setting | Default | Notes |
|---|---|---|
| `max_package_weight` | `150` lb | Cart items are split into multiple packages above this weight (FedEx retail limit) |
| `label_disk` | `private` | Storage disk for label PDFs. Change it in `config/carriers.php` if you use another disk |

---

## After Saving

Verify everything works before moving on:

```bash
php artisan fedex:test --postcode=10001
```

A rate table means your credentials, mode, and allowed services are wired correctly. See [Troubleshooting](/bagisto-fedex-shipping/reference/troubleshooting) if it isn't.

---

## Going Live

1. In the developer portal, **associate your FedEx shipping account** with your organization and request **production access** for the project's APIs — FedEx review can take a day or two
2. Create **production keys** for the project
3. In the admin panel: **Mode → Production**, swap in the production key/secret, and fill in your **FedEx Account Number** (account rates and labels depend on it)
4. Place one real order and verify rates, label, and tracking before announcing to customers

:::tip Sandbox vs Production
You can flip between modes anytime from the admin panel — no code changes, no cache surgery. OAuth tokens are cached per credential set, so switching modes never collides with stale tokens.
:::
