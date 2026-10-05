---
title: Shipping Labels
sidebar_position: 4
---

Turn a paid order into a FedEx shipment without leaving the admin panel.

## Creating a Label

1. Open the order under **Sales → Orders** and click **Create FedEx Label**
2. Pick the service from the picker — it lists exactly the services you allow in the configuration
3. Confirm — the package builds the Ship API request from the order's shipping address and packed packages

The label PDF is generated, stored, and the **tracking number is written straight onto the Bagisto shipment** — the fulfillment record stays in sync automatically.

:::warning Phone Numbers Required
The FedEx Ship API rejects labels when **either contact** is missing a phone number. Make sure:
- The store phone is set under **Configure → Sales → Shipping Settings → Origin (Contact Number)**
- The order address includes a customer phone number
:::

## What Gets Stored

Each label creates a `fedex_shipments` record (see the [database reference](/bagisto-fedex-shipping/reference/database)):

- **Tracking number** and chosen service
- **Label PDF** stored on the `private` disk at `fedex-labels/<tracking-number>.pdf` — never publicly reachable
- **Label cost and currency** parsed from the shipment rating — your real postage spend, per shipment
- The raw FedEx response with document payloads stripped, for auditing

If the database insert fails, the stored PDF is rolled back automatically — no orphaned files.

## Downloading

Download from the order screen or the [FedEx Shipments page](/bagisto-fedex-shipping/features/admin-shipments). Labels stream as `fedex-label-<tracking-number>.pdf` — 4×6" PDF, ready for any thermal printer or FedEx dropoff.

## Voiding

Shipped the wrong service, or the customer cancelled? Click **Void**. The package calls the FedEx Ship cancellation API (`DELETE_ALL_PACKAGES`) and marks the record `VOIDED`. Voided labels remain in the history with their cost — useful for reconciling your FedEx invoice.

:::tip
Label creation uses the same mode as rating — sandbox labels in sandbox mode, real labels in production. Test the whole flow against the sandbox first; sandbox PDFs are virtualized but structurally identical.
:::
