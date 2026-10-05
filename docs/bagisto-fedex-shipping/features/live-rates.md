---
title: Live Rates
sidebar_position: 2
---

The moment a customer reaches the shipping step of checkout, the package queries the FedEx Rate API and presents one option per allowed service — priced in real time.

![Live FedEx rates at checkout](/bagisto-fedex-shipping/assets/screenshots/checkout.png)

## What the Customer Sees

- **One rate per service** — Ground, Home Delivery, 2Day, Overnight, International, whatever you allow
- **Delivery estimates** — "est. delivery Mar 18" appended to each service title when *Show Delivery Estimates* is enabled
- **The carrier title and description** you set in the admin configuration

## How a Quote Works

1. The carrier collects cart items — only **stockable products with a weight** are rated
2. [ItemPacker](/bagisto-fedex-shipping/features/package-packing) consolidates them into FedEx packages
3. The rate request is built with your store **Shipping Origin** as shipper and the cart's shipping address as recipient
4. Allowed services are returned, the [handling fee](#handling-fees) is applied, and rates render at checkout

On any FedEx failure — timeout, outage, bad credentials — the carrier **hides itself and logs the cause**. Checkout never breaks because FedEx did.

:::note Rate Currency
Quotes are returned in FedEx's currency for the lane. If the quote currency differs from your store's base currency, the package logs a warning and uses the base currency conversion — check your FedEx account settings if you see this regularly.
:::

## Residential vs Commercial

The **Residential Delivery** flag (default: on) tells FedEx to price the lane as a residential delivery. Residential surcharges are real — if you ship mostly to businesses, turning this off can lower quoted prices. It applies to both rating and label creation.

## Account (Negotiated) Rates

Set your **FedEx Account Number** in the admin configuration and the rate request switches from list rates to **list + account rates** — your negotiated discount shows up at checkout automatically. The account rate is preferred whenever FedEx returns one.

:::tip
The account number is optional in sandbox mode but required in production — labels won't work without it.
:::

## Handling Fees

Add a **fixed amount** or a **percentage** to every rate. The fee is applied after the FedEx response and included in the cache, so customers always see the final price.

## Rate Caching

Every quote is cached against a fingerprint of everything that affects pricing — packages, destination, origin, mode, allowed services, fees, account number, packaging type, weight unit, and the residential flag.

- Default TTL is **15 minutes** — tune it per channel via *Rate Cache*
- Set it to `0` to disable caching entirely
- **Empty rate responses are never cached** — a transient FedEx hiccup can't poison the cache

The cache keeps you comfortably inside your FedEx API quota without customers ever noticing.

## Debugging a Quote

Enable **Debug Logging** and every request/response pair lands in your Laravel log. For structured checks, `fedex:test` prints a rate table for any destination postcode — see [Commands](/bagisto-fedex-shipping/reference/commands).
