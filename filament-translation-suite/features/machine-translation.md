---

# Machine Translation

Filament Translation Suite integrates with four industry-leading translation providers to give you the best possible machine translation capabilities directly inside Filament.

No tab switching. No copy-paste workflows. Just click and translate.

---

## Supported Providers

| Provider | Best For | Setup Complexity
|----------|----------|------------------
| **DeepL** | High-quality European languages, formality control | Low — just an API key
| **Google Cloud Translate** | Massive language coverage, enterprise scale | Medium — Google Cloud project required
| **OpenAI ChatGPT** | Context-aware, nuanced, natural-sounding translations | Low — just an API key
| **Anthropic Claude** | High-quality AI with excellent tone preservation | Low — just an API key

All providers are **optional**. Install and configure only the ones you need. The suite auto-detects which are available and shows them in the UI.

---

## DeepL

DeepL is widely regarded as the highest-quality machine translator for European languages. It supports formality preferences and preserves formatting.

### Setup

```bash
composer require deeplcom/deepl-php
```

Add to `.env`:

```ini
FTS_DEEPL_API_KEY=your-deepl-auth-key
FTS_DEEPL_API_HOST=api-free.deepl.com
```

Use `api.deepl.com` for Pro accounts.

### Features

- **Formality control** — choose `default`, `more` formal, or `less` formal
- **30+ languages** with high-quality output
- **Formatting preservation** — HTML tags and line breaks are maintained
- **Placeholder protection** — `:name`, `:count`, and pluralization patterns are stripped before translation and restored after

### Configuration

```php
'deepl' => [
    'api_key' => env('FTS_DEEPL_API_KEY'),
    'api_host' => env('FTS_DEEPL_API_HOST', 'api-free.deepl.com'),
    'formality' => 'default', // 'default' | 'more' | 'less'
],
```

---

## Google Cloud Translation

Google Cloud Translation supports 100+ languages and is ideal when you need broad coverage or are already invested in the Google Cloud ecosystem.

### Setup

```bash
composer require google/cloud-translate
```

Add to `.env`:

```ini
FTS_GOOGLE_API_KEY=your-google-cloud-api-key
```

::: warning
Google Cloud Translate requires a billing-enabled Google Cloud project. Make sure you have billing configured and API quotas set appropriately.
:::

---

## OpenAI ChatGPT

ChatGPT excels at context-aware translation. It understands nuance, tone, and idiomatic expressions better than traditional statistical translators.

### Setup

No extra package needed. Add to `.env`:

```ini
FTS_OPENAI_API_KEY=sk-...
FTS_OPENAI_MODEL=gpt-4o-mini
```

### How It Works

The suite sends a structured prompt to the OpenAI API:

```
You are a professional translator. Translate text from {source} to {target}.
Preserve placeholders like :name, :count, :attribute exactly.
Output ONLY a JSON object: {"translation": "the translated text"}
```

The response is parsed and the translated text is extracted. Temperature is set low (`0.2`) for consistent, deterministic output.

### Model Selection

- `gpt-4o-mini` — fast, cost-effective, excellent for most translations
- `gpt-4o` — higher quality, more nuance, higher cost

---

## Anthropic Claude

Claude is known for its natural, human-like tone and excellent handling of longer text passages.

### Setup

No extra package needed. Add to `.env`:

```ini
FTS_ANTHROPIC_API_KEY=sk-ant-...
FTS_ANTHROPIC_MODEL=claude-haiku-4-5-20251001
```

---

## Placeholder Preservation

One of the suite's most important features is **placeholder preservation**. Laravel translation strings often contain:

- **Named placeholders:** `:name`, `:email`, `:attribute`
- **Numeric placeholders:** `:0`, `:1`
- **Pluralization:** `There is one apple|There are :count apples`

The suite's `PlaceholderPreserver` service:

1. **Preserves pluralization patterns** — splits on `|` and translates each segment separately
2. **Strips placeholders** — replaces `:name` with a protected token before translation
3. **Translates the clean text** — sends only human-readable content to the API
4. **Restores placeholders** — puts `:name`, `:count`, etc. back in exactly the right positions

This ensures your translated strings remain valid Laravel translation keys that work with `trans()`, `trans_choice()`, and validation messages.

---

## Individual Field Translation

In the System Translations editor, each locale input has quick-action buttons:

- **D** — Translate this field using DeepL
- **G** — Translate this field using Google Translate
- *(ChatGPT and Claude buttons appear when configured)*

Click the button, and the source locale value is translated into the target locale instantly.

---

## Bulk Translation

Bulk translation lets you translate hundreds or thousands of keys in a single operation.

### For File Translations

From **System Translations**, click **"Bulk Translate"** and choose:
- **Source Locale** — what to translate from
- **Target Locale** — what to translate to
- **Provider** — which engine to use
- **Scope** — all untranslated keys, or only the currently filtered rows

The job is dispatched to your queue and runs in the background.

### For Content Models

From **Content Translation**, click **"Bulk Translate"** on any model card. The same provider selection applies, but the job targets all records of that model missing the target locale.

### Monitoring Bulk Jobs

The suite tracks bulk job status via cache. When a job completes, you receive a Filament notification with the count of processed translations.

---

## Provider Selection Strategy

Here's how to choose the right provider for your workflow:

| Scenario | Recommended Provider
|----------|-------------------
| European languages, high quality | DeepL
| Asian languages, broad coverage | Google Cloud Translate
| Marketing copy, tone matters | ChatGPT or Claude
| Technical documentation | DeepL or ChatGPT
| Cost-sensitive, high volume | Google Cloud Translate
| Validation messages, short strings | DeepL

You can use multiple providers simultaneously. The suite makes them all available, and you choose per-translation.

---

## Next Steps

- **[File Translations](/filament-translation-suite/features/file-translations)** — Use machine translation on your UI strings
- **[Content Models](/filament-translation-suite/features/content-models)** — Bulk translate your database content
- **[Auto-Translation Agent](/filament-translation-suite/features/auto-translation-agent)** — Set up automatic background translation
