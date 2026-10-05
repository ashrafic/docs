---
title: Service Codes
---

FedEx identifies services by code. The package supports these eleven:

| Code | Service |
|---|---|
| `FEDEX_GROUND` | FedEx Ground |
| `FEDEX_HOME_DELIVERY` | FedEx Home Delivery |
| `FEDEX_EXPRESS_SAVER` | FedEx Express Saver |
| `FEDEX_2_DAY` | FedEx 2Day |
| `FEDEX_2_DAY_AM` | FedEx 2Day AM |
| `PRIORITY_OVERNIGHT` | FedEx Priority Overnight |
| `STANDARD_OVERNIGHT` | FedEx Standard Overnight |
| `FIRST_OVERNIGHT` | FedEx First Overnight |
| `FEDEX_INTERNATIONAL_PRIORITY` | FedEx International Priority |
| `FEDEX_INTERNATIONAL_ECONOMY` | FedEx International Economy |
| `FEDEX_INTERNATIONAL_FIRST` | FedEx International First |

## Where Codes Apply

- **Allowed Services** (admin configuration) — only checked services are quoted at checkout. Leave it empty to allow everything.
- **Label service picker** — the order-screen picker shows your allowed services, so you can't accidentally ship `FEDEX_FIRST_OVERNIGHT` when you meant Ground.
- **Rate caching** — the allowed-services list is part of the cache fingerprint; changing it invalidates cached quotes.

:::tip
The three domestic overnight tiers and 2Day AM are premium services — most stores allow Ground, Home Delivery, Express Saver, and 2Day only. Fewer allowed services means a cleaner checkout.
:::

The canonical map lives in `RateService::SERVICES` — human labels at checkout always come from FedEx's response when available, falling back to these names.
