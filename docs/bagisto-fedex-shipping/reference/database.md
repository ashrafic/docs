---
title: Database
---

The package adds one table, created by the included migration:

```bash
php artisan migrate
```

## `fedex_shipments`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint PK | |
| `order_id` | unsignedBigInteger, nullable, **indexed** | Bagisto order the label belongs to |
| `shipment_id` | unsignedBigInteger, nullable | Bagisto shipment record, when linked |
| `tracking_number` | string, **indexed** | FedEx master tracking number |
| `service_code` | string, nullable | e.g. `FEDEX_GROUND` |
| `status` | string, nullable | `LABEL_CREATED`, `VOIDED`, or latest tracking status |
| `status_code` | string, nullable | FedEx status code (e.g. `DL`) |
| `estimated_delivery` | string, nullable | Estimated/actual delivery date from tracking |
| `label_path` | string, nullable | PDF path on the label disk (`fedex-labels/<tracking>.pdf`) |
| `label_cost` | decimal(12,4), nullable | Postage cost parsed from the label response |
| `label_currency` | char(3), nullable | ISO currency of the cost |
| `voided_at` | timestamp, nullable | Set when the label is voided |
| `tracked_at` | timestamp, nullable | Last tracking refresh |
| `raw` | longText, nullable | FedEx response (document payloads stripped), JSON-cast |
| `created_at` / `updated_at` | timestamps | |

## Model

`Ashrafic\FedexShipping\Models\FedexShipment` — standard Eloquent model with everything fillable and these casts:

```php
'label_cost' => 'decimal:4',
'voided_at'  => 'datetime',
'tracked_at' => 'datetime',
'raw'        => 'array',
```

## Label Storage

Label PDFs are written to `fedex-labels/<tracking-number>.pdf` on the disk configured by `label_disk` (**`private` by default** — not publicly reachable). Downloads stream through an authenticated admin route, so the disk stays private.

If the shipment record can't be saved, the PDF is deleted again automatically — no orphaned label files.
