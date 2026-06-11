import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroSlider from '@site/src/components/HeroSlider';
import { Layers, FileText, Database, WandSparkles, Languages, Users, BarChart3, ShieldCheck, RefreshCw } from 'lucide-react';

const features = [
  { Icon: Layers, title: 'One Suite, Two Worlds', desc: 'Stop juggling separate tools. Manage your lang/ files AND your Spatie translatable models from one Filament panel. No extra subscriptions. No context switching. No gaps between your UI and your content.' },
  { Icon: FileText, title: 'File & UI Translations', desc: 'Import existing lang/ files for safe database editing. Auto-scan your codebase for missing translation keys. Publish back with merge-safe writes — your existing translations are never blindly overwritten.' },
  { Icon: Database, title: 'Content Model Localization', desc: 'Auto-discovers every Spatie translatable model in your app. See per-locale coverage at a glance. Bulk translate entire tables via background queues — all without writing a single form component.' },
  { Icon: WandSparkles, title: 'Zero-Config Form Morphing', desc: 'Every translatable field in any Filament form automatically gets locale tabs. No manual setup. No repetitive configuration. Install the plugin and your forms just work.' },
  { Icon: Languages, title: 'Machine Translation Engine', desc: 'Translate with DeepL, Google Cloud, ChatGPT, or Claude. Single field or bulk. Automatic placeholder preservation keeps your :name, :count, and pluralization patterns intact.' },
  { Icon: Users, title: 'Built for Teams', desc: 'Permission-gated translation portal for external contributors. CSV round-trip for agencies. Webhooks for Phrase, Crowdin, and Lokalise. Everyone stays in sync.' },
  { Icon: BarChart3, title: 'Health Dashboard', desc: 'Unified coverage reporting across files and models. Real-time activity feed with user attribution. Know exactly where your translations stand — and what\'s missing — at a single glance.' },
  { Icon: ShieldCheck, title: 'Non-Destructive by Design', desc: 'Every write operation is safe. Publishing merges rather than replaces. Bulk translation never overwrites existing values. Automatic backups. You can always undo.' },
  { Icon: RefreshCw, title: 'Auto-Translation Agent', desc: 'Background monitor that detects untranslated strings and automatically queues machine translation jobs. Set it once and your translations stay current.' },
];

export default function FtsHome(): JSX.Element {
  return (
    <Layout title="Filament Translation Suite" description="The only translation tool your Filament app needs.">
      {/* Hero */}
      <div className="fts-hero">
        <div className="fts-hero-inner">
          <div className="fts-hero-text">
            <h1 className="fts-hero-title">
              <span className="fts-hero-line1">Filament</span>
              <span className="fts-hero-line2">Translation Suite</span>
            </h1>
            <p className="fts-hero-tagline">One Suite. Every String. Zero Friction.</p>
            <p className="fts-hero-sub">Buy once. Own forever. No subscriptions.</p>
            <p className="fts-hero-desc">
              Translate both file-based strings and database content — all from one Filament panel.
              Track coverage with a complete overview. Bulk-translate thousands of keys. Powered by DeepL, Google Translate, ChatGPT &amp; Claude.
            </p>
            <div className="fts-hero-actions">
              <Link className="fts-btn fts-btn-brand" to="/filament-translation-suite/getting-started">Get Started</Link>
              <Link className="fts-btn fts-btn-alt" to="/filament-translation-suite/features">Explore Features</Link>
              <Link className="fts-btn fts-btn-alt" to="/filament-translation-suite/pricing">View Pricing</Link>
            </div>
          </div>
          <div className="fts-hero-slider">
            <HeroSlider />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="fts-features">
        <div className="fts-features-grid">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
            <div key={i} className="fts-feature-card">
              <Icon className="fts-feature-icon" />
              <h3 className="fts-feature-title">{f.title}</h3>
              <p className="fts-feature-desc">{f.desc}</p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Feature Banner */}
      <div className="fts-features-banner">
        <p>
          And more — Code Scanner, Vendor Explorer, CSV Import/Export, Translation Portal, Webhooks.{' '}
          <Link to="/filament-translation-suite/features">See all features →</Link>
        </p>
      </div>
    </Layout>
  );
}
