---
title: Features
sidebar_label: Overview
sidebar_position: 1
---


Every Filament panel is a canvas. Filament White Label puts the brush in your tenants' hands — or yours. Brand identity, colors, typography, layout, density, and behavior. All configurable from a clean UI without touching a line of code.

---

## The Problem

### Multi-Tenant SaaS

Your tenants log in and see **your** logo, **your** colors, **your** brand. That's your panel with their data — not their panel. Manually wiring `brandLogo()` + `colors()` + `favicon()` per tenant is repetitive and breaks with every Filament update.

### Single-Tenant App

You want to rebrand your portal without code. A designer or product owner should be able to swap the logo and tweak colors — not wait for a developer to push a config change.

---

## Three Feature Categories

### 1. Brand — Visual Identity & Design System

Logo (light + dark), favicon, brand name, logo height. Six color roles — primary, secondary, danger, warning, success, info — each with palette presets from every Filament color or a custom hex. Forty-nine Google Fonts via CDN with a searchable selector. CSS theme controls for border radius, input radius, badge shape, and shadow intensity. A sanitized custom CSS textarea for anything beyond the built-in controls.

Everything that makes a panel **feel** like a brand.

### 2. Layout — Panel Structure & Chrome

Top bar on/off. Top navigation that moves the menu into the header. Sidebar — always visible, collapsible to icons, or fully hidden. Navigation groups expandable or locked. Breadcrumbs on or off. Content width (narrow, standard, full), sidebar width, page heading size, nav item spacing. A footer with custom text and a repeater of links.

Everything that shapes **how** the panel is structured.

### 3. Advanced — Behavior, Density & Accessibility

SPA mode for faster page transitions. Unsaved changes alerts. Database notifications with configurable polling. Font scale from 90% to 120% for accessibility. Form and table density (compact, default, spacious). Modal sizing from small to extra-large. Transition speed from instant to slow.

Everything that controls **how** the panel behaves and feels.

---

## Branded Login

One class swap — `$panel->login(BrandedLogin::class)` — and the login page renders your logo, brand name, and colors. Extends Filament's native login. All auth features preserved: password reset, MFA, social login.

---

## Integration

Four patterns, from one line to full control:

| Pattern | Code | Use When |
|---|---|---|
| **Macro** | `$panel->whiteLabel()` | Standard setup |
| **Conditional** | `$panel->whiteLabel(can('manage-branding'))` | Gated access |
| **Granular Trait** | `use HasWhiteLabel` | Pick & choose settings |
| **Static Facade** | `FilamentWhiteLabel::brandName()` | Outside PanelProvider |

See [Integration Patterns](/filament-white-label/features/integration-patterns) for full code examples.

---

## Architecture

### Schema-Free Metadata

All settings in a single `metadata` JSON column. New settings in future releases — zero migrations.

### Three-Mode Operation

Works before, during, and after multi-tenancy:

| Mode | Resolution |
|---|---|
| **Multi-Tenant** | Per-tenant `WhiteLabelSettings` record |
| **Single-Tenant** | Global record (`tenant_type = null`) |
| **Config-Only** | `config('filament-white-label.defaults.*')` |

### Multi-Panel Aware

One tenant, different branding per panel. Admin and app panels can look completely different.

### Safe by Default

CSS sanitized against XSS. File uploads validated and tenant-scoped. Cache keys isolated per tenant + panel. All user content escaped before rendering.

---

## Feature Map

| Category | Feature | Description |
|---|---|---|
| **Brand** | [Brand Settings](/filament-white-label/features/brand-settings) | Logo, 6 colors, 49 fonts, CSS theme, custom CSS |
| **Layout** | [Layout Settings](/filament-white-label/features/layout-settings) | Navigation, sidebar, breadcrumbs, dimensions, footer |
| **Advanced** | [Advanced Settings](/filament-white-label/features/advanced-settings) | SPA mode, notifications, density, modals, transitions |
| **Auth** | [Branded Login](/filament-white-label/features/branded-login) | Branded login page extending native Filament auth |
| **DX** | [Integration Patterns](/filament-white-label/features/integration-patterns) | Macro, trait, facade, and manual integration |

---

## Next Steps

- **New to the package?** Start with [Getting Started](/filament-white-label/getting-started) for a hands-on walkthrough
- **Tweaking the design system?** Jump to [Brand Settings](/filament-white-label/features/brand-settings)
- **Wiring it up?** See [Integration Patterns](/filament-white-label/features/integration-patterns)
