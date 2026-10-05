---
title: Getting Started
---

Bagisto FedEx Shipping brings the full FedEx REST API into your Bagisto 2.x store — live rates at checkout, shipping labels from the admin order screen, tracking refresh, and address validation. Built on the modern FedEx REST API with OAuth 2 client credentials.

:::tip Before You Begin
Make sure you've completed [Installation](/bagisto-fedex-shipping/installation) and [Configuration](/bagisto-fedex-shipping/configuration) first — including your FedEx API keys and the store **Shipping Origin**.

By default, the FedEx carrier is disabled until you enable it in the admin configuration.
:::

This guide walks you through the full workflow — from first rate request to fulfilled, tracked orders.

---

## Workflow

1. **Configure** your FedEx credentials and shipping preferences in the admin panel
2. **Quote** live FedEx rates automatically at checkout — with delivery estimates
3. **Fulfill** orders with shipping labels, then track them until delivery

---

## Live Rates at Checkout

As soon as the carrier is enabled, every customer with a shipping address sees real FedEx rates — no cache warmup, no cron jobs.

- One rate per allowed service (Ground, Home Delivery, 2Day, Overnight, International, …)
- **Estimated delivery dates** appended to each service title (toggleable)
- **Account (negotiated) rates** applied automatically when your FedEx account number is configured
- Rates are **cached** for a configurable window to protect your API quota

On any FedEx failure, the carrier quietly hides itself and logs the cause — checkout never breaks.

See [Live Rates](/bagisto-fedex-shipping/features/live-rates) for the full behavior.

---

## Admin Fulfillment

Open any order and click **Create FedEx Label**. Pick a service, confirm, and the PDF label is generated and stored privately — the tracking number is written straight onto the Bagisto shipment.

![Admin order fulfillment](/bagisto-fedex-shipping/assets/screenshots/order-details.png)

- **Download** labels anytime from the order or the FedEx Shipments page
- **Void** labels you no longer need
- **Refresh Tracking** pulls the latest status and scan events from FedEx

Everything you've created lives under **Sales → FedEx Shipments** — every label with its status, cost, and actions. See [Shipping Labels](/bagisto-fedex-shipping/features/shipping-labels) and [Tracking](/bagisto-fedex-shipping/features/tracking).

---

## Developer Tools

Two artisan commands keep you productive:

```bash
# Smoke-test your credentials and print sample rates
php artisan fedex:test --postcode=10001

# Validate any address against the FedEx database
php artisan fedex:validate-address --street="1600 Amphitheatre Pkwy" --city="Mountain View" --state=CA --zip=94043
```

A **sandbox / production mode toggle** means you develop against FedEx's sandbox and go live from the admin panel — no code changes. See [Commands](/bagisto-fedex-shipping/reference/commands) for the full reference.

---

## Next Steps

- [Install the package](/bagisto-fedex-shipping/installation)
- [Configure FedEx credentials & services](/bagisto-fedex-shipping/configuration)
- [Explore all features](/bagisto-fedex-shipping/features)
- [View pricing](/bagisto-fedex-shipping/pricing)
