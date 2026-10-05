---
title: Troubleshooting
---

## Quick Diagnostics

1. Enable **Debug Logging** in the FedEx configuration — every request/response is logged to your default Laravel channel
2. Run `php artisan fedex:test --postcode=10001` — it isolates credentials from checkout

## Common Symptoms

| Symptom | Likely cause |
|---|---|
| **No FedEx options at checkout** | Carrier disabled, no cart item has a weight, no shipping address entered, or the store **Shipping Origin** (Configure → Sales → Shipping Settings) is empty — FedEx rejects origin-less requests |
| **`fedex:test` prints "no services were returned"** | All returned services are outside your Allowed Services list, or the sandbox returned none for that lane — try another postcode |
| **`HTTP 503` / empty rate responses** | FedEx sandbox outage — retry later; nothing on your side is broken |
| **`HTTP 422 Invalid field value`** | Missing/invalid address input — check the Shipping Origin configuration |
| **Label creation fails with account errors** | Production mode requires the FedEx Account Number and production API approval |
| **`The store phone number is missing`** | Set your store phone under Configure → Sales → Shipping Settings → Origin (Contact Number) — the Ship API requires phone numbers on both contacts |
| **`The customer phone number is missing`** | The order's shipping address has no phone — FedEx requires it for labels |
| **Rate amounts look wrong** | You're in **sandbox mode** — see the sandbox notes below |

## Sandbox Notes

The FedEx sandbox is a **virtualizer**:

- Responses are simulated — **including prices**. Expect unrealistic amounts. It proves plumbing, not pricing
- It has occasional outages (HTTP 503 / empty responses). Retry later; nothing on your side is broken
- Virtualized responses carry a `VIRTUAL.RESPONSE` alert. The package treats sandbox and production response shapes identically wherever possible, and the response mapper accepts both documented charge layouts

## Still Stuck?

- Check the Laravel log with **Debug Logging** enabled — the failing request's path and FedEx's full error payload are captured
- Run `php artisan fedex:validate-address` on the problem address to rule out address issues
- Email us at [hello@ashraficlabs.com](mailto:hello@ashraficlabs.com) with the log excerpt and what you expected — commercial licenses include [support](/bagisto-fedex-shipping/pricing)
