---
title: Package Packing
sidebar_position: 3
---

FedEx prices shipments per package. Your cart has items. The built-in packer bridges the gap — consolidating cart items into weight-capped FedEx packages automatically.

## How Packing Works

The default packer (`ItemPacker`) uses a simple, predictable strategy:

1. Each cart item's total weight is computed as **unit weight × quantity**, converted from the store's weight unit to your configured FedEx unit (`LB` or `KG`)
2. Items are packed into whole-item packages up to the weight cap — by default **150 lb**, the FedEx retail limit
3. Any single item heavier than the cap ships **one package per unit** (FedEx charges oversize regardless; nothing is silently dropped)

Two 8 lb items and three 40 lb items become two packages: one 16 lb, one 120 lb. No wasted space, no split items.

## Weight Unit Conversion

Bagisto stores product weights in the store's unit (LBS or KGS). The packer normalizes everything:

- `LBS` → `LB`, `KGS` → `KG` (spelling normalization)
- Pounds ↔ kilograms converted at 2.2046226218 lbs/kg when the store unit differs from the configured FedEx unit

You configure the FedEx unit once (**Weight Unit** in the admin); the packer handles the rest.

## Dimensions

If your products have length, width, and height set (Bagisto product attributes), the packer forwards them on every package line — letting FedEx apply **dimensional-weight pricing** instead of guessing from weight alone.

Products without dimensions simply rate by weight. String or empty attribute values are sanitized automatically.

## Custom Packing Strategies

The packer is bound behind a `PackerInterface`, so you can swap in your own strategy (box-based packing, per-SKU packaging, etc.) with a container binding:

```php
use Ashrafic\FedexShipping\Packing\PackerInterface;
use App\Shipping\BoxPacker;

$this->app->bind(PackerInterface::class, BoxPacker::class);
```

Your packer just needs to return an array of `CartPackage` DTOs — weight in the configured FedEx unit, plus optional dimensions.
