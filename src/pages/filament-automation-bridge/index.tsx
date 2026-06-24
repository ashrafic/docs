import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import HeroSlider from '@site/src/components/HeroSlider';
import { Zap, GlobeLock, Filter, CodeXml, BarChart3, History, ShieldCheck, CopyCheck, Wrench } from 'lucide-react';

const features = [
  { Icon: Zap, title: 'Six Trigger Types', desc: 'Model events (created, updated, deleted), status transitions, schedules (every minute to custom cron), date conditions (X days before/after), manual buttons, and any Laravel event class. If it happens in your app, it can trigger an automation.' },
  { Icon: GlobeLock, title: 'Multi-Platform Destinations', desc: 'Send to Zapier, Make (Integromat), n8n, or any custom webhook endpoint. Each destination type auto-formats the payload so your automation platform receives it in its expected shape — no middleware needed.' },
  { Icon: Filter, title: 'Visual Condition Builder', desc: 'Nine operators including equals, contains, greater/less than, changed, and changed_to. Chain conditions with AND/OR logic. The changed/changed_to operators let you fire only when specific fields actually changed — not on every update.' },
  { Icon: CodeXml, title: 'Smart Payload Builder', desc: 'Three payload modes: hand-picked fields, all model attributes, or custom JSON templates with {{ field }} placeholders. Wildcard relations, eager loading, and automatic exclusion of password-style fields.' },
  { Icon: BarChart3, title: 'Delivery Monitoring', desc: 'Every webhook call is logged with status, HTTP code, response body, and duration. Color-coded success-rate tracking per trigger. Failed deliveries retry with exponential backoff. Bulk retry failed deliveries from the UI.' },
  { Icon: History, title: 'Historical Sync', desc: 'Backfill existing records into any automation. Pick a trigger, choose batch size, and the queue syncs every matching record. Track progress via cache keys. Cancel an in-flight sync with one click.' },
  { Icon: ShieldCheck, title: 'Enterprise Security', desc: 'HMAC-SHA256 payload signing with per-trigger secrets. SSRF prevention blocks internal IP ranges. HTTPS enforced in production. Encrypted secrets at rest. Rate limiting per destination hostname. Sandbox mode for safe testing.' },
  { Icon: CopyCheck, title: 'Reusable Templates', desc: 'Save any trigger configuration as a template and apply it to new models in one click. Built-in templates ship with the package. Perfect for standardizing webhook payloads across your team.' },
  { Icon: Wrench, title: 'Developer Friendly', desc: 'Six artisan commands for install, prune, sync, test, model cache, and scheduled processing. Five dispatchable events for extension. HasAutomationTriggers trait for model-level control. Auto-discovers Eloquent models across your app.' },
];

export default function FabHome(): JSX.Element {
  return (
    <Layout title="Filament Automation Bridge" description="Turn any Eloquent model event into an automation trigger for Zapier, Make, or n8n — without writing code.">
      {/* Hero */}
      <div className="pkg-hero">
        <div className="pkg-hero-inner">
          <div className="pkg-hero-text">
            <h1 className="pkg-hero-title">
              <span className="pkg-hero-line1">Filament</span>
              <span className="pkg-hero-line2">Automation Bridge</span>
            </h1>
            <p className="pkg-hero-tagline">Every model event. Any automation platform. Zero code.</p>
            <p className="pkg-hero-sub">Open source. MIT licensed.</p>
            <p className="pkg-hero-desc">
              Define triggers from your Filament admin panel and instantly connect Eloquent model events to Zapier, Make, n8n, or any webhook endpoint. Filter with conditions, shape custom payloads, monitor every delivery — all without touching a line of integration code.
            </p>
            <div className="pkg-hero-actions">
              <Link className="pkg-btn pkg-btn-brand" to="/filament-automation-bridge/getting-started">Get Started</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-automation-bridge/features">Explore Features</Link>
              <Link className="pkg-btn pkg-btn-alt" to="/filament-automation-bridge/installation">Installation</Link>
            </div>
          </div>
          <div className="pkg-hero-slider">
            <HeroSlider />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="pkg-features">
        <div className="pkg-features-grid">
          {features.map((f, i) => {
            const Icon = f.Icon;
            return (
            <div key={i} className="pkg-feature-card">
              <Icon className="pkg-feature-icon" />
              <h3 className="pkg-feature-title">{f.title}</h3>
              <p className="pkg-feature-desc">{f.desc}</p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Feature Banner */}
      <div className="pkg-features-banner">
        <p>
          And more — Model Discovery, Field Schema Analysis, Sandbox Mode, Rate Limiting, Health Widget, Artisan Commands.{' '}
          <Link to="/filament-automation-bridge/features">See all features →</Link>
        </p>
      </div>
    </Layout>
  );
}
