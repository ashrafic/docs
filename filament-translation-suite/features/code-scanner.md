---

# Code Scanner

The Code Scanner automatically detects translation function usage across your entire codebase. It finds strings wrapped in `__()`, `trans()`, `trans_choice()`, and `@lang()` and tells you which ones aren't yet registered in your translation database.

---

## Why You Need It

In a growing Laravel application, it's easy to forget to register translation keys. A developer writes:

```php
$message = __('messages.welcome');
```

...but never adds `welcome` to `lang/en/messages.php`. The application falls back to displaying the raw key, which is a poor user experience.

The Code Scanner solves this by:
1. **Scanning** all configured directories for translation function calls
2. **Comparing** found keys against your database of registered translations
3. **Reporting** missing keys with file paths and line numbers
4. **Registering** missing keys in one click

---

## How It Works

### Scanning

Click **"Scan Codebase"** from the **System Translations** header actions. The scanner:

- Reads every `.php` file in the configured paths
- Extracts the first argument to `__()`, `trans()`, `trans_choice()`, and `@lang()`
- Parses dot-notation keys (`messages.welcome`) into group/key pairs
- Deduplicates results across files

### Results Modal

The scan results modal shows:
- **Missing keys** — translation calls not found in the database
- **File and line number** — exactly where each call is located
- **Total files scanned** — coverage of your codebase

### One-Click Registration

Click **"Register Missing"** to create database records for all unregistered keys. They are imported with `source: code_scanner` so you can track their origin.

---

## Configuration

Control which directories and functions the scanner monitors:

```php
'scanner' => [
    'paths' => ['app', 'resources/views', 'routes'],
    'functions' => ['__', 'trans', 'trans_choice', '@lang'],
],
```

### Paths

The scanner recursively searches all `.php` files in each path. Add custom directories as needed:

```php
'paths' => ['app', 'resources/views', 'routes', 'custom'],
```

### Functions

The scanner supports four translation functions out of the box:

| Function | Example | Notes
|----------|---------|------
| `__()` | `__('messages.welcome')` | Most common; also used for JSON keys
| `trans()` | `trans('messages.welcome')` | Same as `__()`
| `trans_choice()` | `trans_choice('messages.apples', 5)` | Supports pluralization
| `@lang()` | `@lang('messages.welcome')` | Blade directive

You can add custom functions if your application uses wrappers:

```php
'functions' => ['__', 'trans', 'trans_choice', '@lang', 'my_custom_trans'],
```

---

## Key Parsing

The scanner uses dot-notation to split keys into groups:

```
messages.welcome     → group: messages, key: welcome
validation.required  → group: validation, key: required
Hello World          → group: *, key: Hello World
```

Keys without dots are placed in the `*` group, matching Laravel's JSON translation convention.

---

## Usage Explorer

Every registered translation key has a **"Usage"** row action that opens a modal showing:
- **Every file** where the key is referenced
- **Line number** for each occurrence
- **Total files scanned** for context

This is invaluable when refactoring — you can see if a key is safe to rename or remove.

---

## Limitations

- The scanner only processes `.php` files. Blade templates are included because they're compiled to PHP, but pure JavaScript translation calls are **not** scanned.
- Dynamic keys (e.g., `__("messages.{$type}")`) cannot be resolved at scan time and are skipped.
- The scanner reads the first string argument only. It does not evaluate variables or expressions.

---

## Best Practices

1. **Run the scanner regularly** — make it part of your code review process
2. **Register missing keys immediately** — don't let untranslated strings accumulate
3. **Use descriptive group names** — `messages`, `validation`, `auth` are clearer than generic names
4. **Avoid dynamic keys where possible** — they can't be scanned or bulk-translated

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Manage the keys the scanner discovers
- **[Machine Translation](/filament-translation-suite/features/machine-translation)** — Translate newly registered keys automatically
- **[Auto-Translation Agent](/filament-translation-suite/features/auto-translation-agent)** — Let the suite handle new keys without manual intervention
