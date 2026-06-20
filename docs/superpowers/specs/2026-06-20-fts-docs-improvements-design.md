# FTS Docs Improvements — Design Spec

**Date:** 2026-06-20
**Scope:** Filament Translation Suite documentation

---

## Problem

1. **Outdated version constraint**: `installation.md` states Filament `^5.0` only, but v4.x is now supported.
2. **Scattered setup instructions**: Model configuration (`HasTranslations` trait) is buried in `features/content-models.md`. Form morphing setup is in a separate `features/form-morphing.md`. New users must jump between 3+ pages to get translatable content working.
3. **Missing Spatie integration link**: Users relying on `spatie/laravel-translatable` for model storage have no pointer to the upstream docs.

## Changes

### 1. Update Filament Version Constraint

| File | Line | Old | New |
|------|------|-----|-----|
| `installation.md` | 14 | `\| Filament \| \`^5.0\`` | `\| Filament \| \`^4.0 \|\| ^5.0\`` |

### 2. Add "Content Translation Setup" Quick Checklist

**File:** `getting-started.md`
**Location:** After "Form Translation Views" section, before "Language Switcher"

A concise section with a 3-step numbered checklist:
- Step 1: Add `HasTranslations` trait + `$translatable` array on your model
- Step 2: Model is auto-discovered — see it on Content Translation page
- Step 3: Resource forms get locale tabs automatically (form morphing)
- Link to full guide for explicit morphing modes
- Note about `spatie/laravel-translatable` upstream docs

### 3. New Page: "Translatable Models: A Complete Guide"

**File:** `docs/filament-translation-suite/translatable-models.md`

End-to-end walkthrough using a concrete `Post` model example:

| Section | Content |
|---------|---------|
| Quick Start | Trait + array = done, model appears in Content Translation |
| Model Setup | Full code: `use HasTranslations` + `$translatable` property |
| Auto-Discovery | How the suite scans `app/Models`, what appears on the Content Translation page |
| Spatie Integration | "FTS stores translations via `spatie/laravel-translatable`. For advanced config (fallback locales, query scoping), see [Spatie docs](https://spatie.be/docs/laravel-translatable)." |
| Form Morphing | Default auto-tabs, explicit modes (Stack, Sections, Fieldset) with code snippets |
| Table Columns | `TranslatableColumn` usage |
| Bulk Translation | Queue-based bulk translate for model records |
| Common Patterns | Slug fields (hidden mode), SEO fields, grouped fields |

### 4. Add Spatie Link and Cross-Links to Existing Pages

| File | Change |
|------|--------|
| `installation.md` | Add a "Next Steps" link to the new translatable models guide |
| `getting-started.md` | Checklist links to full guide |
| `features/content-models.md` | In "Model Requirements" section, add Spatie upstream docs link next to example code |
| `features/form-morphing.md` | Add cross-link to translatable models guide at top |

---

## Implementation Order

1. Update filament version in `installation.md`
2. Add quick checklist section to `getting-started.md`
3. Create `translatable-models.md`
4. Add Spatie link and cross-links to existing pages
