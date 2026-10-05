---
title: Tracking
sidebar_position: 5
---

Every label comes with one-click tracking pulled live from the FedEx Track API.

![Tracking](/bagisto-fedex-shipping/assets/screenshots/tracking.png)

## Refreshing Tracking

On any label — the order screen or the [FedEx Shipments page](/bagisto-fedex-shipping/features/admin-shipments) — click **Refresh Tracking**. The package calls `/track/v1/tracking` with detailed scans enabled and normalizes the response.

## What You Get

- **Status** — FedEx's latest status description ("Delivered", "On FedEx vehicle for delivery", …) with its status code
- **Estimated delivery** — the estimated or actual delivery date
- **Scan events, newest first** — each with date, time, location (city, state, country), and description

The refresh timestamp is recorded on the shipment, so you always know how fresh the data is.

## Where It Shows Up

The normalized status and events are stored on the `fedex_shipments` record and shown in the admin. Customers keep using Bagisto's native order tracking — the tracking number written at label creation flows into the standard shipment record automatically.

## Tracking by Tracking Number

Tracking runs through the `TrackingService`, so you can track any FedEx number programmatically — not just labels you created:

```php
use Ashrafic\FedexShipping\Services\TrackingService;

$result = app(TrackingService::class)->track('774916612345678');

$result->status;            // "Delivered"
$result->statusCode;        // "DL"
$result->estimatedDelivery; // "2026-03-18"
$result->events;            // newest-first scan events
```

Each event is a normalized array: `date`, `time`, `location`, `description`.
