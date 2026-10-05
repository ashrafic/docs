---
title: Admin Shipments Page
sidebar_position: 7
---

Every label you create lives in one place: **Sales → FedEx Shipments**.

![FedEx Shipments page](/bagisto-fedex-shipping/assets/screenshots/admin-shipments.png)

## What's on the Page

A paginated list of all FedEx shipments, newest first:

- **Tracking number** and the order it belongs to
- **Service** the label was created for
- **Status** — `LABEL_CREATED`, `VOIDED`, or the latest tracking status after a refresh
- **Label cost and currency** — your actual postage spend, per shipment
- **Actions** — Download Label, Void, Refresh Tracking

## Order Screen Integration

You never have to visit the page to create a label — a **Create FedEx Label** button is injected on every order view screen. It opens the service picker, and after creation you land back on the order with the tracking number attached to the Bagisto shipment.

## ACL & Roles

The page and all its actions are registered under the ACL key `sales.fedex-shipping`, covering every route:

- `admin.fedex-shipping.index` — the shipments list
- `admin.fedex-shipping.labels.create` / `store` — label creation
- `admin.fedex-shipping.labels.download` — label download
- `admin.fedex-shipping.labels.void` — label voiding
- `admin.fedex-shipping.labels.track` — tracking refresh

Assign it in **Roles** like any Bagisto permission — give fulfillment staff label access without handing over the whole sales area. The menu entry respects the same permission automatically.
